import { Badge } from "@/common/components/ui/badge";
import { ReadingRowProps } from "./reading-row.types";

export const ReadingRow = ({ label, value, level }: ReadingRowProps) => {
  const badgeText = level === "warning" ? "Warning" : "OK";
  const badgeClassName =
    level === "warning"
      ? "border-amber-200 bg-amber-50 text-amber-800"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl font-semibold leading-tight">{value}</div>
      </div>

      <Badge variant="outline" className={badgeClassName}>
        {badgeText}
      </Badge>
    </div>
  );
};
