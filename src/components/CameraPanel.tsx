// src/components/CameraPanel.tsx
import { type Camera as CameraType } from "../types/camera";
import NewCamera from "./NewCamera";

type Props = {
  camerasToDisplay: CameraType[];
};

const CameraPanel = ({ camerasToDisplay }: Props) => {
  return (
    <section className="h-[calc(100vh-80px)] flex-1 p-4 overflow-y-auto bg-bg-dark border-l border-r">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cámara local */}
        <NewCamera
          cameraList={camerasToDisplay}
          cameraId="cam1"
          name="Cámara (cam1)"
          //streamUrl="http://localhost:9000/stream1"
          location="Entrada principal"
        />

        {/* Cámara IP */}
        <NewCamera
          cameraList={camerasToDisplay}
          cameraId="cam2"
          name="Cámara (cam2)"
          streamUrl="http://localhost:9000/stream2"
          location="Pasillo"
        />

        {/* Cámara adicional */}
        <NewCamera
          cameraList={camerasToDisplay}
          cameraId="cam3"
          name="Cámara (cam3)"
          // streamUrl="http://localhost:9000/stream3"
          location="Patio"
        />
      </ul>
    </section>
  );
};

export default CameraPanel;