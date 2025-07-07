// src/components/CamOverlay.tsx
import { useEffect } from "react";
import { Camera } from "../types/camera";

type CamOverlayProps = {
  cameraId: string;
  detections: Camera["detections"];
};

const CamOverlay = ({ cameraId, detections }: CamOverlayProps) => {
  const videoId = `${cameraId}-live`;
  const canvasId = `${cameraId}-canvas`;

  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    const video = document.getElementById(videoId) as HTMLVideoElement | null;

    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawDetections = () => {
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        requestAnimationFrame(drawDetections);
        return;
      }

      // Ajustar tamaño del canvas al video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Limpiar canvas en cada frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!detections || detections.length === 0) return;

      ctx.strokeStyle = "#00FF00";
      ctx.lineWidth = 2;
      ctx.font = "16px Arial";
      ctx.fillStyle = "#00FF00";

      for (const det of detections) {
        const { x1, y1, x2, y2 } = det.box;
        ctx.beginPath();
        ctx.rect(x1, y1, x2 - x1, y2 - y1);
        ctx.stroke();
        const label = `${det.class} (${Math.round(det.confidence * 100)}%)`;
        ctx.fillText(label, x1 + 4, y1 - 4);
      }
    };

    // Dibujar al cargar y en cada cambio
    drawDetections();
  }, [cameraId, detections]); // ← importante: dependencias para actualizar

  return (
    <canvas
      id={canvasId}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default CamOverlay;
