import { createContext, ReactNode, useContext, useState } from "react";
import { AlertContextType, type Alert } from "../types/alert";
import { alertDataMock } from "../mocks/alertDataMocks";

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>(alertDataMock /*[]*/);

  const addAlert = (alert: Alert) => {
    setAlerts((prev) => [alert, ...prev]);
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("");
  }

  return context;
};
