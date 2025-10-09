// src/hooks/useSocket.ts
// src/hooks/useSocket.ts
import { useEffect } from "react";
import { useSocket as useSocketContext } from "../context/SocketContext";
import { useCameraContext } from "../context/CameraContext";
import { useAlertContext } from "../context/AlertContext";
import { type Camera } from "../types/camera";
import { type Alert } from "../types/alert";

const useSocket = () => {
  const { socket, isConnected , registerOnReconnect} = useSocketContext();
  const { updateCamera, updateDetections } = useCameraContext();
  const { addAlert } = useAlertContext();


  useEffect(() => {
    if (!socket) return;

    console.log("🧠 Configurando listeners del socket compartido...");

    // === 📸 Actualización de cámaras ===
    const handleCameras = (cameraArray: Camera[]) => {
      cameraArray?.forEach((cam) => updateCamera(cam));
    };

    // === 🚨 Alertas ===
    const handleAlerts = (alerts: Alert[]) => {
      if (alerts?.length > 0) addAlert(alerts[0]);
    };

    // === 🧠 Detecciones desde backend ===
    const handleDetections = (data: {
      camera_id: string;
      detections: Camera["detections"];
    }) => {
      if (!data?.camera_id) return;
      console.log("📦 Detecciones recibidas:", data);
      updateDetections(data.camera_id, data.detections || []);
    };

    // === 🧍‍♂️ Caídas detectadas ===
    const handleFallDetected = (data: any) => {
      console.log("🚨 Caída detectada:", data);
      addAlert({
        id: Date.now().toString(),
        type: "fall",
        message: `Caída detectada en ${data.camera_id}`,
        timestamp: new Date().toISOString(),
      });
    };

    // === Registrar listeners ===
    socket.on("cameras", handleCameras);
    socket.on("alerts", handleAlerts);
    socket.on("detections", handleDetections);
    socket.on("fall_detected", handleFallDetected);

    // === Limpieza ===
    return () => {
      console.log("🧹 Eliminando listeners del socket...");
      socket.off("cameras", handleCameras);
      socket.off("alerts", handleAlerts);
      socket.off("detections", handleDetections);
      socket.off("fall_detected", handleFallDetected);
    };
  }, [socket, updateCamera, updateDetections, addAlert]);

  // ================================
  // 📤 Envío de datos al backend
  // ================================
  const sendFrameForAnalysis = (cameraId: string, frame: string) => {
    if (!socket || !isConnected) {
      console.warn(`⚠️ No se puede enviar frame: socket no conectado (${cameraId})`);
      return;
    }

    console.log(`📤 [FRONT] Enviando frame al backend desde ${cameraId} (${frame.length} bytes)`);
    socket.emit("analyze_frame", { camera_id: cameraId, frame });
  };


  const registerCamera = (cameraId: string) => {
    if (!socket || !isConnected) {
      console.warn("⚠️ No se puede registrar cámara: socket no conectado");
      // 👇 Esto asegura que la cámara se registre automáticamente tras reconexión
      registerOnReconnect(cameraId);
      return;
    }
    console.log(`📡 Registrando cámara en backend: ${cameraId}`);
    socket.emit("register_camera", { camera_id: cameraId });
    registerOnReconnect(cameraId); // 👈 también la agregamos para próximas reconexiones
  };


  return { socket, isConnected, sendFrameForAnalysis, registerCamera };
};

export default useSocket;

