import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { DetailFireSensorInfoProps } from "./detail-fire-sensor-info.types";
import { dateTimeFormatter } from "@/common/utils/date-time-formatter";

export const DetailFireSensorInfo = ({ data }: DetailFireSensorInfoProps) => {
  const installedAt =
    dateTimeFormatter(data.installedAt || "") ?? "Не установлен";

  const rows = [
    {
      label: "Модель",
      value: data.model || "—",
    },
    {
      label: "Серийный номер",
      value: data.serialNumber || "—",
    },
    {
      label: "Страна",
      value: data.location?.country || "—",
    },
    {
      label: "Город",
      value: data.location?.city || "—",
    },
    {
      label: "Адрес",
      value: data.location?.address || "—",
    },
    {
      label: "Этаж",
      value: data.location?.floor || "—",
    },
    {
      label: "Квартира",
      value: data.location?.flat || "—",
    },
    {
      label: "Дата установки",
      value: installedAt,
    },
  ];

  return (
    <Card className="rounded-xl border-border/70">
      <CardHeader className="pb-3">
        <CardTitle>Локация и устройство</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="border-b border-border/60 pb-2 last:border-b-0 last:pb-0"
          >
            <p className="text-xs text-muted-foreground">{row.label}</p>
            <p className="mt-1 text-sm font-medium break-words text-foreground">
              {row.value}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
