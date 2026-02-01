import { FireSensor } from "./fire-sensor";
import { User } from "./user";

export interface Location {
  id: string;
  country: string;
  city: string;
  address: string;
  floor: string | null;
  flat: string | null;
  latitude: number;
  longitude: number;
  fireSensors: FireSensor[];
  users: User[];
}
