import { User } from "./user";

export interface SensorReadingsColumns {
  fireSensorId: string;
  locationId: string;
  sensorReadingId: string;
  country: string;
  city: string;
  address: string;
  serialNumber: string;
  model: string;
  isActive: boolean;
  installedAt: string;
  floor: string;
  flat: string;
  temperatureC: number;
  humidityPct: number;
  gasPpm: number;
  recordedAt: string;
  users?: User[];
}
