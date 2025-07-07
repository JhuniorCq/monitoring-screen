// src/components/CamOverlay.tsx
import { useEffect, useRef } from "react";
import { type Camera } from "../types/camera";

type Props = {
  cameraId: string;
  detections: Camera["detections"];
};

const CamOverlay = ({ cameraId, detections }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = document.getElementById(`${cameraId}-live`) as HTMLVideoElement | null;

    if (!canvas || !video || !detections) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        requestAnimationFrame(draw);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#00FF00";
      ctx.lineWidth = 2;
      ctx.font = "16px Arial";
      ctx.fillStyle = "#00FF00";

      for (const det of detections) {
        const { x1, y1, x2, y2 } = det.box;

        const safeX1 = Math.max(0, Math.min(x1, canvas.width));
        const safeY1 = Math.max(0, Math.min(y1, canvas.height));
        const safeX2 = Math.max(0, Math.min(x2, canvas.width));
        const safeY2 = Math.max(0, Math.min(y2, canvas.height));

        ctx.beginPath();
        ctx.rect(safeX1, safeY1, safeX2 - safeX1, safeY2 - safeY1);
        ctx.stroke();

        const label = `${det.class} (${Math.round(det.confidence * 100)}%)`;
        ctx.fillText(label, safeX1 + 5, safeY1 - 5);
      }
    };

    draw();
  }, [cameraId, detections]);

  return (
    <canvas
      ref={canvasRef}
      id={`${cameraId}-canvas`}
      className="absolute top-0 left-0 w-full h-full"
    />
  );
};

export default CamOverlay;
