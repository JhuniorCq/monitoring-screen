import { PiVideoCameraFill } from "react-icons/pi";
import { useActivityContext } from "../context/ActivityContext";

const Activities = () => {
  const { activityList } = useActivityContext();

  return (
    <section className="w-full h-1/2 px-5 pt-4 pb-6 bg-orange-300 flex flex-col">
      <div className="text-center border-b border-b-black mb-3 pb-2">
        <h2 className="font-semibold text-xl">Activities</h2>
      </div>

      {activityList && activityList.length === 0 ? (
        <p className="px-4 py-6 text-center flex justify-center items-center grow">
          No hay cámaras disponibles
        </p>
      ) : (
        <ul className="flex flex-col gap-4 pr-2 overflow-y-auto">
          {activityList.map((activity) => {
            if (activity.peopleCount === 0) return;

            return (
              <li
                key={activity.cameraId}
                className="text-sm flex justify-around"
              >
                <div className="flex justify-center items-center gap-2.5 pr-2 cursor-pointer">
                  <PiVideoCameraFill className="text-2xl shrink-0" />
                  <span className="">{activity.cameraId}</span>
                </div>
                <p>{activity.peopleCount} Personas</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Activities;
