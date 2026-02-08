import { UpdateUserPayload } from "@/common/api/requests/users/update-user";

export interface UpdateUserDialogProps {
  isOpen: boolean;
  payload: UpdateUserPayload | null;
  onClose: (needRefresh?: boolean) => void;
}
