import axios from "axios";
import { apiConfig } from "../config/api.config";
import { useAuthStore } from "@/features/auth/stores/auth-store";

export const request = axios.create({
  baseURL: apiConfig.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
