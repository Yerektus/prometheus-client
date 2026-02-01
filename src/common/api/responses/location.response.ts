import { FireSensorResponse } from "./fire-sensor.response";
import { UserResponse } from "./user.response";

export interface LocationResponse {
  id: string;
  country: string;
  city: string;
  address: string;
  floor: string;
  flat: string;
  fire_sensors?: FireSensorResponse[];
  users?: UserResponse[];
}
