import { useCameraContext } from "../context/CameraContext";
import Camera from "./Camera";

const CameraPanel = () => {
  const { cameraList } = useCameraContext();

  return (
    <section className="flex-1 p-4 overflow-y-auto bg-bg-dark border-l border-r">
      {cameraList && cameraList.length === 0 ? (
        <p>No hay cámaras disponibles</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cameraList.map((camera, i) => {
            if (camera.status !== "active")
              return (
                <p className="flex justify-center items-center bg-bg-light text-text-secondary rounded-lg">
                  "Cámara desconectada"
                </p>
              );

            return <Camera key={i} camera={camera} />;
          })}
        </ul>
      )}
    </section>
  );
};

export default CameraPanel;
