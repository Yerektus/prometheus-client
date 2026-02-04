import { AlertTriangle } from "lucide-react";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/alert";
import { dateTimeFormatter } from "@/common/utils/date-time-formatter";
import { Separator } from "@/common/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchSensorReadingById } from "@/common/api/requests/sensor-reading/fetch-sensor-reading";
import { DetailSensorReading } from "../components/detail-sensor-reading/detail-sensor-reading";
import { DetailSensorReadingEmpty } from "../components/detail-sensor-reading-empty/detail-sensor-reading-empty";
import { usePageHeader } from "@/common/hooks/use-page-header";
import { useEffect } from "react";
import { paths } from "@/common/constants/paths";

export function DetailSensorReadingView() {
  const { setItems } = usePageHeader();
  const { sensorReadingId } = useParams<{ sensorReadingId: string }>();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail-sensor-reading"],
    queryFn: () => fetchSensorReadingById(sensorReadingId ?? ""),
  });

  useEffect(() => {
    setItems([
      {
        title: "Показаний датчиков",
        href: paths.getSensorReadingsPath(),
      },
      {
        title: data?.fireSensor?.serialNumber ?? "",
        href: location.pathname,
      },
    ]);
  }, [data, setItems]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <Alert variant="default">
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>
            Не удалось загрузить данные по датчику.
          </AlertDescription>
          <Button className="mt-4" onClick={() => refetch()}>
            Повторить
          </Button>
        </Alert>
      </div>
    );
  }

  if (!sensorReadingId) {
    return <DetailSensorReadingEmpty />;
  }

  return <DetailSensorReading isLoading={isLoading} data={data} />;
}
