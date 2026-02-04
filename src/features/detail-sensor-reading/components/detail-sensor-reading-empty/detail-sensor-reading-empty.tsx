import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const DetailSensorReadingEmpty = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Нет данных по датчику</AlertTitle>
        <AlertDescription>
          Проверьте идентификатор датчика или попробуйте обновить страницу.
        </AlertDescription>
      </Alert>
    </div>
  );
};
