import axios from "axios";
import { reportApiError } from "../monitoring/errors";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 15_000,
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    reportApiError(error);
    return Promise.reject(error);
  },
);
