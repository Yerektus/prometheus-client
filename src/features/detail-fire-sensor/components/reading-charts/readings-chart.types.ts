import { SensorReading } from "@/common/entities/sensor-reading";

export interface ReadingsChartProps {
  sensorReadings?: SensorReading[] | null;
}

export type ChartPoint = {
  id: string;
  recordedAt: string;
  timeLabel: string;
  temperatureC: number;
  gasPpm: number;
  humidityPct: number;
};
