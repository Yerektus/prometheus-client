import { FireSensor } from "./fire-sensor";

export interface Location {
  id: string;
  country: string;
  city: string;
  address: string;
  floor: string | null;
  room: string | null;
  latitude: number;
  longitude: number;
  fireSensors: FireSensor[];
}
