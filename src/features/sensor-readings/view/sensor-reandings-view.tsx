import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchFireSensorsWithReadings } from "@/common/api/requests/fire-sensors/fetch-fire-sensors-readings";
import { SensorReadingsTable } from "../components/sensor-readings-table";
import { mapSensorReadingsToColumns } from "@/common/api/mappers/sensor-readings-columns.mapper";

export const SensorReadingsView = () => {
  const { data } = useQuery({
    queryKey: ["fire-sensor-with-readings"],
    queryFn: fetchFireSensorsWithReadings,
    retry: false,
  });

  const fireSensorWithReadings = useMemo(
    () =>
      data?.map((fireSensor) => mapSensorReadingsToColumns(fireSensor)) ?? [],
    [data],
  );

  return (
    <div className="w-full h-screen py-4 px-8">
      <SensorReadingsTable data={fireSensorWithReadings} />
    </div>
  );
};
