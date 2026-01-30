import { Location } from "./location";

export interface FireSensor {
  id: string;
  serialNumber: string | null;
  model: string | null;
  isActive: boolean;
  installedAt: string | null;
  location: Location | null;
}
