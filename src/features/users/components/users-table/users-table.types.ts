import { User } from "@/common/entities/user";

export interface SensorOption {
  id: string;
  serialNumber: string;
  model: string;
  label: string;
}

export interface UsersTableRow {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumbers: string;
  roles: string[];
  fireSensorIds: string[];
  sensorSerialNumbers: string[];
  sensorsCount: number;
  search: string;
  user: User;
}

export interface UsersTableProps {
  data: UsersTableRow[];
  refetch: () => void;
  sensorOptions: SensorOption[];
}

export interface UsersTableColumnsProps {
  onOpenSheet: (row: UsersTableRow) => void;
}
