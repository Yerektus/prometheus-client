import { Location } from "@/common/entities/location";
import { LocationResponse } from "../responses/location.response";
import { mapFireSensorResponseToFireSensor } from "./fire-sensor.mapper";

export const mapLocationResponseToLocation = (
  payload: LocationResponse,
): Location => {
  return {
    id: payload.id,
    country: payload.country,
    city: payload.city,
    address: payload.address,
    floor: payload.floor,
    room: payload.room,
    longitude: 0, // todo(Yerektus)
    latitude: 0, // todo(Yerektus)
    fireSensors:
      payload.fire_sensors?.map((fireSensor) =>
        mapFireSensorResponseToFireSensor(fireSensor),
      ) ?? [],
  };
};
