// src/components/CameraStarter.tsx
import { useEffect, useRef } from "react";
import { startCameraStream } from "../utils/startCameraStream";

const CameraStarter = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null); // local
  const videoRef2 = useRef<HTMLVideoElement>(null); // IP

  useEffect(() => {
    if (videoRef1.current) {
      startCameraStream("cam1", videoRef1.current).then(() => {
        const liveVideo = document.getElementById(
          "cam1-live"
        ) as HTMLVideoElement | null;

        if (liveVideo && videoRef1.current) {
          liveVideo.srcObject = videoRef1.current.srcObject;
        }
      });
    }

    if (videoRef2.current) {
      startCameraStream("cam2", videoRef2.current).then(() => {
        // 🚫 No intentes asignar manualmente el src
        // La cámara IP se renderiza sola dentro del contenedor cam2-live
        console.log("🎥 Cámara IP inicializada (render gestionado por startCameraStream)");
      });
    }

  }, []);

  return (
    <>
      {/* Cámara local */}
      <video
        id="cam1-video"
        ref={videoRef1}
        autoPlay
        muted
        playsInline
        className="hidden"
      />
      {/* Cámara IP */}
      <video
        id="cam2-video"
        ref={videoRef2}
        autoPlay
        muted
        playsInline
        className="hidden"
      />
    </>
  );
};

export default CameraStarter;
