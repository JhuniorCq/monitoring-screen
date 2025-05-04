import { PiVideoCameraFill } from "react-icons/pi";
import { useCameraContext } from "../context/CameraContext";

const PreventAlert = () => {
  const { cameraList } = useCameraContext();
  return (
    <section className="w-full h-1/2 px-5 pt-4 pb-6 bg-orange-300 flex flex-col">
      <div className="text-center border-b border-b-black mb-3 pb-2">
        <h2 className="font-semibold text-xl">Prevent Alerts</h2>
        <p>Alert status</p>
      </div>

      {cameraList && cameraList.length === 0 ? (
        <p className="px-4 py-6 text-center flex justify-center items-center grow">
          No hay cámaras disponibles
        </p>
      ) : (
        <ul className="flex flex-col gap-4 overflow-y-auto">
          {cameraList.map((camera) => (
            <li
              key={camera.id}
              className="flex justify-center items-center gap-4 cursor-pointer"
            >
              <PiVideoCameraFill className="text-2xl shrink-0" />
              <span className="">{camera.id}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PreventAlert;
