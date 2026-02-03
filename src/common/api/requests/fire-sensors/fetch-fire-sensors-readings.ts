import { mapFireSensorResponseToFireSensor } from "../../mappers/fire-sensor.mapper";
import { request } from "../../request";
import { FireSensorResponse } from "../../responses/fire-sensor.response";

export const fetchFireSensorsWithReadings = async () => {
  const response = await request.get<{
    data: FireSensorResponse[];
  }>("/api/v1/fire_sensors/sensor_readings");

  console.log(response.data);

  return response.data.data.map((fireSensor) =>
    mapFireSensorResponseToFireSensor(fireSensor),
  );
};
