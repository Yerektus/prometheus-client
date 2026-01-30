export interface FireSensorAndLocationColumns {
  country?: string;
  city?: string;
  address?: string;
  serialNumber: string | null;
  model: string | null;
  isActive: boolean;
  installedAt: string | null;
}
