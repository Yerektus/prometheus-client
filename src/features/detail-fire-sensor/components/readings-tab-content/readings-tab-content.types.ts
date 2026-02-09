import { SensorReading } from "@/common/entities/sensor-reading";

export interface ReadingsTabContentProps {
  sensorReadings: SensorReading[];
}

export interface ReadingsTableRow {
  id: string;
  recordedAt: string;
  temperatureC: number;
  gasPpm: number;
  humidityPct: number;
}
