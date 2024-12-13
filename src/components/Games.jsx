import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

const Games = () => {
    return (
        <div className="grid grid-cols-12 h-[99.9%]">
            {/* Sidebar Section */}
            <div className="hidden md:block col-span-2 h-full overflow-y-auto hidden-scrollbar bg-gray-800">
                <Sidebar />
            </div>

            {/* Outlet Section */}
            <div className="col-span-12 md:col-span-10 h-full overflow-y-auto hidden-scrollbar">
                <Outlet />
            </div>
        </div>
    );
};

export default Games;
