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
import { updateUser } from "@/common/api/requests/users/update-user";
import { buildHttpHandler } from "@/common/utils/build-http-error";
import { UpdateUserDialogProps } from "./update-user-dialog.types";

export const UpdateUserDialog = ({
  isOpen,
  payload,
  onClose,
}: UpdateUserDialogProps) => {
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Пользователь успешно обновлен.");
      onClose(true);
    },
    onError: (error) => buildHttpHandler(error),
  });

  const handleClose = () => {
    onClose(false);
  };

  const handleSubmit = async () => {
    if (!payload) {
      onClose(false);
      return;
    }

    await updateUserMutation.mutateAsync(payload);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Сохранить изменения пользователя?</AlertDialogTitle>
          <AlertDialogDescription>
            Будут обновлены данные пользователя, роли и привязанные датчики.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => void handleSubmit()}
            disabled={updateUserMutation.isPending}
          >
            Продолжить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
