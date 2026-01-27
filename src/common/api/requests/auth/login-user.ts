import { User } from "@/common/entities/user";
import { mapAuthResponseToAuth } from "../../mappers/auth.mapper";
import { mapUserResponseToUser } from "../../mappers/user.mapper";
import { request } from "../../request";
import { AuthResponse } from "../../responses/auth.response";
import { UserResponse } from "../../responses/user.response";
import { Auth } from "@/common/entities/auth";

export const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<[User, Auth]> => {
  const response = await request.post<{
    data: { user: UserResponse; auth: AuthResponse };
  }>("/api/v1/auth/login", payload);

  return [
    mapUserResponseToUser(response.data.data.user),
    mapAuthResponseToAuth(response.data.data.auth),
  ];
};
