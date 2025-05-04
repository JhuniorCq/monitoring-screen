import { StateCameras } from "../types/camera";

export const cameraDataMock: StateCameras = {
  CAM1: {
    id: "CAM1",
    frame: "https://placekitten.com/400/225",
    meta: {
      dateTime: Date.now(),
      status: "active",
      motionDetected: true,
      detectedObjects: ["person", "car"],
    },
  },
  CAM2: {
    id: "CAM2",
    frame: "https://placekitten.com/401/225",
    meta: {
      dateTime: Date.now(),
      status: "active",
      motionDetected: false,
      detectedObjects: [],
    },
  },
  CAM3: {
    id: "CAM3",
    frame: "https://placekitten.com/402/225",
    meta: {
      dateTime: Date.now(),
      status: "inactive",
      motionDetected: false,
      detectedObjects: [],
    },
  },
  CAM4: {
    id: "CAM4",
    frame: "https://placekitten.com/403/225",
    meta: {
      dateTime: Date.now(),
      status: "active",
      motionDetected: true,
      detectedObjects: ["bicycle"],
    },
  },
  CAM5: {
    id: "CAM5",
    frame: "https://placekitten.com/404/225",
    meta: {
      dateTime: Date.now(),
      status: "error",
      motionDetected: false,
      detectedObjects: [],
    },
  },
  CAM6: {
    id: "CAM6",
    frame: "https://placekitten.com/405/225",
    meta: {
      dateTime: Date.now(),
      status: "active",
      motionDetected: false,
      detectedObjects: [],
    },
  },
  CAM7: {
    id: "CAM7",
    frame: "https://placekitten.com/406/225",
    meta: {
      dateTime: Date.now(),
      status: "active",
      motionDetected: true,
      detectedObjects: ["car"],
    },
  },
  CAM8: {
    id: "CAM8",
    frame: "https://placekitten.com/407/225",
    meta: {
      dateTime: Date.now(),
      status: "inactive",
      motionDetected: false,
      detectedObjects: [],
    },
  },
  CAM9: {
    id: "CAM9",
    frame: "https://placekitten.com/408/225",
    meta: {
      dateTime: Date.now(),
      status: "active",
      motionDetected: false,
      detectedObjects: ["person"],
    },
  },
};
