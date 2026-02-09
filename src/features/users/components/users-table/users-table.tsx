import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PanelRightOpen } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { DataTable } from "@/common/components/data-table/data-table";
import { UserInitials } from "@/common/components/user-initials/user-initials";
import { RolesCell } from "../roles-cell/roles-cell";
import { SensorsCell } from "../sensors-cell/sensors-cell";
import { UpdateUserSheet } from "../update-user-sheet/update-user-sheet";
import { UsersTableToolbar } from "../users-table-toolbar/users-table-toolbar";
import {
  UsersTableColumnsProps,
  UsersTableProps,
  UsersTableRow,
} from "./users-table.types";

const getColumns = ({
  onOpenSheet,
}: UsersTableColumnsProps): ColumnDef<UsersTableRow>[] => {
  return [
    {
      accessorKey: "search",
      header: () => null,
      cell: () => null,
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ФИО
        </Button>
      ),
      cell: ({ row }) => (
        <div className="relative flex items-center gap-2 pr-24">
          <UserInitials
            fullName={row.original.fullName}
            fallback={row.original.username}
            className="h-8 w-8 text-xs"
          />
          <span className="truncate">
            {(row.getValue("fullName") as string) || row.original.username || "—"}
          </span>
          <Button
            className="absolute right-1 top-1/2 pointer-events-none -translate-y-1/2 rounded-sm opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
            variant="outline"
            size="xs"
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
      accessorKey: "username",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("username") as string}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("email") as string}</div>,
    },
    {
      accessorKey: "phoneNumbers",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Телефон
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("phoneNumbers") as string}</div>,
    },
    {
      id: "roles",
      accessorFn: (row) => row.roles.join(", "),
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Роли
        </Button>
      ),
      cell: ({ row }) => (
        <RolesCell roles={row.original.roles} visibleCount={2} />
      ),
    },
    {
      id: "sensors",
      accessorFn: (row) => row.sensorsCount,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Датчики
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {row.original.sensorsCount}
          </span>
          <SensorsCell
            serialNumbers={row.original.sensorSerialNumbers}
            visibleCount={2}
          />
        </div>
      ),
    },
  ];
};

export const UsersTable = ({
  data,
  refetch,
  sensorOptions,
}: UsersTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ search: false });
  const [rowSelection, setRowSelection] = React.useState({});
  const [isOpenUpdateSheet, setIsOpenUpdateSheet] = React.useState(false);
  const [userForUpdate, setUserForUpdate] =
    React.useState<UsersTableRow | null>(null);

  const handleOpenUpdateSheet = React.useCallback((row: UsersTableRow) => {
    setUserForUpdate(row);
    setIsOpenUpdateSheet(true);
  }, []);

  const handleCloseUpdateSheet = React.useCallback(
    (needRefresh?: boolean) => {
      setIsOpenUpdateSheet(false);
      setUserForUpdate(null);
      if (needRefresh) {
        refetch();
      }
    },
    [refetch],
  );

  const handleClickRow = React.useCallback(
    (userId: string) => {
      const selectedRow = data.find((row) => row.id === userId);
      if (!selectedRow) return;
      handleOpenUpdateSheet(selectedRow);
    },
    [data, handleOpenUpdateSheet],
  );

  const columns = React.useMemo(
    () => getColumns({ onOpenSheet: handleOpenUpdateSheet }),
    [handleOpenUpdateSheet],
  );

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

  return (
    <div className="w-full">
      <UsersTableToolbar
        table={table}
        refetch={refetch}
        sensorOptions={sensorOptions}
      />
      <DataTable table={table} onClickRow={handleClickRow} />
      <UpdateUserSheet
        isOpen={isOpenUpdateSheet}
        onClose={handleCloseUpdateSheet}
        user={userForUpdate}
        sensorOptions={sensorOptions}
      />
    </div>
  );
};
