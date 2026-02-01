import { mapUserResponseToUser } from "../../mappers/user.mapper";
import { request } from "../../request";
import { UserResponse } from "../../responses/user.response";

export const fetchUserByFullname = async (
  lastName: string,
  firstName: string,
) => {
  const response = await request.get<{
    data: UserResponse;
  }>(`/api/v1/users/by_fullname?last_name=${lastName}&first_name=${firstName}`);

  return mapUserResponseToUser(response.data.data);
};
