import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { Separator } from "@/common/components/ui/separator";
import { Skeleton } from "@/common/components/ui/skeleton";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { DetailSensorReadingProps } from "./detail-sensor-reading.types";
import { dateTimeFormatter } from "@/common/utils/date-time-formatter";
import { ReadingLevel, THRESHOLDS } from "../reading-row/reading-row.types";
import { ReadingRow } from "../reading-row/reading-row";
import { LocationRow } from "../location-row/location-row";
import { DetailSensorReadingEmpty } from "../detail-sensor-reading-empty/detail-sensor-reading-empty";

function getTemperatureLevel(value: number): ReadingLevel {
  return value > THRESHOLDS.temperatureCWarningAbove ? "warning" : "ok";
}

function getHumidityLevel(value: number): ReadingLevel {
  return value < THRESHOLDS.humidityPctWarningBelow ||
    value > THRESHOLDS.humidityPctWarningAbove
    ? "warning"
    : "ok";
}

function getGasLevel(value: number): ReadingLevel {
  return value > THRESHOLDS.gasPpmWarningAbove ? "warning" : "ok";
}

export const DetailSensorReading = ({
  data,
  isLoading,
}: DetailSensorReadingProps) => {
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <div className="min-w-0">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-40" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-56" />
          <Skeleton className="h-56" />
        </div>

        <Separator />

        <div className="flex flex-col gap-4 w-full h-[720px]">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    );
  }

  if (!data || !data.fireSensor || !data.fireSensor.location) {
    return <DetailSensorReadingEmpty />;
  }

  const lastRecorded = dateTimeFormatter(data.recordedAt ?? "");

  const temperatureLevel = getTemperatureLevel(data.temperatureC ?? -1);
  const humidityLevel = getHumidityLevel(data.humidityPct ?? -1);
  const gasLevel = getGasLevel(data.gasPpm ?? -1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-medium leading-tight">
          Датчик {data.fireSensor ? data.fireSensor.model : ""}
        </h1>
        <p className="text-sm text-muted-foreground">
          {data.fireSensor ? data.fireSensor.serialNumber : ""}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Текущие показания</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ReadingRow
              label="Температура"
              value={`${data.temperatureC ?? -1} °C`}
              level={temperatureLevel}
            />
            <ReadingRow
              label="Влажность"
              value={`${data.humidityPct ?? -1} %`}
              level={humidityLevel}
            />
            <ReadingRow
              label="Газ"
              value={`${data.gasPpm ?? -1} ppm`}
              level={gasLevel}
            />

            <div className="pt-1 text-sm text-muted-foreground">
              Обновлено: {lastRecorded}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Локация</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <LocationRow
              label="Страна"
              value={data.fireSensor.location?.country || ""}
            />
            <LocationRow
              label="Город"
              value={data.fireSensor.location?.city || ""}
            />
            <LocationRow
              label="Адрес"
              value={data.fireSensor.location?.address || ""}
            />
            <LocationRow
              label="Этаж"
              value={data.fireSensor.location?.flat || ""}
            />
            <LocationRow
              label="Квартира"
              value={data.fireSensor.location?.flat || ""}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 w-full h-[720px]">
        <h1 className="text-xl font-medium leading-tight">
          Карта локации датчика
        </h1>
        <Map
          style={{ width: "100%", height: "100%", borderRadius: "16px" }}
          mapStyle="https://demotiles.maplibre.org/style.json"
        />
      </div>
    </div>
  );
};
