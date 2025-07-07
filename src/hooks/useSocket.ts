import { useEffect } from "react";
import io from "socket.io-client";
import { useCameraContext } from "../context/CameraContext";
import { useAlertContext } from "../context/AlertContext";
import { type Camera } from "../types/camera";
import { type Alert } from "../types/alert";
import { SOCKET_URL } from "../utils/constants";

const socket = io(SOCKET_URL, {
  transports: ["websocket"], // Forzar WebSocket
});

const useSocket = () => {
  const { updateCamera } = useCameraContext();
  const { addAlert } = useAlertContext();

  useEffect(() => {
    // Cámaras
    socket.on("cameras", (cameraArray: Camera[]) => {
      const camera = cameraArray[0];
      updateCamera(camera);

      if (camera.camera_id === "cam1") {
        drawDetectionsOnCanvas(camera.detections);
      }
    });

    // Alertas
    socket.on("alerts", (alert: Alert[]) => {
      addAlert(alert[0]);
    });

    return () => {
      socket.off("cameras");
      socket.off("alerts");
    };
  }, []);
};

export default useSocket;

// Función para dibujar bounding boxes y etiquetas
const drawDetectionsOnCanvas = (
  detections: Camera["detections"]
) => {
  const canvas = document.getElementById("cam1-canvas") as HTMLCanvasElement | null;
  const video = document.getElementById("cam1-live") as HTMLVideoElement | null;

  if (!canvas || !video || !detections || detections.length === 0) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Esperar a que el video tenga dimensiones
  if (video.videoWidth === 0 || video.videoHeight === 0) {
    requestAnimationFrame(() => drawDetectionsOnCanvas(detections)); // volver a intentar luego
    return;
  }

  // Ajustar tamaño del canvas
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#00FF00";
  ctx.lineWidth = 2;
  ctx.font = "16px Arial";
  ctx.fillStyle = "#00FF00";

  for (const det of detections) {
    const { x1, y1, x2, y2 } = det.box;

    // Asegurarse de que los valores estén dentro del rango visible
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

