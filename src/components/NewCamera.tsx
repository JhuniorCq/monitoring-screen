// src/components/NewCamera.tsx
import { useEffect } from "react";
import useSocket from "../hooks/useSocket";
import CamOverlay from "./CamOverlay";
import { Camera } from "../types/camera";

type Props = {
  name: string;
  cameraId: string;
  streamUrl?: string;
  cameraList: Camera[];
};

const NewCamera = ({ name, cameraId, streamUrl, cameraList }: Props) => {
  const { sendFrameForAnalysis, registerCamera } = useSocket();
  const camera = cameraList.find((c) => c.camera_id === cameraId);

  useEffect(() => {
    registerCamera(cameraId);
  }, [cameraId]);

  useEffect(() => {
    if (!streamUrl) return;

    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.src = `${streamUrl}?t=${Date.now()}`;

    const captureInterval = setInterval(() => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const frame = canvas.toDataURL("image/jpeg").split(",")[1];
      sendFrameForAnalysis(cameraId, frame);
    }, 500);

    return () => clearInterval(captureInterval);
  }, [cameraId, streamUrl]);

  return (
    <section className="w-full bg-black aspect-video overflow-hidden shadow-md relative rounded-lg">
      <h2 className="text-white absolute top-2 left-4 z-10">{name}</h2>
      <img
        src={streamUrl}
        alt={`Stream de ${name}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.style.display = "none";
          const parent = img.parentElement;
          if (parent) {
            const errorMsg = document.createElement("div");
            errorMsg.textContent = "Cámara no disponible";
            errorMsg.className =
              "absolute inset-0 flex items-center justify-center text-white bg-black/60";
            parent.appendChild(errorMsg);
          }
        }}
      />
      <CamOverlay cameraId={cameraId} detections={camera?.detections ?? []} />
    </section>
  );
};

export default NewCamera;
