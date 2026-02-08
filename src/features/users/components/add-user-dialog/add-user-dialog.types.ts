import { SensorOption } from "../users-table/users-table.types";

export interface AddUserDialogProps {
  isOpen: boolean;
  onClose: (needRefresh?: boolean) => void;
  sensorOptions: SensorOption[];
}
