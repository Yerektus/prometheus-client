import axios from "axios";
import { apiConfig } from "../config/api.config";

export const request = axios.create({
  baseURL: apiConfig.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
