import { FireSensorsTableToolbarProps } from "./fire-sensors-table-toolbar.types";
import { Button } from "@/common/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/common/components/ui/input-group";
import { useState } from "react";
import { AddFireSensorDialog } from "../add-fire-sensor-dialog/add-fire-sensor-dialog";

export function FireSensorsTableToolbar<TData>({
  table,
  refetch,
}: FireSensorsTableToolbarProps<TData>) {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = (needRefresh?: boolean) => {
    setIsOpenDialog(false);
    if (needRefresh) refetch();
  };

  return (
    <div className="flex gap-3 flex-col items-center mb-4">
      <div className="w-full flex items-center gap-2">
        <InputGroup>
          <InputGroupInput
            value={
              (table.getColumn("serialNumber")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("serialNumber")
                ?.setFilterValue(event.target.value)
            }
            placeholder="Фильтр по серийному номеру"
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <Button onClick={handleOpenDialog}>
          <PlusCircle />
          Добавить датчик
        </Button>
      </div>
      <AddFireSensorDialog isOpen={isOpenDialog} onClose={handleCloseDialog} />
    </div>
  );
}
