import * as Sentry from "@sentry/react";

const dsn = import.meta.env.VITE_SENTRY_DSN?.trim();
const enabled = Boolean(dsn) &&
  (import.meta.env.PROD || import.meta.env.VITE_SENTRY_ENABLED === "true");

if (enabled) {
  Sentry.init({
    dsn,
    environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || import.meta.env.MODE,
    release: import.meta.env.VITE_SENTRY_RELEASE || undefined,
    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: false,
      httpBodies: [],
      urlQueryParams: false,
    },
  });
}

// Leave React's default development error handling intact when disabled.
export const sentryRootOptions = enabled ? {
  onUncaughtError: rootErrorHandler("fatal"),
  onCaughtError: rootErrorHandler("error"),
  onRecoverableError: rootErrorHandler("warning"),
} : {};

function rootErrorHandler(level: "fatal" | "error" | "warning") {
  const handler = Sentry.reactErrorHandler();
  return (...args: Parameters<typeof handler>) => Sentry.withScope((scope) => {
    scope.setLevel(level);
    scope.setTag("feature", "react");
    handler(...args);
  });
}
