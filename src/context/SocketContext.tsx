import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Usa el mismo puerto del backend
// const SOCKET_URL = "http://localhost:8000";
const SOCKET_URL = "http://35.237.3.246:8000";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  registerOnReconnect: (cameraId: string) => void; // 👈 nuevo
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  registerOnReconnect: () => {},
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [pendingCameras, setPendingCameras] = useState<string[]>([]); // 👈 cámaras a re-registrar

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      path: "/socket.io/",
      reconnection: true, // 👈 habilita reconexión automática
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    // ✅ Conectado
    newSocket.on("connect", () => {
      console.log("✅ Conectado al backend vía Socket.IO");
      console.log("✅ [SOCKET CONTEXT] Conectado al backend vía Socket.IO", newSocket.id);
      setIsConnected(true);

      // 🔁 Re-registrar cámaras previas
      if (pendingCameras.length > 0) {
        console.log(`📦 Re-registrando ${pendingCameras.length} cámaras tras reconexión...`);
        pendingCameras.forEach((cameraId) => {
          console.log(`📡 Re-registrando cámara: ${cameraId}`);
          newSocket.emit("register_camera", { camera_id: cameraId });
        });
      }
    });

    // ❌ Desconectado
    newSocket.on("disconnect", () => {
      console.warn("❌ Desconectado del backend Socket.IO");
      setIsConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [pendingCameras]);

  // 🧠 Método para registrar cámaras automáticamente en reconexiones
  const registerOnReconnect = (cameraId: string) => {
    setPendingCameras((prev) => {
      if (prev.includes(cameraId)) return prev; // evitar duplicados
      console.log(`📝 Cámara ${cameraId} agregada a lista de reconexión`);
      return [...prev, cameraId];
    });
  };

  return (
    <SocketContext.Provider value={{ socket, isConnected, registerOnReconnect }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
