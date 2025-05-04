import Activities from "./components/Activities";
import Alerts from "./components/Alerts";
import CameraPanel from "./components/CameraPanel";
import CameraStatus from "./components/CameraStatus";
import Header from "./components/Header";
import PreventAlert from "./components/PreventAlerts";

const App = () => {
  return (
    <section className="w-full h-screen">
      <Header />

      <div className="flex">
        <div className="w-[10%] bg-yellow-300 border h-[calc(100vh-80px)]">
          <CameraStatus />
          <PreventAlert />
        </div>
        <CameraPanel />
        <div className="w-[16%] bg-green-300 h-[calc(100vh-80px)]">
          <Alerts />
          {/* <div className="w-full p-4 h-1/2 bg-orange-300"></div> */}
          <Activities />
        </div>
      </div>
    </section>
  );
};

export default App;
