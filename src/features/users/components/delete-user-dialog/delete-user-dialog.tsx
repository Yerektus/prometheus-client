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
import { deleteUser } from "@/common/api/requests/users/delete-user";
import { buildHttpHandler } from "@/common/utils/build-http-error";
import { DeleteUserDialogProps } from "./delete-user-dialog.types";

export const DeleteUserDialog = ({
  userId,
  isOpen,
  onClose,
}: DeleteUserDialogProps) => {
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Пользователь успешно удален.");
      onClose(true);
    },
    onError: (error) => buildHttpHandler(error),
  });

  const handleClose = () => {
    onClose(false);
  };

  const handleSubmit = async () => {
    if (!userId) {
      onClose(false);
      return;
    }

    await deleteUserMutation.mutateAsync(userId);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить пользователя?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие необратимо и удалит пользователя из системы.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => void handleSubmit()}
            disabled={deleteUserMutation.isPending}
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
