import { createContext, ReactNode, useContext, useState } from "react";
import { AlertContextType, type Alert } from "../types/alert";
import { BACKEND_URL } from "../utils/constants";

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = async (alert: Alert) => {
    // 🧠 Evitar duplicados locales
    setAlerts((prev) => {
      if (prev.some((a) => a.alert_id === alert.alert_id)) return prev;
      return [alert, ...prev];
    });

    // 🌐 Enviar al backend para guardar y mandar a Telegram
    try {
      const response = await fetch(`${BACKEND_URL}/send_alert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alert),
      });

      if (!response.ok) {
        console.error("❌ Error al enviar alerta al backend:", await response.text());
      } else {
        console.log("✅ Alerta enviada correctamente al backend");
      }
    } catch (err) {
      console.error("💥 Error de conexión con el backend:", err);
    }
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlertContext debe usarse dentro de AlertProvider");
  return context;
};
