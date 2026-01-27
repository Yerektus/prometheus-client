import { Auth } from "@/common/entities/auth";
import { AuthResponse } from "../responses/auth.response";

export const mapAuthResponseToAuth = (auth: AuthResponse): Auth => {
  return {
    accessToken: auth.access_token,
  };
};
