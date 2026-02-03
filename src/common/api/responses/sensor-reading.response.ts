export interface SensorReadingResponse {
  id: string;
  temperature_c: number;
  humidity_pct: number;
  gas_ppm: number;
  recorded_at: Date;
}
