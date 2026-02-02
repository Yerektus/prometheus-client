export interface DeleteFireSensorDialogProps {
  isOpen: boolean;
  onClose: (needRefresh?: boolean) => void;
  fireSensorId: string;
}
