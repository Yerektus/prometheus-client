import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { fetchFireSensorById } from "@/common/api/requests/fire-sensors/fetch-fire-sensor-by-id";
import { paths } from "@/common/constants/paths";
import { usePageHeader } from "@/common/hooks/use-page-header";
import { DetailFireSensor } from "../components/detail-fire-sensor/detail-fire-sensor";
import { DetailFireSensorEmpty } from "../components/detail-fire-sensor-empty/detail-fire-sensor-empty";
import { DetailFireSensorLoading } from "../components/detail-fire-sensor-loading/detail-fire-sensor-loading";

export function FireSensorDetailView() {
  const { setItems } = usePageHeader();
  const { sensorId } = useParams<{ sensorId: string }>();
  const location = useLocation();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail-fire-sensor", sensorId],
    queryFn: () => fetchFireSensorById(sensorId ?? ""),
    retry: false,
  });
  const hasError = Boolean(error);

  React.useEffect(() => {
    if (!data || !data.serialNumber) {
      return;
    }

    setItems([
      {
        title: "Датчики",
        href: paths.getSensorsPath(),
      },
      {
        title: data.serialNumber,
        href: location.pathname,
      },
    ]);
  }, [data, location.pathname, setItems]);

  if (isLoading) {
    return <DetailFireSensorLoading />;
  }

  if (!data) {
    return <DetailFireSensorEmpty onRetry={refetch} />;
  }

  const hasKeyData = Boolean(data.id && data.serialNumber);
  if (!hasKeyData) {
    return <DetailFireSensorEmpty onRetry={refetch} />;
  }

  return <DetailFireSensor data={data} hasError={hasError} onRetry={refetch} />;
}
