export type Camera = {
  id: string;
  frame: string;
  meta: {
    dateTime: number;
    status: "active" | "inactive" | "error";
    motionDetected: boolean;
    detectedObjects: string[];
  };
};

export type StateCameras = {
  [id: string]: Camera;
};

export type CameraContextType = {
  cameraList: Camera[];
  updateCamera: (camera: Camera) => void;
};
