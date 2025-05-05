import { PiVideoCameraFill } from "react-icons/pi";
import { useActivityContext } from "../context/ActivityContext";

const ActivitiesSection = () => {
  const { activityList } = useActivityContext();

  return (
    <section className="w-full h-1/2 px-5 pt-4 pb-6 bg-bg-dark flex flex-col">
      <div className="text-center border-b border-b-white mb-3 pb-2">
        <h2 className="font-semibold text-xl text-text-main">Activities</h2>
      </div>

      {activityList && activityList.length === 0 ? (
        <p className="px-4 py-6 text-center flex justify-center items-center grow text-white">
          No hay cámaras disponibles
        </p>
      ) : (
        <ul className="flex flex-col gap-5 pr-2 overflow-y-auto mt-3">
          {activityList.map((activity) => {
            if (activity.person_count === 0) return;

            return (
              <li key={activity.camera_id} className=" flex justify-around">
                <div className="flex justify-center items-center gap-2.5 pr-2 cursor-pointer">
                  <PiVideoCameraFill className="text-2xl shrink-0 text-white" />
                  <span className="text-white">{activity.camera_id}</span>
                </div>
                <p className="text-white">{activity.person_count} Personas</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default ActivitiesSection;
