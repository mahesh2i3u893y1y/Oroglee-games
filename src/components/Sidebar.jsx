import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { TbFlag3Filled } from "react-icons/tb";
import { GiPoliceBadge } from "react-icons/gi";
import { SiAmazongames } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();
    
    // Helper function to apply active styles
    const getLinkClass = (path) =>
        `flex justify-start items-center gap-2 w-full mb-1  p-2 rounded-lg cursor-pointer text-white ${
            location.pathname.startsWith(path) ? "bg-purple-950 " : ""
        }`;

    return (
        <div className="md:p-4 hidden md:block  backgroundImage">
            <div>
                <Link to="/home" className={getLinkClass("/home")}>
                    <AiFillHome className="text-[23px]" />
                    <p className="font-sans">Home</p>
                </Link>
            </div>
            <div>
                <Link to="/profile" className={getLinkClass("/profile")}>
                    <CgProfile className="text-[23px]" />
                    <p className="font-sans">Profile</p>
                </Link>
            </div>
            <div>
                <Link to="/journey" className={getLinkClass("/journey")}>
                    <TbFlag3Filled className="text-[23px]" />
                    <p className="font-sans">My Journey</p>
                </Link>
            </div>
            <div>
                <Link to="/badges" className={getLinkClass("/badges")}>
                    <GiPoliceBadge className="text-[23px]" />
                    <p className="font-sans">Badges </p>
                </Link>
            </div>
            <div>
                <Link to="/games" className={getLinkClass("/games")}>
                    <SiAmazongames className="text-[23px]" />
                    <p className="font-sans">Games</p>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
