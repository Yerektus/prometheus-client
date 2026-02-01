import { Location } from "@/common/entities/location";
import { LocationResponse } from "../responses/location.response";
import { mapFireSensorResponseToFireSensor } from "./fire-sensor.mapper";
import { mapUserResponseToUser } from "./user.mapper";

export const mapLocationResponseToLocation = (
  payload: LocationResponse,
): Location => {
  return {
    id: payload.id,
    country: payload.country,
    city: payload.city,
    address: payload.address,
    floor: payload.floor,
    flat: payload.flat,
    longitude: 0, // todo(Yerektus)
    latitude: 0, // todo(Yerektus)
    fireSensors:
      payload.fire_sensors?.map((fireSensor) =>
        mapFireSensorResponseToFireSensor(fireSensor),
      ) ?? [],
    users: payload.users?.map((user) => mapUserResponseToUser(user)) ?? [],
  };
};
