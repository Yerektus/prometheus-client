import { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/common/components/ui/input-group";
import { AddUserDialog } from "../add-user-dialog/add-user-dialog";
import { UsersTableToolbarProps } from "./users-table-toolbar.types";

export function UsersTableToolbar<TData>({
  table,
  refetch,
  sensorOptions,
}: UsersTableToolbarProps<TData>) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = (needRefresh?: boolean) => {
    setIsOpenDialog(false);
    if (needRefresh) {
      refetch();
    }
  };

  return (
    <div className="mb-4 flex flex-col items-center gap-3">
      <div className="flex w-full items-center gap-2">
        <InputGroup>
          <InputGroupInput
            value={
              (table.getColumn("search")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("search")?.setFilterValue(event.target.value)
            }
            placeholder="Фильтр по ФИО или username"
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <Button onClick={handleOpenDialog}>
          <PlusCircle />
          Добавить пользователя
        </Button>
      </div>

      <AddUserDialog
        isOpen={isOpenDialog}
        onClose={handleCloseDialog}
        sensorOptions={sensorOptions}
      />
    </div>
  );
}
