import { request } from "../../request";

export const deleteFireSensor = async (fireSensorId: string) => {
  await request.delete(`/api/v1/fire_sensors/${fireSensorId}`);
};
