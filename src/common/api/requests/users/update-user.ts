import { mapUserResponseToUser } from "../../mappers/user.mapper";
import { request } from "../../request";
import { UserResponse } from "../../responses/user.response";

export type UpdateUserPayload = {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumbers: string;
  roleIds: string[];
  fireSensorIds: string[];
};

export const updateUser = async (payload: UpdateUserPayload) => {
  const response = await request.patch<{
    data: UserResponse;
  }>(`/api/v1/users/${payload.userId}`, {
    first_name: payload.firstName,
    last_name: payload.lastName,
    username: payload.username,
    email: payload.email,
    phone_numbers: payload.phoneNumbers,
    role_ids: payload.roleIds,
    fire_sensor_ids: payload.fireSensorIds,
  });

  return mapUserResponseToUser(response.data.data);
};
