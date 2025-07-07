import { useEffect, useRef } from "react";
import { type Camera } from "../types/camera";

const Camera = ({ camera }: { camera: Camera }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const localVideo = document.getElementById(
      `${camera.camera_id}-video`
    ) as HTMLVideoElement | null;

    if (localVideo && videoRef.current) {
      videoRef.current.srcObject = localVideo.srcObject;
    } else {
      console.error(
        `No se encontró un stream local para camera_id=${camera.camera_id}`
      );
    }
  }, [camera.camera_id]);

  return (
    <li
      className="w-full aspect-video overflow-hidden shadow-md relative rounded-lg"
      id={camera.camera_id}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="text-center text-white bg-black/60 py-1 absolute bottom-0 w-full">
        Cámara {camera.camera_id} | Personas: {camera.person_count}
      </div>
    </li>
  );
};

export default Camera;
