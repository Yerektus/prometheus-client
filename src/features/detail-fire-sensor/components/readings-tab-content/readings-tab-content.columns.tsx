import { Button } from "@/common/components/ui/button";
import { dateTimeFormatter } from "@/common/utils/date-time-formatter";
import { ColumnDef } from "@tanstack/react-table";
import { ReadingsTableRow } from "./readings-tab-content.types";
import { formatMetric } from "@/common/utils/format-metric";

export const getReadingsTabColumns = (): ColumnDef<ReadingsTableRow>[] => {
  return [
    {
      accessorKey: "recordedAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Время
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {dateTimeFormatter(row.getValue("recordedAt")) || "—"}
        </span>
      ),
    },
    {
      accessorKey: "temperatureC",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Температура
        </Button>
      ),
      cell: ({ row }) => (
        <span>{formatMetric(row.getValue("temperatureC"), "°C")}</span>
      ),
    },
    {
      accessorKey: "gasPpm",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Газ
        </Button>
      ),
      cell: ({ row }) => (
        <span>{formatMetric(row.getValue("gasPpm"), "ppm")}</span>
      ),
    },
    {
      accessorKey: "humidityPct",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Влажность
        </Button>
      ),
      cell: ({ row }) => (
        <span>{formatMetric(row.getValue("humidityPct"), "%")}</span>
      ),
    },
  ];
};
