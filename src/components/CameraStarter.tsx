import { useEffect, useRef } from "react";
import { startCameraStream } from "../utils/startCameraStream";

const CameraStarter = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef1.current) {
      startCameraStream("cam1", videoRef1.current).then(() => {
        const liveVideo = document.getElementById(
          "cam1-live"
        ) as HTMLVideoElement | null;
  
        if (liveVideo && videoRef1.current) {
          liveVideo.srcObject = videoRef1.current.srcObject;
        }
      });
    }
  
    if (videoRef2.current) {
      startCameraStream("cam2", videoRef2.current);
    }
  }, []);
  

  return (
    <>
      <video
        id="cam1-video"
        ref={videoRef1}
        autoPlay
        muted
        playsInline
        className="hidden" // visible en el panel, no aquí
      />
      <video
        id="cam2-video"
        ref={videoRef2}
        autoPlay
        muted
        playsInline
        className="hidden"
      />
    </>
  );
};

export default CameraStarter;
