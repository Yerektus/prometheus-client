import { mapUserResponseToUser } from "../../mappers/user.mapper";
import { request } from "../../request";
import { UserResponse } from "../../responses/user.response";

export const fetchUsers = async () => {
  const response = await request.get<{
    data: UserResponse[];
  }>("/api/v1/users");

  return response.data.data.map((user) => mapUserResponseToUser(user));
};
