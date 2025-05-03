import { createContext, ReactNode, useContext, useState } from "react";
import { CameraContextType, StateCameras } from "../types/camera";
// import { cameraDataMock } from "../mocks/cameraDataMocks"

const CameraContext = createContext<CameraContextType | null>(null);

export const CameraProvider = ({ children }: { children: ReactNode }) => {
  // El estado será un objeto de objetos
  const [cameraData, setCameraData] = useState<StateCameras>({});

  return (
    <CameraContext.Provider value={{ cameraData, setCameraData }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCameraContext = () => useContext(CameraContext);
