import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { Separator } from "@/common/components/ui/separator";
import { SensorsCellProps } from "./sensors-cell.types";

export const SensorsCell = ({
  serialNumbers,
  visibleCount,
}: SensorsCellProps) => {
  if (!serialNumbers.length) {
    return <span className="text-muted-foreground">—</span>;
  }

  const visible = serialNumbers.slice(0, visibleCount);
  const hidden = serialNumbers.slice(visibleCount);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {visible.map((serialNumber, index) => (
        <Badge key={`${serialNumber}-${index}`} variant="outline">
          {serialNumber}
        </Badge>
      ))}
      {hidden.length > 0 && (
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">+{hidden.length}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="text-sm font-medium">Датчики</div>
            <Separator />
            <div className="flex flex-col gap-2">
              {serialNumbers.map((serialNumber, index) => (
                <Badge key={`${serialNumber}-full-${index}`} variant="outline">
                  {serialNumber}
                </Badge>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
