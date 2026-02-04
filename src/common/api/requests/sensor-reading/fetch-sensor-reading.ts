import { mapSensorReadingResponseToSensorReading } from "../../mappers/sensor-reading";
import { request } from "../../request";
import { SensorReadingResponse } from "../../responses/sensor-reading.response";

export const fetchSensorReadingById = async (
  fetchSensorReadingById: string,
) => {
  const response = await request.get<{
    data: SensorReadingResponse;
  }>(`/api/v1/sensor_readings/${fetchSensorReadingById}`);

  return mapSensorReadingResponseToSensorReading(response.data.data);
};
