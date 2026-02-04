import { useQuery } from "@tanstack/react-query";
import { FireSensorsTable } from "../components/fire-sensors-table/fire-sensors-table";
import { mapFireSensorAndLocationToColumns } from "@/common/api/mappers/location-fire-sensor.mapper";
import { fetchFireSensors } from "@/common/api/requests/fire-sensors/fetch-fire-sensors";
import { useEffect, useMemo } from "react";
import { usePageHeader } from "@/common/hooks/use-page-header";
import { useLocation } from "react-router-dom";

export const FireSensorsView = () => {
  const { setItems } = usePageHeader();
  const location = useLocation();

  const { data, refetch } = useQuery({
    queryKey: ["fireSensors"],
    queryFn: fetchFireSensors,
    retry: false,
  });

  const fireSensorAndLocation = useMemo(
    () =>
      data?.map((fireSensor) =>
        mapFireSensorAndLocationToColumns(fireSensor),
      ) ?? [],
    [data],
  );

  useEffect(() => {
    setItems([
      {
        title: "Датчики",
        href: location.pathname,
      },
    ]);
  }, [setItems]);

  return (
    <div className="w-full h-screen py-4 px-8">
      <FireSensorsTable refetch={refetch} data={fireSensorAndLocation} />
    </div>
  );
};
