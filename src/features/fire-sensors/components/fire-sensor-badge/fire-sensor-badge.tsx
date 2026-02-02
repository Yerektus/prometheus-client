import { Badge } from "@/common/components/ui/badge";
import { FireSensorBadgeProps } from "./fire-sensor-badge.types";
import { ShieldCheck, ShieldOff } from "lucide-react";

export const FireSensorBadge = ({ isActive }: FireSensorBadgeProps) => {
  return (
    <Badge
      variant={"outline"}
      className={isActive ? "bg-green-50 text-green-700 border-green-700" : ""}
    >
      {isActive ? (
        <>
          <ShieldCheck /> Работает
        </>
      ) : (
        <>
          <ShieldOff /> Не работает
        </>
      )}
    </Badge>
  );
};
