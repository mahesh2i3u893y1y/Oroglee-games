import Game from "./Game";
import Leadership from "./Leadership";
// import Sidebar from "./Sidebar";
import { useContext } from "react";
import { StreakContext } from "./StreakContext";

const Body = () => {
  const { clickCount } = useContext(StreakContext);

  return (
    <div className="h-[99.9%] grid grid-cols-12 overflow-hidden">
      {/* Sidebar */}
      {/* <div className="hidden md:block md:col-span-2 h-full bg-purple-800 overflow-y-auto hidden-scrollbar">
        <Sidebar />
      </div> */}

      {/* Game Section */}
      <div className="col-span-12 md:col-span-7  bg-slate-100 flex justify-center items-center overflow-y-auto hidden-scrollbar">
        <Game />
      </div>

      {/* Leadership Section */}
      <div className="hidden md:flex md:col-span-5 h-full bg-white overflow-y-auto hidden-scrollbar">
        <Leadership clickCount={clickCount} />
      </div>
    </div>
  );
};

export default Body;
