// src/utils/startCameraStream.ts
import { Camera } from "../types/camera";

export const startCameraStream = async (
  camera: Camera,
  videoElement: HTMLVideoElement
) => {
  try {
    // 🧩 Si la cámara es IP (tiene stream_url)
    if (camera.stream_url) {
      const container = document.getElementById(`${camera.camera_id}-live`);

      if (!container) {
        console.error(`❌ Contenedor de ${camera.camera_id} no encontrado`);
        return;
      }

      // 📸 Creamos un <img> dinámico para mostrar el stream MJPEG
      const img = document.createElement("img");
      img.src = `${camera.stream_url}?t=${Date.now()}`; // evita caché
      img.className =
        "w-full h-[300px] object-contain rounded-xl border border-gray-700 bg-black";
      img.alt = `Transmisión de ${camera.name}`;

      img.onerror = () => {
        container.innerHTML =
          '<div class="text-red-400 text-center p-4">📴 Cámara desconectada</div>';
      };

      container.innerHTML = "";
      container.appendChild(img);

      // ♻️ Refresco automático cada 10 segundos
      setInterval(() => {
        img.src = `${camera.stream_url}?t=${Date.now()}`;
      }, 10000);

      console.log(`✅ Cámara IP (${camera.name}) transmitiendo desde ${camera.stream_url}`);
      return;
    }

    // 🎥 Si no tiene stream_url → cámara local
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    videoElement.srcObject = stream;
    await videoElement.play();
    console.log(`✅ Cámara local (${camera.name}) iniciada correctamente`);
  } catch (error) {
    console.error(`❌ Error al iniciar la cámara ${camera.name}:`, error);
  }
};
