import { useEffect } from "react";
import { Camera } from "../types/camera";

type CamOverlayProps = {
  cameraId: string;
  detections?: Camera["detections"];
};

const CamOverlay = ({ cameraId, detections = [] }: CamOverlayProps) => {
  const videoId = `${cameraId}-live`;
  const canvasId = `${cameraId}-canvas`;

  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    const img = document.getElementById(videoId) as HTMLImageElement | null;

    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      if (width === 0 || height === 0) return;

      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);

      // Dibujar detecciones
      detections.forEach((det) => {
        const { x1, y1, x2, y2 } = det.box;
        const label = `${det.class} (${Math.round(det.confidence * 100)}%)`;

        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 2;
        ctx.font = "16px Arial";
        ctx.fillStyle = "#00FF00";

        ctx.beginPath();
        ctx.rect(x1, y1, x2 - x1, y2 - y1);
        ctx.stroke();
        ctx.fillText(label, x1 + 4, y1 - 6);
      });
    };

    draw();
  }, [cameraId, detections]);

  return (
    <canvas
      id={canvasId}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
    />
  );
};

export default CamOverlay;
