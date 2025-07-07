import { Camera } from "../types/camera";
import CamOverlay from "./CamOverlay";

type NewCameraProps = {
  name: string;
  cameraId: string;
  id: string;
  cameraList: Camera[];
};

const NewCamera = ({ name, cameraId, id, cameraList }: NewCameraProps) => {
  return (
    // <section className="w-[40%] h-80 bg-black relative">
    <section className="w-full bg-black aspect-video overflow-hidden shadow-md relative rounded-lg">
      <h2 className="text-white absolute top-2 left-4 z-10">{name}</h2>
      <video
        id={id}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Buscar la cam1 en el contexto */}
      <CamOverlay
        cameraId={cameraId}
        detections={
          cameraList.find((cam) => cam.camera_id === "cam1")?.detections ?? []
        }
      />
    </section>
  );
};

export default NewCamera;
