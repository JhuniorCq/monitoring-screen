// src/components/CameraList.tsx
import { useEffect, useState, useRef } from "react";
import { startCameraStream } from "../utils/startCameraStream";

interface Camera {
  camera_id: string;
  name: string;
  streamUrl: string;
}

const CameraList = () => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    // Cargar cámaras al montar el componente
    fetch("http://localhost:8081/cameras")
      .then((res) => res.json())
      .then(setCameras)
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Iniciar stream de cada cámara cuando ya están cargadas
    cameras.forEach((cam) => {
      const video = videoRefs.current[cam.camera_id];
      if (video) startCameraStream(cam.camera_id, video);
    });
  }, [cameras]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {cameras.map((cam) => (
        <div
          key={cam.camera_id}
          className="bg-gray-900 p-3 rounded-xl shadow-md text-center"
        >
          <h2 className="text-white text-lg mb-2">{cam.name}</h2>
          <video
            ref={(el) => (videoRefs.current[cam.camera_id] = el)}
            autoPlay
            muted
            playsInline
            controls
            className="w-full rounded-lg border border-gray-700"
          />
        </div>
      ))}
    </div>
  );
};

export default CameraList;
