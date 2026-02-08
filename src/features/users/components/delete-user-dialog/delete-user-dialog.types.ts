export interface DeleteUserDialogProps {
  userId: string;
  isOpen: boolean;
  onClose: (needRefresh?: boolean) => void;
}
