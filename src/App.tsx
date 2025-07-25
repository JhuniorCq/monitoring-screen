import { useEffect, useState } from "react";
import ActivitiesSection from "./components/ActivitiesSection";
import AlertsSection from "./components/AlertsSection";
import CameraPanel from "./components/CameraPanel";
import CameraSection from "./components/CameraSection";
import Header from "./components/Header";
import PreventAlertSection from "./components/PreventAlertSection";
// import CamOverlay from "./components/CamOverlay";
import { useCameraContext } from "./context/CameraContext";
import { type Camera } from "./types/camera";
import { MAX_NUMBER_CAMERAS } from "./utils/constants";
import useSocket from "./hooks/useSocket";
import CameraStarter from "./components/CameraStarter";
// import NewCamera from "./components/NewCamera";

const App = () => {
  useSocket();

  const { cameraList } = useCameraContext();

  const [/*camerasToDisplay*/ _, setCamerasToDisplay] = useState<Camera[]>([]);

  const updateCamerasToDisplay = (camera: Camera) => {
    setCamerasToDisplay((prev) => {
      // Verificar si la cámara ya se está mostrando
      const exists = prev.some((c) => c.camera_id === camera.camera_id);
      if (exists) return prev;

      // Buscar la primera cámara que no esté activa
      const nonActiveIndex = prev.findIndex((c) => c.status !== "active");

      if (nonActiveIndex !== -1) {
        // Si se encuentra una cámara no activa o con error, se reemplaza
        const updated = [...prev];
        updated[nonActiveIndex] = camera;
        return updated;
      }

      // Si todas están activas, buscar la de menor person_count
      let minIndex = 0;
      let minCount = prev[0]?.person_count ?? Infinity;

      for (let i = 1; i < prev.length; i++) {
        if (prev[i].person_count < minCount) {
          minCount = prev[i].person_count;
          minIndex = i;
        }
      }

      // Reemplazar la cámara con menor person_count
      const updated = [...prev];
      updated[minIndex] = camera;
      return updated;
    });
  };

  useEffect(() => {
    const cameras = cameraList.filter((_, i) => i + 1 <= MAX_NUMBER_CAMERAS);
    setCamerasToDisplay(cameras);
  }, [cameraList]);

  return (
    <section className="w-full h-screen flex flex-col overflow-hidden">
      {/* <section className="w-1/2 h-[30rem] bg-black relative">
        <h2 className="text-white absolute top-2 left-4 z-10">
          Cámara local directa (cam1)
        </h2>
        <video
          id="cam1-live"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <CamOverlay
          cameraId="cam1"
          detections={
            cameraList.find((cam) => cam.camera_id === "cam1")?.detections ?? []
          }
        />
      </section> */}
      {/* NewCamera envuelve a lo de arriba */}
      {/* <NewCamera
        cameraList={cameraList}
        id="cam1-live"
        cameraId="cam1"
        name="Cámara local directa (cam1)"
      /> */}
      <CameraStarter /> {/* esto activa las cámaras */}
      <Header />
      <div className="flex overflow-hidden">
        <div className="w-[10%] bg-yellow-300 h-[calc(100vh-80px)]">
          <CameraSection updateCamerasToDisplay={updateCamerasToDisplay} />
          <PreventAlertSection />
        </div>
        {/* Antes se pasaba a camerasToDisplay */}
        <CameraPanel camerasToDisplay={cameraList} />
        <div className="w-[16%] bg-green-300 h-[calc(100vh-80px)]">
          <AlertsSection />
          <ActivitiesSection />
        </div>
      </div>
    </section>
  );
};

export default App;
