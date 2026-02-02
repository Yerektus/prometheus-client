import { FireSensorAndLocation } from "../update-fire-sensor-sheet/update-fire-sensor-sheet.types";

export interface UpdateFireSensorDialogProps {
  isOpen: boolean;
  onClose: (needRefresh?: boolean) => void;
  fireSensorAndLocation: FireSensorAndLocation;
}
