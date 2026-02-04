import { FireSensorResponse } from "./fire-sensor.response";

export interface SensorReadingResponse {
  id: string;
  temperature_c: number;
  humidity_pct: number;
  gas_ppm: number;
  recorded_at: string;
  fire_sensor: FireSensorResponse;
}
