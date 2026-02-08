import { Table } from "@tanstack/react-table";
import { SensorOption } from "../users-table/users-table.types";

export interface UsersTableToolbarProps<TData> {
  table: Table<TData>;
  refetch: () => void;
  sensorOptions: SensorOption[];
}
