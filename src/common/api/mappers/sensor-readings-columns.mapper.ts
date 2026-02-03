import { FireSensorAndLocationColumns } from "@/common/entities/fire-sensor-and-location";
import { FireSensor } from "@/common/entities/fire-sensor";
import { SensorReadingsColumns } from "@/common/entities/sensor-readings-columns";

export const mapSensorReadingsToColumns = (
  payload: FireSensor,
): SensorReadingsColumns => {
  return {
    locationId: payload.location?.id ?? "",
    fireSensorId: payload.id,
    country: payload.location?.country ?? "",
    city: payload.location?.city ?? "",
    address: payload.location?.address ?? "",
    serialNumber: payload.serialNumber ?? "",
    model: payload.model ?? "",
    isActive: payload.isActive,
    installedAt: payload.installedAt ?? "",
    floor: payload.location?.floor ?? "",
    flat: payload.location?.flat ?? "",
    temperatureC: payload.sensorReadings?.[0].temperatureC ?? 0,
    humidityPct: payload.sensorReadings?.[0].humidityPct ?? 0,
    gasPpm: payload.sensorReadings?.[0].gasPpm ?? 0,
    recordedAt: payload.sensorReadings?.[0].recordedAt.toDateString() ?? "",
    users: payload.location?.users ?? [],
  };
};
