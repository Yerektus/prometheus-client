import { FireSensor } from "./fire-sensor";

export interface SensorReading {
  id: string;
  temperatureC: number;
  humidityPct: number;
  gasPpm: number;
  recordedAt: string;
  fireSensor: FireSensor | null;
}
