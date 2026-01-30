import { FireSensorResponse } from "./fire-sensor.response";

export interface LocationResponse {
  id: string;
  country: string;
  city: string;
  address: string;
  floor: string;
  room: string;
  fire_sensors?: FireSensorResponse[];
}
