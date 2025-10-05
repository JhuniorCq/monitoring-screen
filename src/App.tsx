import { useEffect, useState } from "react";
import ActivitiesSection from "./components/ActivitiesSection";
import AlertsSection from "./components/AlertsSection";
import CameraPanel from "./components/CameraPanel";
import CameraSection from "./components/CameraSection";
import Header from "./components/Header";
import PreventAlertSection from "./components/PreventAlertSection";
import { useCameraContext } from "./context/CameraContext";
import { type Camera } from "./types/camera";
import { MAX_NUMBER_CAMERAS } from "./utils/constants";
import useSocket from "./hooks/useSocket";
import CameraStarter from "./components/CameraStarter";

const App = () => {
  // 🔌 Inicializa conexión con el backend vía Socket.IO
  useSocket();

  const { cameraList } = useCameraContext();
  const [camerasToDisplay, setCamerasToDisplay] = useState<Camera[]>([]);

  /**
   * Actualiza la lista de cámaras a mostrar
   * - Evita duplicados
   * - Reemplaza cámaras no activas
   * - Si todas están activas, reemplaza la de menor "person_count"
   */
  const updateCamerasToDisplay = (camera: Camera) => {
    setCamerasToDisplay((prev) => {
      const exists = prev.some((c) => c.camera_id === camera.camera_id);
      if (exists) return prev;

      const nonActiveIndex = prev.findIndex((c) => c.status !== "active");
      if (nonActiveIndex !== -1) {
        const updated = [...prev];
        updated[nonActiveIndex] = camera;
        return updated;
      }

      if (prev.length > 0) {
        let minIndex = 0;
        let minCount = prev[0]?.person_count ?? Infinity;
        for (let i = 1; i < prev.length; i++) {
          if ((prev[i].person_count ?? Infinity) < minCount) {
            minCount = prev[i].person_count ?? Infinity;
            minIndex = i;
          }
        }
        const updated = [...prev];
        updated[minIndex] = camera;
        return updated;
      }

      return [...prev, camera];
    });
  };

  // 🔄 Carga inicial de cámaras
  useEffect(() => {
    const cameras = cameraList.filter((_, i) => i + 1 <= MAX_NUMBER_CAMERAS);
    setCamerasToDisplay(cameras);
  }, [cameraList]);

  return (
    <section className="w-full h-screen flex flex-col overflow-hidden">
      {/* Inicializa cámaras locales/IP */}
      <CameraStarter />

      <Header />

      <div className="flex overflow-hidden">
        <div className="w-[10%] bg-yellow-300 h-[calc(100vh-80px)]">
          <CameraSection updateCamerasToDisplay={updateCamerasToDisplay} />
          <PreventAlertSection />
        </div>

        {/* 📷 Panel principal de cámaras */}
        <CameraPanel camerasToDisplay={camerasToDisplay} />

        <div className="w-[16%] bg-green-300 h-[calc(100vh-80px)]">
          <AlertsSection />
          <ActivitiesSection />
        </div>
      </div>
    </section>
  );
};

export default App;
