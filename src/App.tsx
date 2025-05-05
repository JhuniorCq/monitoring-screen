import ActivitiesSection from "./components/ActivitiesSection";
import AlertsSection from "./components/AlertsSection";
import CameraPanel from "./components/CameraPanel";
import CameraSection from "./components/CameraSection";
import Header from "./components/Header";
import PreventAlertSection from "./components/PreventAlertSection";

const App = () => {
  return (
    <section className="w-full h-screen flex flex-col">
      <Header />

      <div className="flex">
        <div className="w-[10%] bg-yellow-300 h-[calc(100vh-80px)]">
          <CameraSection />
          <PreventAlertSection />
        </div>
        <CameraPanel />
        <div className="w-[16%] bg-green-300 h-[calc(100vh-80px)]">
          <AlertsSection />
          <ActivitiesSection />
        </div>
      </div>
    </section>
  );
};

export default App;
