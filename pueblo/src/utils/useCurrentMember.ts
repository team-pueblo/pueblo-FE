import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../api/client";
import { checkTokenExpiration, logout } from "./auth";

type Member = { id: string; email: string; nickname: string };

export function useCurrentMember() {
  const [member, setMember] = useState<Member | null>(null);
  useEffect(() => {
    let controller: AbortController | undefined;
    const refresh = async () => {
      controller?.abort();
      controller = new AbortController();
      const signal = controller.signal;
      checkTokenExpiration();
      const token = localStorage.getItem("token");
      if (!token) { setMember(null); return; }
      try {
        const response = await api.get<{ data: Member }>("/api/v1/me", {
          baseURL: import.meta.env.VITE_AUTH_API_ORIGIN || (import.meta.env.DEV ? "http://localhost:8081" : window.location.origin),
          headers: { Authorization: `Bearer ${token}` },
          signal,
          monitoring: { endpoint: "/api/v1/me", feature: "auth", action: "current-member" },
        });
        if (signal.aborted || localStorage.getItem("token") !== token) return;
        const user = response.data.data;
        if (!user || typeof user.id !== "string" || typeof user.email !== "string" || typeof user.nickname !== "string") return;
        localStorage.setItem("user", JSON.stringify(user));
        setMember(user);
      } catch (error) {
        if (signal.aborted || localStorage.getItem("token") !== token) return;
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          logout();
          setMember(null);
        }
      }
    };
    const onStorage = (event: StorageEvent) => { if (event.key === "token" || event.key === null) void refresh(); };
    const onSessionChange = () => { void refresh(); };
    void refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("pueblo-session-change", onSessionChange);
    window.addEventListener("focus", onSessionChange);
    return () => {
      controller?.abort();
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pueblo-session-change", onSessionChange);
      window.removeEventListener("focus", onSessionChange);
    };
  }, []);
  return member;
}
