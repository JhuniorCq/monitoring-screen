import { useEffect } from "react";
import io from "socket.io-client";
import { useCameraContext } from "../context/CameraContext";
import { type Camera } from "../types/camera";

const SOCKET_URL = "";
const socket = io(SOCKET_URL);

const useSocket = () => {
  const { updateCamera } = useCameraContext();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al socket: ", socket.id);
    });

    // Cámaras
    socket.on("camera", (camera: Camera) => {
      console.log("Actualización de cámara: ", camera);

      updateCamera(camera);
    });
  }, []);
};

export default useSocket;
