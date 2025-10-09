// src/components/NewCamera.tsx
import { useEffect, useRef, useState } from "react";
import useSocket from "../hooks/useSocket";
import CamOverlay from "./CamOverlay";
import { Camera } from "../types/camera";

type Props = {
  name: string;
  cameraId: string;
  streamUrl?: string;
  cameraList: Camera[];
};

const NewCamera = ({ name, cameraId, streamUrl, cameraList }: Props) => {
  const { sendFrameForAnalysis, registerCamera, socket, isConnected } = useSocket();
  const camera = cameraList.find((c) => c.camera_id === cameraId);
  const imgRef = useRef<HTMLImageElement>(null);

  // 🧠 Estado local que forza actualización del overlay
  const [detections, setDetections] = useState<any[]>([]);

  useEffect(() => {
    console.log(`📡 Registrando cámara: ${cameraId}`);
    registerCamera(cameraId);
  }, [cameraId]);

  // 🔁 Mantener sincronizado con los datos globales
  useEffect(() => {
    if (camera?.detections) {
      // 🔍 Convertimos al formato esperado por CamOverlay
      const converted = camera.detections.map((det: any) => {
        const { box, class: label, confidence } = det;
        const x = box?.x1 ?? 0;
        const y = box?.y1 ?? 0;
        const width = (box?.x2 ?? 0) - x;
        const height = (box?.y2 ?? 0) - y;
        return { x, y, width, height, label, confidence };
      });

      setDetections(converted);
      console.log(`🎯 Enviando detecciones al CamOverlay (${cameraId}):`, converted);
    }
  }, [camera?.detections, cameraId]);

  // 🎥 Captura periódica de frames
  useEffect(() => {
    if (!streamUrl) {
      console.warn(`⚠️ No hay streamUrl para ${cameraId}`);
      return;
    }

    if (!isConnected) {
      console.warn(`⏳ Esperando conexión Socket.IO antes de capturar frames (${cameraId})`);
      return;
    }

    const img = imgRef.current;
    if (!img) {
      console.error(`❌ imgRef vacío para ${cameraId}`);
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    console.log(`🎥 Iniciando captura de frames para ${cameraId} desde ${streamUrl}`);

    const captureInterval = setInterval(() => {
      if (!ctx) return;

      if (!img.complete || img.naturalWidth === 0) {
        console.warn(`⏳ Frame aún no cargado (${cameraId})`);
        return;
      }

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      try {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const frame = canvas.toDataURL("image/jpeg", 0.6).split(",")[1];

        if (frame?.length > 0) {
          console.log(`📤 Enviando frame de ${cameraId} (${frame.length} bytes)`);
          sendFrameForAnalysis(cameraId, frame);
        }
      } catch (err) {
        console.error(`💥 Error capturando frame de ${cameraId}:`, err);
      }
    }, 150);

    return () => {
      console.log(`🧹 Deteniendo captura de ${cameraId}`);
      clearInterval(captureInterval);
    };
  }, [cameraId, streamUrl, isConnected]); // 👈 añadimos isConnected aquí


  return (
    <section className="w-full bg-black aspect-video overflow-hidden shadow-md relative rounded-lg">
      <h2 className="text-white absolute top-2 left-4 z-10">{name}</h2>

      <img
        id={`${cameraId}-live`}
        ref={imgRef}
        crossOrigin="anonymous"
        src={streamUrl}
        alt={`Stream de ${name}`}
        className="w-full h-full object-cover"
        onLoad={() => console.log(`✅ Stream cargado para ${cameraId}`)}
        onError={(e) => {
          console.error(`🚫 Error al cargar stream de ${cameraId}`);
          const img = e.target as HTMLImageElement;
          img.style.display = "none";
          const parent = img.parentElement;
          if (parent) {
            const errorMsg = document.createElement("div");
            errorMsg.textContent = "Cámara no disponible";
            errorMsg.className =
              "absolute inset-0 flex items-center justify-center text-white bg-black/60";
            parent.appendChild(errorMsg);
          }
        }}
      />

      {/* 🧠 Overlay recibe detecciones convertidas */}
      <CamOverlay cameraId={cameraId} detections={detections} />
    </section>
  );
};

export default NewCamera;

