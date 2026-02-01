import { mapUserResponseToUser } from "../../mappers/user.mapper";
import { request } from "../../request";
import { UserResponse } from "../../responses/user.response";

export const createFireSensor = async (
  userId: string,
  payload: {
    country: string;
    city: string;
    address: string;
    floor?: string;
    flat?: string;
    serialNumber: string;
    model: string;
    isActive: boolean;
  },
) => {
  const response = await request.post<{
    data: UserResponse;
  }>(`/api/v1/users/${userId}/locations/sensors`, {
    country: payload.country,
    city: payload.city,
    address: payload.address,
    floor: payload.floor,
    flat: payload.flat,
    serial_number: payload.serialNumber,
    model: payload.model,
    is_active: payload.isActive,
  });

  return mapUserResponseToUser(response.data.data);
};
