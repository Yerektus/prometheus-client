import * as React from "react";
import { DataTable } from "@/common/components/data-table/data-table";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ReadingsTabContentProps,
  ReadingsTableRow,
} from "./readings-tab-content.types";
import { getReadingsTabColumns } from "./readings-tab-content.columns";

export const ReadingsTabContent = ({
  sensorReadings,
}: ReadingsTabContentProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const data = React.useMemo<ReadingsTableRow[]>(
    () =>
      sensorReadings
        .map((reading) => ({
          id: reading.id,
          recordedAt: reading.recordedAt,
          temperatureC: reading.temperatureC,
          gasPpm: reading.gasPpm,
          humidityPct: reading.humidityPct,
        }))
        .sort(
          (a, b) =>
            new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime(),
        ),
    [sensorReadings],
  );

  const columns = React.useMemo(() => getReadingsTabColumns(), []);

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
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

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
        История показаний отсутствует.
      </div>
    );
  }

  return (
    <div className="w-full">
      <DataTable table={table} onClickRow={(_rowId) => {}} />
    </div>
  );
};
