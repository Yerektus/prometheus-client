import { Input } from "@/common/components/ui/input";
import { FireSensorsTableToolbarProps } from "./fire-sensors-table-toolbar.types";
import { Button } from "@/common/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/common/components/ui/input-group";

export function FireSensorsTableToolbar<TData>({
  table,
}: FireSensorsTableToolbarProps<TData>) {
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
        <Button>
          <PlusCircle />
          Добавить датчик
        </Button>
      </div>
    </div>
  );
}
