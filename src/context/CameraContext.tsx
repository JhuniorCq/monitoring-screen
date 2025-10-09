// src/context/CameraContext.tsx
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

  // Convierte el objeto a lista
  const cameraList = useMemo(() => Object.values(cameraData), [cameraData]);

  // 🧩 Actualiza toda la cámara
  const updateCamera = (camera: Camera) => {
    console.log(`📸 Actualizando cámara completa [${camera.camera_id}]`);
    setCameraData((prev) => {
      const updated = {
        ...prev,
        [camera.camera_id]: camera,
      };
      console.log("📸 Nuevo estado cameraData:", updated);
      return updated;
    });
  };

  // 🎯 Actualiza solo las detecciones y el conteo de personas
  const updateDetections = (
    camera_id: string,
    detections: Camera["detections"]
  ) => {
    console.log(`🧠 Actualizando detecciones de [${camera_id}] con ${detections.length} objetos`);

    setCameraData((prev) => {
      const existing = prev[camera_id];

      // ⚡ Si la cámara no existe aún, la creamos por defecto
      if (!existing) {
        console.warn(`⚠️ No se encontró la cámara ${camera_id} en el estado. Creando entrada inicial...`);
        const newCamera: Camera = {
          camera_id,
          name: camera_id,
          detections: [...detections],
          person_count: detections.length,
          timestamp: new Date().toISOString(),
        };
        return { ...prev, [camera_id]: newCamera };
      }

      // ✅ Si existe, solo actualizamos detecciones
      const updated = {
        ...prev,
        [camera_id]: {
          ...existing,
          detections: [...detections],
          person_count: detections.length,
          timestamp: new Date().toISOString(),
        },
      };

      console.log(`✅ Cámara [${camera_id}] actualizada`);
      console.log("📦 Estado actualizado:", updated[camera_id]);
      return updated;
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
