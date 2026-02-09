import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartPoint, ReadingsChartProps } from "./readings-chart.types";
import { dateTimeFormatter } from "@/common/utils/date-time-formatter";
import { Separator } from "@/common/components/ui/separator";

type MetricKey = "temperatureC" | "gasPpm" | "humidityPct";

const METRIC_CHARTS: Array<{
  key: MetricKey;
  label: string;
  unit: string;
  color: string;
}> = [
  {
    key: "temperatureC",
    label: "Температура",
    unit: "°C",
    color: "var(--color-chart-1)",
  },
  {
    key: "gasPpm",
    label: "Газ",
    unit: "ppm",
    color: "var(--color-chart-2)",
  },
  {
    key: "humidityPct",
    label: "Влажность",
    unit: "%",
    color: "var(--color-chart-3)",
  },
];

export const ReadingsChart = ({ sensorReadings }: ReadingsChartProps) => {
  const chartData = React.useMemo<ChartPoint[]>(
    () =>
      [...(sensorReadings ?? [])]
        .sort(
          (a, b) =>
            new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime(),
        )
        .map((reading) => ({
          id: reading.id,
          recordedAt: reading.recordedAt,
          timeLabel: dateTimeFormatter(reading.recordedAt) || "–",
          temperatureC: reading.temperatureC,
          gasPpm: reading.gasPpm,
          humidityPct: reading.humidityPct,
        })),
    [sensorReadings],
  );

  if (chartData.length === 0) {
    return (
      <Card className="rounded-xl border-border/70">
        <CardHeader>
          <CardTitle>Графики показаний</CardTitle>
          <CardDescription>
            Динамика температуры, газа и влажности
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
            Недостаточно данных для построения графика.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border-border/70">
      <CardHeader>
        <CardTitle>Графики показаний</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          {METRIC_CHARTS.map((metric, index) => (
            <>
              <div key={metric.key}>
                <div className="mb-2">
                  <p className="text-sm font-medium">{metric.label}</p>
                </div>

                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 6, right: 8, left: 0, bottom: 2 }}
                    >
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="timeLabel"
                        tickLine={false}
                        axisLine={false}
                        minTickGap={20}
                      />
                      <YAxis tickLine={false} axisLine={false} width={36} />
                      <Tooltip
                        formatter={(value) => {
                          if (typeof value === "number") {
                            return [`${value} ${metric.unit}`, metric.label];
                          }

                          return [String(value), metric.label];
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey={metric.key}
                        name={metric.label}
                        stroke={metric.color}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {index !== METRIC_CHARTS.length - 1 ? (
                <Separator orientation="horizontal" className={"border"} />
              ) : (
                ""
              )}
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
