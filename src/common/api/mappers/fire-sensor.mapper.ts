import { FireSensor } from "@/common/entities/fire-sensor";
import { FireSensorResponse } from "../responses/fire-sensor.response";
import { mapLocationResponseToLocation } from "./location.mapper";
import { mapSensorReadingResponseToSensorReading } from "./sensor-reading";

export const mapFireSensorResponseToFireSensor = (
  payload: FireSensorResponse,
): FireSensor => {
  return {
    id: payload.id,
    model: payload.model,
    serialNumber: payload.serial_number,
    isActive: payload.is_active,
    installedAt: payload.installed_at,
    location: payload.location
      ? mapLocationResponseToLocation(payload.location)
      : null,
    sensorReadings: payload.sensor_readings?.length
      ? payload.sensor_readings.map((sensor_reading) =>
          mapSensorReadingResponseToSensorReading(sensor_reading),
        )
      : null,
  };
};
