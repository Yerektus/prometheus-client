import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { fetchFireSensorsWithReadings } from "@/common/api/requests/fire-sensors/fetch-fire-sensors-readings";
import { SensorReadingsTable } from "../components/sensor-readings-table/sensor-readings-table";
import { mapSensorReadingsToColumns } from "@/common/api/mappers/sensor-readings-columns.mapper";
import { usePageHeader } from "@/common/hooks/use-page-header";
import { useLocation } from "react-router-dom";

export const SensorReadingsView = () => {
  const location = useLocation();
  const { setItems } = usePageHeader();
  const { data } = useQuery({
    queryKey: ["fire-sensor-with-readings"],
    queryFn: fetchFireSensorsWithReadings,
    retry: false,
  });

  useEffect(() => {
    setItems([
      {
        title: "Показаний датчиков",
        href: location.pathname,
      },
    ]);
  }, [setItems]);

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
