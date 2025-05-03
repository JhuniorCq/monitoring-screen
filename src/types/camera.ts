export type Camera = {
  id: string;
  frame: string;
  meta: {
    timestamp: Date;
    status: "active" | "inactive" | "error";
    motionDetected: boolean;
    detectedObjects: string[];
  };
};

export type StateCameras = {
  [id: string]: Camera;
};

export type CameraContextType = {
  cameraData: StateCameras;
  setCameraData: React.Dispatch<React.SetStateAction<StateCameras>>;
};
