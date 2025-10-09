// src/components/CamOverlay.tsx
import { useEffect, useRef } from "react";
import { Detection } from "../types/detection";

type Props = {
  cameraId: string;
  detections: Detection[];
};

const CamOverlay = ({ cameraId, detections }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 📏 Ajustar tamaño del canvas al contenedor
  useEffect(() => {
    const videoContainer = document.getElementById(`${cameraId}-live`);
    const canvas = canvasRef.current;
    if (videoContainer && canvas) {
      const resize = () => {
        canvas.width = videoContainer.clientWidth;
        canvas.height = videoContainer.clientHeight;
      };
      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
  }, [cameraId]);

  // 🖍️ Dibujar detecciones
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (detections.length > 0) {
      console.log(`🎯 Dibujando ${detections.length} detecciones en ${cameraId}`);
    }

    detections.forEach((det, idx) => {
      const { x, y, width, height, label, confidence } = det;
      const color = `hsl(${(label.charCodeAt(0) * 37) % 360}, 90%, 55%)`;

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      ctx.fillStyle = color;
      ctx.font = "14px Arial";
      ctx.fillText(`${label} ${(confidence * 100).toFixed(1)}%`, x + 4, y - 6);

      console.log(
        `📦 [${cameraId}] Box #${idx + 1}: ${label} (${(confidence * 100).toFixed(1)}%)`,
        { x, y, width, height }
      );
    });
  }, [detections, cameraId]);

  return (
    <canvas
      ref={canvasRef}
      id={`${cameraId}-overlay`}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
    />
  );
};

export default CamOverlay;
