import { Droplets, Flame, Thermometer } from "lucide-react";
import { KpiStripProps } from "./kpi-strip.types";
import { KpiCard } from "../kpi-card/kpi-card";
import { THRESHOLDS } from "@/common/constants/readings";
import { formatMetric } from "@/common/utils/format-metric";

export const KpiStrip = ({ data }: KpiStripProps) => {
  const temperature = data.sensorReadings?.length
    ? data.sensorReadings[0].temperatureC
    : -1;
  const humidity = data.sensorReadings?.length
    ? data.sensorReadings[0].humidityPct
    : -1;
  const gas = data.sensorReadings?.length ? data.sensorReadings[0].gasPpm : -1;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <KpiCard
        title="Температура"
        value={formatMetric(temperature, "°C")}
        status={
          temperature > THRESHOLDS.temperatureCWarningAbove ? "warning" : "ok"
        }
        hint={`Порог предупреждения: > ${THRESHOLDS.temperatureCWarningAbove}°C`}
        icon={<Thermometer className="h-4 w-4" />}
      />

      <KpiCard
        title="Влажность"
        value={formatMetric(humidity, "%")}
        status={
          humidity < THRESHOLDS.humidityPctWarningBelow ||
          humidity > THRESHOLDS.humidityPctWarningAbove
            ? "warning"
            : "ok"
        }
        hint={`Порог предупреждения: < ${THRESHOLDS.humidityPctWarningBelow}% или > ${THRESHOLDS.humidityPctWarningAbove}%`}
        icon={<Droplets className="h-4 w-4" />}
      />

      <KpiCard
        title="Газ"
        value={formatMetric(gas, "ppm")}
        status={gas > THRESHOLDS.gasPpmWarningAbove ? "warning" : "ok"}
        hint={`Порог предупреждения: > ${THRESHOLDS.gasPpmWarningAbove} ppm`}
        icon={<Flame className="h-4 w-4" />}
      />
    </div>
  );
};
