import { FireSensorAndLocationColumns } from "@/common/entities/fire-sensor-and-location";
import { FireSensor } from "@/common/entities/fire-sensor";

export const mapFireSensorAndLocationToColumns = (
  payload: FireSensor,
): FireSensorAndLocationColumns => {
  return {
    country: payload.location?.country,
    city: payload.location?.city,
    address: payload.location?.address,
    serialNumber: payload.serialNumber,
    model: payload.model,
    isActive: payload.isActive,
    installedAt: payload.installedAt,
  };
};
