import * as React from "react";
import { Button } from "@/common/components/ui/button";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { DataTable } from "@/common/components/data-table/data-table";
import { SensorReadingsTableProps } from "./sensor-readings-table.types";
import { SensorReadingsColumns } from "@/common/entities/sensor-readings-columns";
import { FireSensorBadge } from "@/features/fire-sensors/components/fire-sensor-badge/fire-sensor-badge";
import { dateTimeFormatter } from "@/common/utils/date-time-formatter";

const getColumns = (): ColumnDef<SensorReadingsColumns>[] => {
  return [
    {
      accessorKey: "model",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Модель устройства
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("model")}</div>
      ),
    },
    {
      accessorKey: "serialNumber",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Серийный номер
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("serialNumber")}</div>
      ),
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Активность
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">
          <FireSensorBadge isActive={row.getValue("isActive")} />
        </div>
      ),
    },
    {
      accessorKey: "temperatureC",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Температура
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("temperatureC")}°C</div>,
    },
    {
      accessorKey: "humidityPct",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Влажность
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("humidityPct")}%</div>,
    },
    {
      accessorKey: "gasPpm",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Газ
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("gasPpm")} ppm</div>,
    },
    {
      accessorKey: "recordedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Время записи
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">
          {dateTimeFormatter(row.getValue("recordedAt"))}
        </div>
      ),
    },
  ];
};

export const SensorReadingsTable = ({ data }: SensorReadingsTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo(() => getColumns(), []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <DataTable table={table} />
    </div>
  );
};
