import { Separator } from "@/common/components/ui/separator";
import { LocationRowProps } from "./location-row.types";

export function LocationRow({ label, value }: LocationRowProps) {
  return (
    <div className="flex items-end justify-between">
      <div className="text-md text-muted-foreground">{label}</div>
      <Separator className="w-auto flex-1 border mx-2" />
      <div className="text-xl font-medium leading-tight">{value}</div>
    </div>
  );
}
