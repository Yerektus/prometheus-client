import { LocationResponse } from "./location.response";
import { SensorReadingResponse } from "./sensor-reading.response";

export interface FireSensorResponse {
  id: string;
  serial_number: string;
  model: string;
  is_active: boolean;
  installed_at: string;
  location?: LocationResponse;
  sensor_readings?: SensorReadingResponse[];
}
