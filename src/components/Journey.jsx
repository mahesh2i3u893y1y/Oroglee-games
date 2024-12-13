
import Timeline from "./Timelines";


const Journey = () => {
  return (
    <div className=" h-screen">
      <div className="col-span-12 md:col-span-10 flex flex-col justify-center items-center z-10 overflow-y-scroll">
        <Timeline/>
      </div>
    </div>
  );
};

export default Journey;
