import { User } from "./user";

export interface FireSensorAndLocationColumns {
  fireSensorId?: string;
  locationId?: string;
  country?: string;
  city?: string;
  address?: string;
  serialNumber?: string | null;
  model?: string | null;
  isActive: boolean;
  installedAt: string | null;
  floor: string | null;
  flat: string | null;
  users: User[] | null;
}
