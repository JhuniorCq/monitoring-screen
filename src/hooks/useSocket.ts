import { useEffect } from "react";
import io from "socket.io-client";
import { useCameraContext } from "../context/CameraContext";
import { useAlertContext } from "../context/AlertContext";
import { type Camera } from "../types/camera";
import { type Alert } from "../types/alert";
import { SOCKET_URL } from "../utils/constants";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  path: "/socket.io/", // importante: debe coincidir con backend
});

const useSocket = () => {
  const { updateCamera, updateDetections } = useCameraContext();
  const { addAlert } = useAlertContext();

  useEffect(() => {
    socket.on("connect", () => console.log("🟢 Conectado a Socket.IO"));
    socket.on("disconnect", () => console.log("🔴 Desconectado de Socket.IO"));

    socket.on("cameras", (cameraArray: Camera[]) => {
      cameraArray.forEach((cam) => updateCamera(cam));
    });

    socket.on("alerts", (alert: Alert[]) => {
      if (alert && alert.length > 0) addAlert(alert[0]);
    });

    socket.on("detections", (data: { camera_id: string; detections: Camera["detections"] }) => {
      console.log("📦 Detecciones recibidas:", data);
      updateDetections(data.camera_id, data.detections);
    });

    socket.on("fall_detected", (data) => {
      console.log("🚨 Caída detectada:", data);
      addAlert({
        id: Date.now().toString(),
        type: "fall",
        message: `Caída detectada en ${data.camera_id}`,
        timestamp: new Date().toISOString(),
      });
    });

    return () => {
      socket.off("cameras");
      socket.off("alerts");
      socket.off("detections");
      socket.off("fall_detected");
    };
  }, [updateCamera, updateDetections, addAlert]);

  const sendFrameForAnalysis = (cameraId: string, frame: string) => {
    socket.emit("analyze_frame", { camera_id: cameraId, frame });
  };

  const registerCamera = (cameraId: string) => {
    socket.emit("register_camera", { camera_id: cameraId });
  };

  return { socket, sendFrameForAnalysis, registerCamera };
};

export default useSocket;
