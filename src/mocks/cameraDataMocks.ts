export const cameraDataMock = [
  {
    id: "CAM1",
    frame: "https://placekitten.com/400/225",
    meta: {
      timestamp: Date.now(),
      status: "active",
      motionDetected: true,
      detectedObjects: ["person", "car"],
    },
  },
  {
    id: "CAM2",
    frame: "https://placekitten.com/401/225",
    meta: {
      timestamp: Date.now(),
      status: "active",
      motionDetected: false,
      detectedObjects: [],
    },
  },
  {
    id: "CAM3",
    frame: "https://placekitten.com/402/225",
    meta: {
      timestamp: Date.now(),
      status: "inactive",
      motionDetected: false,
      detectedObjects: [],
    },
  },
  {
    id: "CAM4",
    frame: "https://placekitten.com/403/225",
    meta: {
      timestamp: Date.now(),
      status: "active",
      motionDetected: true,
      detectedObjects: ["bicycle"],
    },
  },
  {
    id: "CAM5",
    frame: "https://placekitten.com/404/225",
    meta: {
      timestamp: Date.now(),
      status: "error",
      motionDetected: false,
      detectedObjects: [],
    },
  },
  {
    id: "CAM6",
    frame: "https://placekitten.com/405/225",
    meta: {
      timestamp: Date.now(),
      status: "active",
      motionDetected: false,
      detectedObjects: [],
    },
  },
  {
    id: "CAM7",
    frame: "https://placekitten.com/406/225",
    meta: {
      timestamp: Date.now(),
      status: "active",
      motionDetected: true,
      detectedObjects: ["car"],
    },
  },
  {
    id: "CAM8",
    frame: "https://placekitten.com/407/225",
    meta: {
      timestamp: Date.now(),
      status: "inactive",
      motionDetected: false,
      detectedObjects: [],
    },
  },
  {
    id: "CAM9",
    frame: "https://placekitten.com/408/225",
    meta: {
      timestamp: Date.now(),
      status: "active",
      motionDetected: false,
      detectedObjects: ["person"],
    },
  },
];
