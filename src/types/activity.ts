export type Activity = {
  cameraId: string;
  peopleCount: number;
};

export type StateActivityLog = {
  [cameraId: string]: Activity;
};

export type ActivityContextType = {
  // activityLog: StateActivityLog;
  activityList: Activity[];
  updateActivity: (activity: Activity) => void;
};
