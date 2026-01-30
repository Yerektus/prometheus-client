import { Input } from "@/common/components/ui/input";
import { FireSensorsTableToolbarProps } from "./fire-sensors-table-toolbar.types";
import { Button } from "@/common/components/ui/button";
import { PlusCircle } from "lucide-react";

export function FireSensorsTableToolbar<TData>({
  table,
}: FireSensorsTableToolbarProps<TData>) {
  return (
    <div className="flex gap-3 flex-col items-center mb-4">
      <div className="w-full">
        <Input
          placeholder="Фильтр по серийному номеру"
          value={
            (table.getColumn("serialNumber")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("serialNumber")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
      </div>
      <div className="w-full flex justify-end">
        <Button>
          <PlusCircle />
          Добавить датчик
        </Button>
      </div>
    </div>
  );
}
