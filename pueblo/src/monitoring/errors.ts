import * as Sentry from "@sentry/react";
import axios, { type AxiosError } from "axios";

export type ErrorLevel = "fatal" | "error" | "warning";
export type ApiMonitoring = {
  // Supply a static route template, never a URL containing user data.
  endpoint: string;
  feature: string;
  action: string;
  critical?: boolean;
};

declare module "axios" {
  interface AxiosRequestConfig {
    monitoring?: ApiMonitoring;
  }
}

export function shouldSkipErrorLogging(error: AxiosError): boolean {
  if (axios.isCancel(error)) return true;
  const endpoint = error.config?.monitoring?.endpoint;
  const method = error.config?.method?.toUpperCase();
  const status = error.response?.status;
  const data: unknown = error.response?.data;
  if (endpoint !== "/api/login" || method !== "POST" || ![400, 401].includes(status ?? 0)) return false;
  if (!data || typeof data !== "object") return false;
  const body = data as Record<string, unknown>;
  // This exact failure is handled by the login form. Unknown responses remain visible.
  return body.code === "INVALID_CREDENTIALS" || body.message === "이메일 또는 비밀번호를 확인해주세요.";
}

export function normalizePath(path: string): string {
  return path.split(/[?#]/)[0]
    .replace(/\/[0-9]+(?=\/|$)/g, "/{id}")
    .replace(/\/[0-9a-f]{8}-[0-9a-f-]{27,}(?=\/|$)/gi, "/{id}");
}

function pageRoute(): string {
  if (typeof window === "undefined") return "unknown";
  const path = window.location.pathname;
  if (/^\/product\/[^/]+\/?$/.test(path)) return "/product/:id";
  if (/^\/brands\/[^/]+\/?$/.test(path)) return "/brands/:slug";
  return ["/", "/login", "/signup", "/find-id", "/find-id-result", "/reset-password",
    "/cart", "/favorites", "/search", "/brands", "/men", "/women", "/lifestyle", "/sale"].includes(path)
    ? path : "unknown";
}

const recent = new Map<string, number>();
const processed = new WeakSet<object>();

function shouldSend(key: string, level: ErrorLevel): boolean {
  // Fatal events must remain visible to immediate alerts.
  if (level === "fatal") return true;
  const now = Date.now();
  const previous = recent.get(key);
  if (previous !== undefined && now - previous < 30_000) return false;
  if (recent.size >= 100) recent.delete(recent.keys().next().value!);
  recent.set(key, now);
  return true;
}

export class SentryNetworkError extends Error {
  constructor(error: AxiosError, endpoint: string) {
    const status = error.response?.status;
    const kind = status !== undefined ? String(status)
      : ["ECONNABORTED", "ETIMEDOUT"].includes(error.code ?? "") ? "TIMEOUT" : "NETWORK";
    const method = (error.config?.method ?? "get").toUpperCase();
    super(`${method} ${endpoint} request failed (${kind})`);
    this.name = `[${kind} Error] - ${method} ${endpoint}`;
    // Do not attach Axios config, request, response or cause: they can contain credentials.
  }
}

export function reportApiError(error: unknown): void {
  if (!axios.isAxiosError(error) || processed.has(error)) return;
  processed.add(error);
  const metadata = error.config?.monitoring;
  const status = error.response?.status;
  if (shouldSkipErrorLogging(error)) return;

  const endpoint = metadata ? normalizePath(metadata.endpoint) : "unknown-endpoint";
  const method = (error.config?.method ?? "get").toUpperCase();
  const transient = ["ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK"].includes(error.code ?? "");
  const level: ErrorLevel = transient && status === undefined ? "warning"
    : metadata?.critical && status !== undefined && status >= 500 ? "fatal" : "error";
  const exception = new SentryNetworkError(error, endpoint);
  const kind = status !== undefined ? String(status)
    : ["ECONNABORTED", "ETIMEDOUT"].includes(error.code ?? "") ? "timeout"
    : error.code === "ERR_NETWORK" ? "network" : "unknown";
  const fingerprint = ["api", method, endpoint, kind];
  if (!shouldSend(JSON.stringify(fingerprint), level)) return;

  Sentry.withScope((scope) => {
    scope.setLevel(level);
    scope.setTags({ feature: metadata?.feature ?? "api", action: metadata?.action ?? "request",
      endpoint, method, status: String(status ?? "none"), page: pageRoute() });
    scope.setFingerprint(fingerprint);
    scope.setContext("api", { endpoint, method, status: status ?? null,
      timeoutMs: error.config?.timeout ?? null });
    // Only bounded numeric pagination is allowed; search text and credentials are never copied.
    const params: unknown = error.config?.params;
    if (params && typeof params === "object") {
      const safe: Record<string, number> = {};
      for (const key of ["page", "size"]) {
        const value = (params as Record<string, unknown>)[key];
        if (typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 10000) safe[key] = value;
      }
      scope.setContext("query", safe);
    }
    Sentry.captureException(exception);
  });
}

export function captureHandledError(error: unknown, tags: { feature: string; action: string }, level: ErrorLevel = "error") {
  // API failures have already been classified (including intentionally ignored ones).
  if (axios.isAxiosError(error) && processed.has(error)) return;
  const key = JSON.stringify([tags.feature, tags.action, error instanceof Error ? error.name : "UnknownError"]);
  if (!shouldSend(key, level)) return;
  Sentry.captureException(error, { level, tags: { ...tags, page: pageRoute() } });
}
