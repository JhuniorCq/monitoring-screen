// src/hooks/useSocket.ts
import { useEffect } from "react";
import io from "socket.io-client";
import { useCameraContext } from "../context/CameraContext";
import { useAlertContext } from "../context/AlertContext";
import { type Camera } from "../types/camera";
import { type Alert } from "../types/alert";
import { SOCKET_URL } from "../utils/constants";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  path: "/socket.io", // Asegúrate que coincida con backend
});

const useSocket = () => {
  const { updateCamera } = useCameraContext();
  const { addAlert } = useAlertContext();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🔌 Conectado a Socket.IO");
    });

    socket.on("disconnect", () => {
      console.log("❌ Desconectado de Socket.IO");
    });

    // Cámaras
    socket.on("cameras", (cameraArray: Camera[]) => {
      cameraArray.forEach((cam) => updateCamera(cam));
    });

    // Alertas
    socket.on("alerts", (alert: Alert[]) => {
      if (alert && alert.length > 0) addAlert(alert[0]);
    });

    return () => {
      socket.off("cameras");
      socket.off("alerts");
    };
  }, []);
};

export default useSocket;
