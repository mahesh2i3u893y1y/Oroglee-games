import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { TbFlag3Filled } from "react-icons/tb";
import { GiPoliceBadge } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";

const MobileNavs = () => {
    const location = useLocation();

    // Helper function to apply active styles
    const getLinkClass = (path) =>
        `flex flex-col items-center text-white px-2 py-1 transition-all duration-300 ease-in-out ${
            location.pathname === path ? "border-b-2 border-white" : ""
        }`;

    return (
        <div className="flex justify-around bg-purple-800 fixed bottom-0 left-0 w-full md:hidden py-2">
            <Link to="/home" className={getLinkClass("/home")}>
                <AiFillHome className="text-[20px]" />
                <p className={`text-xs  ${location.pathname === "/home" ? "" : ""}`}>Home</p>
            </Link>

            <Link to="/profile" className={getLinkClass("/profile")}>
                <CgProfile className="text-[20px]" />
                <p className={`text-xs ${location.pathname === "/profile" ? "" : ""}`}>Profile</p>
            </Link>

            <Link to="/journey" className={getLinkClass("/journey")}>
                <TbFlag3Filled className="text-[20px]" />
                <p className={`text-xs ${location.pathname === "/journey" ? "" : ""}`}>Journey</p>
            </Link>

            <Link to="/badges" className={getLinkClass("/badges")}>
                <GiPoliceBadge className="text-[20px]" />
                <p className={`text-xs  ${location.pathname === "/badges" ? "" : ""}`}>Badges</p>
            </Link>
        </div>
    );
};

export default MobileNavs;
