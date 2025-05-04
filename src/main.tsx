import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CameraProvider } from "./context/CameraContext.tsx";
import { ActivityProvider } from "./context/ActivityContext.tsx";
import { AlertProvider } from "./context/AlertContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CameraProvider>
      <AlertProvider>
        <ActivityProvider>
          <App />
        </ActivityProvider>
      </AlertProvider>
    </CameraProvider>
  </StrictMode>
);
