import { SensorReadingResponse } from "../responses/sensor-reading.response";
import { SensorReading } from "@/common/entities/sensor-reading";
import { mapFireSensorResponseToFireSensor } from "./fire-sensor.mapper";

export const mapSensorReadingResponseToSensorReading = (
  payload: SensorReadingResponse,
): SensorReading => {
  return {
    id: payload.id,
    temperatureC: payload.temperature_c,
    humidityPct: payload.humidity_pct,
    gasPpm: payload.gas_ppm,
    recordedAt: payload.recorded_at,
    fireSensor: payload.fire_sensor
      ? mapFireSensorResponseToFireSensor(payload.fire_sensor)
      : null,
  };
};
