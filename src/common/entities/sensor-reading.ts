export interface SensorReading {
  id: string;
  temperatureC: number;
  humidityPct: number;
  gasPpm: number;
  recordedAt: Date;
}
