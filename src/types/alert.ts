export type Alert = {
  id: string;
  cameraId: string;
  description: string;
  dateTime: number;
  status: "pending" | "confirmed" | "rejected";
};

export type AlertContextType = {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
};
