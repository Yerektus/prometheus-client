import { FireSensorAndLocationColumns } from "@/common/entities/fire-sensor-and-location";

export interface UpdateFireSensorSheetProps {
  isOpen: boolean;
  onClose: (needRefresh?: boolean) => void;
  fireSensor: FireSensorAndLocationColumns;
}

export interface FireSensorAndLocation {
  fireSensorId: string;
  locationId: string;
  ownerId: string;
  country: string;
  city: string;
  address: string;
  floor: string;
  flat: string;
  serialNumber: string;
  model: string;
}
