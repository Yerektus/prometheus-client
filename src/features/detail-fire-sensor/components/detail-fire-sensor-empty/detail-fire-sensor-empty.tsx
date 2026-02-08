import { Button } from "@/common/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";

interface DetailFireSensorEmptyProps {
  onRetry: () => void;
}

export function DetailFireSensorEmpty({ onRetry }: DetailFireSensorEmptyProps) {
  return (
    <div className="p-4 md:p-6">
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Нет данных по датчику</CardTitle>
          <CardDescription>
            Проверьте доступность датчика или повторите запрос.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onRetry}>Повторить</Button>
        </CardContent>
      </Card>
    </div>
  );
}
