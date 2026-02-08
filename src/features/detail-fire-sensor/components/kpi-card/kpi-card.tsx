import { Badge } from "@/common/components/ui/badge";
import { kpiCardProps } from "./kpi-card.types";
import { Card, CardContent } from "@/common/components/ui/card";
import { ReadingLevel } from "@/common/constants/readings";

function MetricBadge({ status }: { status: ReadingLevel }) {
  return (
    <Badge
      variant={status === "warning" ? "destructive" : "secondary"}
      className="ml-auto text-[10px] uppercase tracking-wide"
    >
      {status === "warning" ? "Warning" : "OK"}
    </Badge>
  );
}

export const KpiCard = ({ title, value, hint, status, icon }: kpiCardProps) => {
  return (
    <Card className="h-full rounded-xl border-border/70 bg-card/80">
      <CardContent className="flex h-full flex-col gap-3 p-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">{icon}</span>
          <span className="font-medium text-foreground">{title}</span>
          <MetricBadge status={status} />
        </div>

        <div className="text-2xl font-semibold tracking-tight">{value}</div>

        <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
};
