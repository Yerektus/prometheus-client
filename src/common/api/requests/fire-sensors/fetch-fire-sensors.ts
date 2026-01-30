import { mapFireSensorResponseToFireSensor } from "../../mappers/fire-sensor.mapper";
import { request } from "../../request";
import { FireSensorResponse } from "../../responses/fire-sensor.response";

export const fetchFireSensors = async () => {
  const response = await request.get<{
    data: FireSensorResponse[];
  }>("/api/v1/fire_sensors");

  return response.data.data.map((fireSensor) =>
    mapFireSensorResponseToFireSensor(fireSensor),
  );
};
