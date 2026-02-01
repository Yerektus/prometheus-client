import { Table } from "@tanstack/react-table";

export interface FireSensorsTableToolbarProps<TData> {
  table: Table<TData>;
  refetch: () => void;
}
