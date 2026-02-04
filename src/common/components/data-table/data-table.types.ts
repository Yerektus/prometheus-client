import { Table } from "@tanstack/react-table";

export interface DataTableProps<TData> {
  table: Table<TData>;
  onClickRow: (id: string) => void;
}
