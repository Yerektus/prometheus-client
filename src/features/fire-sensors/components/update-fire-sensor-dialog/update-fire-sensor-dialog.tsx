import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/common/components/ui/alert-dialog";
import { UpdateFireSensorDialogProps } from "./update-fire-sensor-dialog.types";
import { updateFireSensor } from "@/common/api/requests/fire-sensors/update-fire-sensor";
import { useMutation } from "@tanstack/react-query";
import { FireSensorAndLocation } from "../update-fire-sensor-sheet/update-fire-sensor-sheet.types";
import { toast } from "sonner";

export function UpdateFireSensorDialog({
  fireSensorAndLocation,
  isOpen,
  onClose,
}: UpdateFireSensorDialogProps) {
  const updateFireSensorMutation = useMutation({
    mutationFn: async (payload: FireSensorAndLocation) =>
      await updateFireSensor(payload),
    onSuccess: () => {
      toast.success("Датчик успешно редактирован.");
      onClose(true);
    },
  });

  const handleClose = () => {
    onClose(false);
  };

  const handleSubmit = async () => {
    await updateFireSensorMutation.mutateAsync(fireSensorAndLocation);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие необратимо. Оно позволит редактировать вашу запись
            непосредственно на наших серверах.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleSubmit()}>
            Продолжить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
