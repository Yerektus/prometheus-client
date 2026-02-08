import { UpdateUserPayload } from "@/common/api/requests/users/update-user";
import { SensorOption, UsersTableRow } from "../users-table/users-table.types";

export interface UpdateUserSheetProps {
  isOpen: boolean;
  onClose: (needRefresh?: boolean) => void;
  user: UsersTableRow | null;
  sensorOptions: SensorOption[];
}

export interface UpdateUserDialogState {
  isOpen: boolean;
  payload: UpdateUserPayload | null;
}
