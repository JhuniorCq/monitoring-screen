import { type Alert } from "../types/alert";

export const alertDataMock: Alert[] = [
  {
    id: "ALERT1",
    cameraId: "CAM1",
    description: "Movimiento sospechoso detectado en zona peatonal.",
    dateTime: Date.now() - 60000, // hace 1 minuto
    status: "pending",
  },
  {
    id: "ALERT2",
    cameraId: "CAM3",
    description: "Vehículo detenido en zona de cruce.",
    dateTime: Date.now() - 300000, // hace 5 minutos
    status: "confirmed",
  },
  {
    id: "ALERT3",
    cameraId: "CAM5",
    description: "Persona cruzando fuera del paso peatonal.",
    dateTime: Date.now() - 10000, // hace 10 segundos
    status: "pending",
  },
  {
    id: "ALERT4",
    cameraId: "CAM6",
    description: "Objeto no identificado detectado en la vía.",
    dateTime: Date.now() - 180000, // hace 3 minutos
    status: "rejected",
  },
];
