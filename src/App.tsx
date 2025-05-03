import Cameras from "./components/Cameras";
import Header from "./components/Header";

const App = () => {
  return (
    <section>
      <Header />

      <div className="flex">
        <div className="w-[10%] bg-yellow-300 p-4 border min-h-[calc(100vh-80px)]">
          <div className="w-full h-1/2 bg-blue-300"></div>
          <div className="w-full h-1/2 bg-orange-300"></div>
        </div>
        <Cameras />
        <div className="w-[15%] bg-green-300 p-4 min-h-[calc(100vh-80px)]">
          <div className="w-full h-1/2 bg-blue-300"></div>
          <div className="w-full h-1/2 bg-orange-300"></div>
        </div>
      </div>
    </section>
  );
};

export default App;
