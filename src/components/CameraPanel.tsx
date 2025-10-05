// src/components/CameraPanel.tsx
import { type Camera as CameraType } from "../types/camera";
import NewCamera from "./NewCamera";

const CameraPanel = ({
  camerasToDisplay,
}: {
  camerasToDisplay: CameraType[];
}) => {
  return (
    <section className="h-[calc(100vh-80px)] flex-1 p-4 overflow-y-auto bg-bg-dark border-l border-r">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cámara local */}
        <NewCamera
          cameraList={camerasToDisplay}
          id="cam1-live"
          cameraId="cam1"
          name="Cámara local (cam1)"
        />

        {/* Cámara IP */}
        <NewCamera
          cameraList={camerasToDisplay}
          id="cam2-live"
          cameraId="cam2"
          name="Cámara IP (cam2)"
        />

        <NewCamera
          cameraList={camerasToDisplay}
          id="cam3-live"
          cameraId="cam3"
          name="Cámara RTSP Convertida (cam3)"
          streamUrl="http://localhost:9000/stream"
        />



      </ul>
    </section>
  );
};

export default CameraPanel;
