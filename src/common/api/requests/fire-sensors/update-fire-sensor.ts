import { FireSensorAndLocation } from "@/features/fire-sensors/components/update-fire-sensor-sheet/update-fire-sensor-sheet.types";
import { mapUserResponseToUser } from "../../mappers/user.mapper";
import { request } from "../../request";
import { UserResponse } from "../../responses/user.response";

export const updateFireSensor = async (payload: FireSensorAndLocation) => {
  const response = await request.patch<{
    data: UserResponse;
  }>(`/api/v1/fire_sensors/${payload.fireSensorId}`, {
    owner_id: payload.ownerId,
    location_id: payload.locationId,
    country: payload.country,
    city: payload.city,
    address: payload.address,
    floor: payload.floor,
    flat: payload.flat,
    serial_number: payload.serialNumber,
    model: payload.model,
  });

  console.log(response);

  return mapUserResponseToUser(response.data.data);
};
