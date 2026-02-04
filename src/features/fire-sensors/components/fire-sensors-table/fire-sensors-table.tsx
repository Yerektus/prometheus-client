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
import { FireSensorsTableToolbar } from "../fire-sensors-table-toolbar/fire-sensors-table-toolbar";
import { FireSensorAndLocationColumns } from "@/common/entities/fire-sensor-and-location";
import { FireSensorBadge } from "../fire-sensor-badge/fire-sensor-badge";
import {
  FireSensorsTableColumnsProps,
  FireSensorsTableProps,
} from "./fire-sensors-table.types";
import { UsersCell } from "../users-cell/users-cell";
import { PanelRightOpen } from "lucide-react";
import { UpdateFireSensorSheet } from "../update-fire-sensor-sheet/update-fire-sensor-sheet";
import { useNavigate } from "react-router-dom";
import { paths } from "@/common/constants/paths";

const getColumns = ({
  onOpenSheet,
}: FireSensorsTableColumnsProps): ColumnDef<FireSensorAndLocationColumns>[] => {
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
        <div className="lowercase">
          {row.getValue("model")}
          <Button
            className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto absolute right-1 top-1/2 -translate-y-1/2 rounded-sm"
            variant={"outline"}
            size={"xs"}
            onClick={(event) => {
              event.stopPropagation();
              onOpenSheet(row.original);
            }}
          >
            <PanelRightOpen />
            Открыть
          </Button>
        </div>
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
      accessorKey: "city",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Город
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("city")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Адрес
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("address")}</div>
      ),
    },
    {
      accessorKey: "users",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Владельцы
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">
          <UsersCell visibleCount={2} users={row.original.users ?? []} />
        </div>
      ),
    },
    {
      accessorKey: "installedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Дата и время установки
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("installedAt")}</div>
      ),
    },
  ];
};

export const FireSensorsTable = ({ data, refetch }: FireSensorsTableProps) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isOpenUpdateSheet, setIsOpenUpdateDailog] =
    React.useState<boolean>(false);
  const [fireSensorForUpdate, setFireSensorForUpdate] =
    React.useState<FireSensorAndLocationColumns>(
      {} as FireSensorAndLocationColumns,
    );

  const handleOpenUpdateSheet = (fireSensor: FireSensorAndLocationColumns) => {
    setFireSensorForUpdate(fireSensor);
    setIsOpenUpdateDailog(true);
  };

  const handleCloseUpdateSheet = (needRefresh?: boolean) => {
    setIsOpenUpdateDailog(false);
    if (needRefresh) {
      refetch();
    }
  };

  const handleClickRow = (sensorId: string) => {
    navigate(paths.getDetailSensorPath(sensorId));
  };

  const columns = React.useMemo(
    () => getColumns({ onOpenSheet: handleOpenUpdateSheet }),
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.fireSensorId ?? "",
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
      <FireSensorsTableToolbar refetch={refetch} table={table} />
      <DataTable table={table} onClickRow={handleClickRow} />
      <UpdateFireSensorSheet
        isOpen={isOpenUpdateSheet}
        onClose={handleCloseUpdateSheet}
        fireSensor={fireSensorForUpdate}
      />
    </div>
  );
};
