// File: src/components/NewCamera.tsx
import { Camera } from "../types/camera";
import CamOverlay from "./CamOverlay";

type NewCameraProps = {
  name: string;
  cameraId: string;
  id: string;
  cameraList: Camera[];
};

const NewCamera = ({ name, cameraId, id, cameraList }: NewCameraProps) => {
  // 🔁 Buscar la cámara correspondiente en el listado que viene del contexto/backend
  const camera = cameraList.find((cam) => cam.camera_id === cameraId);

  return (
    <section className="w-full bg-black aspect-video overflow-hidden shadow-md relative rounded-lg">
      <h2 className="text-white absolute top-2 left-4 z-10">{name}</h2>
      <video
        id={`${cameraId}-live`}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <CamOverlay
        cameraId={cameraId}
        detections={camera?.detections ?? []}
      />
    </section>
  );
};

export default NewCamera;
