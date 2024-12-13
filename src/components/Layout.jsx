import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="grid grid-cols-12 h-[99.9%] overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:block md:col-span-2 h-full bg-purple-800 overflow-y-auto hidden-scrollbar">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="col-span-12 md:col-span-10 h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
