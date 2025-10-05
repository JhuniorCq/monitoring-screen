import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import {
  Camera,
  type CameraContextType,
  type StateCameras,
} from "../types/camera";

const CameraContext = createContext<CameraContextType | null>(null);

export const CameraProvider = ({ children }: { children: ReactNode }) => {
  const [cameraData, setCameraData] = useState<StateCameras>({});

  // Convierte el objeto a lista
  const cameraList = useMemo(() => Object.values(cameraData), [cameraData]);

  // 🧩 Actualiza toda la cámara
  const updateCamera = (camera: Camera) => {
    setCameraData((prev) => ({
      ...prev,
      [camera.camera_id]: camera,
    }));
  };

  // 🎯 Actualiza solo las detecciones y el conteo de personas
  const updateDetections = (camera_id: string, detections: Camera["detections"]) => {
    setCameraData((prev) => {
      const existing = prev[camera_id];
      if (!existing) return prev;

      // Evita actualizar si no hay cambios
      if (JSON.stringify(existing.detections) === JSON.stringify(detections)) {
        return prev;
      }

      return {
        ...prev,
        [camera_id]: {
          ...existing,
          detections,
          person_count: detections.length,
          timestamp: new Date().toISOString(),
        },
      };
    });
  };

  return (
    <CameraContext.Provider
      value={{
        cameraList,
        updateCamera,
        updateDetections,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export const useCameraContext = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("❌ CameraContext no está disponible");
  }
  return context;
};
