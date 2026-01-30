import { FireSensor } from "@/common/entities/fire-sensor";
import { FireSensorResponse } from "../responses/fire-sensor.response";

export const mapFireSensorResponseToFireSensor = (
  payload: FireSensorResponse,
): FireSensor => {
  return {
    id: payload.id,
    model: payload.model,
    serialNumber: payload.serial_number,
    isActive: payload.is_active,
    installedAt: payload.installed_at,
  };
};
