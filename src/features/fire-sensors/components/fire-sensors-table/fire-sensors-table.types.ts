import { FireSensorAndLocationColumns } from "@/common/entities/fire-sensor-and-location";

export interface FireSensorsTableProps {
  data: FireSensorAndLocationColumns[];
  refetch: () => void;
}
