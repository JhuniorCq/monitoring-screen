import Camera from "./Camera";

const cameeras = Array(9).fill(null);

const Cameras = () => {
  return (
    <section className="flex-1 p-4 overflow-y-auto bg-red-300">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cameeras && cameeras.map((_, i) => <Camera key={i} id={i} />)}
      </ul>
    </section>
  );
};

export default Cameras;
