import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// 🧩 Contextos
import { SocketProvider } from "./context/SocketContext.tsx";
import { CameraProvider } from "./context/CameraContext.tsx";
import { ActivityProvider } from "./context/ActivityContext.tsx";
import { AlertProvider } from "./context/AlertContext.tsx";
import { PreventAlertProvider } from "./context/PreventAlertsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 🔌 SocketProvider debe envolver a todos para compartir la conexión */}
    <SocketProvider>
      <CameraProvider>
        <AlertProvider>
          <PreventAlertProvider>
            <ActivityProvider>
              <App />
            </ActivityProvider>
          </PreventAlertProvider>
        </AlertProvider>
      </CameraProvider>
    </SocketProvider>
  </StrictMode>
);
