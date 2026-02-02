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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { DeleteFireSensorDialogProps } from "./delete-fire-sensor-dialog.types";
import { deleteFireSensor } from "@/common/api/requests/fire-sensors/delete-fire-sensor";

export function DeleteFireSensorDialog({
  fireSensorId,
  isOpen,
  onClose,
}: DeleteFireSensorDialogProps) {
  const deleteFireSensorMutation = useMutation({
    mutationFn: async (fireSensorId: string) =>
      await deleteFireSensor(fireSensorId),
    onSuccess: () => {
      toast.success("Датчик успешно удален.");
      onClose(true);
    },
  });

  const handleClose = () => {
    onClose(false);
  };

  const handleSubmit = async () => {
    await deleteFireSensorMutation.mutateAsync(fireSensorId);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие необратимо. Оно позволит удалить вашу запись
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
