// src/context/CameraContext.tsx
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import {
  Camera,
  type CameraContextType,
  type StateCameras,
} from "../types/camera";

const CameraContext = createContext<CameraContextType | null>(null);

export const CameraProvider = ({ children }: { children: ReactNode }) => {
  const [cameraData, setCameraData] = useState<StateCameras>({});

  const cameraList = useMemo(() => Object.values(cameraData), [cameraData]);

  const updateCamera = (camera: Camera) => {
    setCameraData((prev) => {
      const existing = prev[camera.camera_id];

      // Solo evita actualizar si los datos son exactamente iguales
      if (
        existing &&
        JSON.stringify(existing.detections) === JSON.stringify(camera.detections) &&
        existing.person_count === camera.person_count
      ) {
        return prev; // no actualiza si no hay cambios
      }

      return { ...prev, [camera.camera_id]: camera };
    });
  };

  return (
    <CameraContext.Provider value={{ cameraList, updateCamera }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCameraContext = () => {
  const context = useContext(CameraContext);

  if (!context) {
    throw new Error("CameraContext no está disponible");
  }

  return context;
};
