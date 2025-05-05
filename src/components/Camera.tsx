import { type Camera } from "../types/camera";

const Camera = ({ camera }: { camera: Camera }) => {
  return (
    <li
      className="w-full aspect-video overflow-hidden shadow-md relative rounded-lg"
      id={camera.camera_id}
    >
      <img
        src="https://msi.gob.pe/portal/wp-content/uploads/2023/05/240-policias-de-tr%C3%A1nsito-en-el-distrito-3.jpeg"
        alt="Cámara"
        className="w-full h-full object-cover"
      />
      {/* <div className="text-center text-white bg-black/60 py-1 absolute bottom-0 w-full">
        Camera {camera.id}
      </div> */}
    </li>
  );
};

export default Camera;
