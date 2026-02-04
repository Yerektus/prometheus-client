import { mapFireSensorResponseToFireSensor } from "../../mappers/fire-sensor.mapper";
import { request } from "../../request";
import { FireSensorResponse } from "../../responses/fire-sensor.response";

export const fetchFireSensorById = async (fireSensorId: string) => {
  const response = await request.get<{
    data: FireSensorResponse;
  }>(`/api/v1/fire_sensors/${fireSensorId}`);

  return mapFireSensorResponseToFireSensor(response.data.data);
};
