import { PiVideoCameraFill } from "react-icons/pi";
import { type Alert } from "../types/alert";

const AlertCard = ({ alert }: { alert: Alert }) => {
  return (
    <li className="px-3 py-3 rounded-md bg-white flex flex-col gap-3">
      <div className="flex items-center gap-3 cursor-pointer">
        <PiVideoCameraFill className="text-xl shrink-0" />
        <span className="text-sm">{alert.cameraId}</span>
      </div>

      <div className="border text-sm rounded-md">
        <div className="text-center py-2 px-3 flex flex-col gap-2">
          <h3 className="font-semibold">Alerta</h3>
          <p>{alert.description}</p>
          <p>{alert.dateTime}</p>
        </div>
        <div className="border-t">
          <p className="text-center py-1 px-3">{alert.status}</p>
        </div>
      </div>
    </li>
  );
};

export default AlertCard;
