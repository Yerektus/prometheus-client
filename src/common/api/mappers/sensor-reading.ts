import { SensorReadingResponse } from "../responses/sensor-reading.response";
import { SensorReading } from "@/common/entities/sensor-reading";

export const mapSensorReadingResponseToSensorReading = (
  payload: SensorReadingResponse,
): SensorReading => {
  return {
    id: payload.id,
    temperatureC: payload.temperature_c,
    humidityPct: payload.humidity_pct,
    gasPpm: payload.gas_ppm,
    recordedAt: payload.recorded_at,
  };
};
