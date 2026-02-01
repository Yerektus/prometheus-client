import { useQuery } from "@tanstack/react-query";
import { FireSensorsTable } from "../components/fire-sensors-table/fire-sensors-table";
import { mapFireSensorAndLocationToColumns } from "@/common/api/mappers/location-fire-sensor.mapper";
import { fetchFireSensors } from "@/common/api/requests/fire-sensors/fetch-fire-sensors";
import { useMemo } from "react";

export const FireSensorsView = () => {
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

  return (
    <div className="w-full h-screen p-4">
      <FireSensorsTable refetch={refetch} data={fireSensorAndLocation} />
    </div>
  );
};
