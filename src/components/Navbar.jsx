import {Link} from "react-router-dom"
import { StreakContext } from "./StreakContext";
import { useContext,  } from "react";

const Navbar = () => {
  const { streak } = useContext(StreakContext);

  
   
  return (
    <nav className="bg-slate-300 flex justify-between items-center  p-4 sticky top-0 w-full z-auto">
      <p>Navbar</p>
      <Link to="/streak">
        <div className="flex gap-1 md:hidden">
          <img src="https://cdn.vectorstock.com/i/500p/03/49/burning-fire-icon-isolated-on-white-vector-51200349.jpg" alt="streak" className="w-10 h-10" />
          <p className="font-semibold text-2xl">{streak}</p>
        </div>
      </Link>
    </nav>
  )
}

export default Navbar