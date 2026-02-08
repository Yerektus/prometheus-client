import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
import { DetailFireSensorTabsProps } from "./detail-fire-sensos-table.types";
import { SensorReadingsTable } from "@/features/sensor-readings/components/sensor-readings-table/sensor-readings-table";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFireSensorsWithReadings } from "@/common/api/requests/fire-sensors/fetch-fire-sensors-readings";
import { mapSensorReadingsToColumns } from "@/common/api/mappers/sensor-readings-columns.mapper";

export const DetailFireSensorTabs = ({ data }: DetailFireSensorTabsProps) => {
  const { data: readings } = useQuery({
    queryKey: ["fire-sensor-with-readings"],
    queryFn: fetchFireSensorsWithReadings,
    retry: false,
  });

  const fireSensorWithReadings = useMemo(
    () =>
      readings?.map((fireSensor) => mapSensorReadingsToColumns(fireSensor)) ??
      [],
    [readings],
  );

  return (
    <Card className="rounded-xl border-border/70">
      <CardHeader>
        <CardTitle>Детали</CardTitle>
        <CardDescription>
          История изменений показаний и связанные пользователи
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        <Tabs defaultValue="readings" className={"flex flex-col"}>
          <TabsList>
            <TabsTrigger value="readings">Показания</TabsTrigger>
            <TabsTrigger value="users">
              Пользователи {data.location?.users.length}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="readings">
            <SensorReadingsTable data={fireSensorWithReadings} />
          </TabsContent>

          <TabsContent value="users">users</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
