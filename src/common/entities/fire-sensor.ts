import { Location } from "./location";
import { SensorReading } from "./sensor-reading";

export interface FireSensor {
  id: string;
  serialNumber: string | null;
  model: string | null;
  isActive: boolean;
  installedAt: string | null;
  location: Location | null;
  sensorReadings: SensorReading[] | null;
}
