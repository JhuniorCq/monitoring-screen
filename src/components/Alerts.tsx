import { useAlertContext } from "../context/AlertContext";
import AlertCard from "./AlertCard";

const Alerts = () => {
  const { alerts } = useAlertContext();

  return (
    <section className="w-full h-1/2 px-5 pt-4 pb-6 bg-blue-300 flex flex-col">
      <div className="text-center border-b border-b-black mb-3 pb-2">
        <h2 className="font-semibold text-xl">Alerts</h2>
      </div>

      {alerts && alerts.length === 0 ? (
        <p className="px-4 py-6 text-center flex justify-center items-center grow">
          No se encontraron alertas
        </p>
      ) : (
        <ul className="flex flex-col gap-4 pr-2 overflow-y-auto">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Alerts;
