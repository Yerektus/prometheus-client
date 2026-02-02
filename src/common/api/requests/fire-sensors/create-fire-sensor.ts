import { mapUserResponseToUser } from "../../mappers/user.mapper";
import { request } from "../../request";
import { UserResponse } from "../../responses/user.response";

export const createFireSensor = async (payload: {
  ownerId: string;
  country: string;
  city: string;
  address: string;
  floor?: string;
  flat?: string;
  serialNumber: string;
  model: string;
}) => {
  const response = await request.post<{
    data: UserResponse;
  }>(`/api/v1/fire_sensors`, {
    owner_id: payload.ownerId,
    country: payload.country,
    city: payload.city,
    address: payload.address,
    floor: payload.floor,
    flat: payload.flat,
    serial_number: payload.serialNumber,
    model: payload.model,
  });

  return mapUserResponseToUser(response.data.data);
};
