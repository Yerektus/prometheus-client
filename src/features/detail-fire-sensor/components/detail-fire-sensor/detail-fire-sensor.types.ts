import { FireSensor } from "@/common/entities/fire-sensor";
import { User } from "@/common/entities/user";

export type MetricStatus = "ok" | "warning";

export interface SensorReadingsColumns {
  fireSensorId: string;
  locationId: string;
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

export type ReadingHistoryRow = {
  id: string;
  recordedAt: string;
  temperatureC: number;
  humidityPct: number;
  gasPpm: number;
  deltaTemperatureC: number | null;
  deltaHumidityPct: number | null;
  deltaGasPpm: number | null;
};

export interface DetailFireSensorProps {
  data: FireSensor;
  hasError: boolean;
  onRetry: () => void;
}
