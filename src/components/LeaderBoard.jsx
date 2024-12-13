
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { tagNames } from "./constants";
import { badgesMapping } from "./constants";


const LeaderBoard = () => {
  
  const dayData = useSelector((store) => store.dayData.days);

  // Safely retrieve the total_points from the last day's data
  const lastDay = dayData.length > 0 ? dayData[dayData.length - 1] : null;
  const lastDayKey = lastDay ? Object.keys(lastDay)[0] : null;
  const totalPoints = lastDayKey ? lastDay[lastDayKey].total_points : 0;

  const navigate = useNavigate();

  const leaderBoard = () => {
    navigate("/leaderBoard");
  };

  const currentBadge =
    badgesMapping
      .filter((badge) => badge.points <= totalPoints)
      .pop() || { name: "No Badge", imageUrl: "https://via.placeholder.com/150" };

  const currentTag =
    tagNames
      .filter((tag) => tag.points <= totalPoints)
      .pop()?.tag_name || "No Tag";

  return (
    <div className="p-5 w-full border border-slate-300 rounded-lg shadow-lg">
      <div className="flex justify-between w-full mb-5">
        <h1 className="font-semibold text-lg font-sans">LeaderBoard</h1>
        <div
          className="flex justify-center items-center gap-2 text-purple-600 cursor-pointer"
          onClick={leaderBoard}
        >
          <p className="text-sm">View</p>
          <FaArrowRightLong className="text-[10px]" />
        </div>
      </div>
      <hr className="border-1 border-slate-300" />
      <div className="flex my-5">
        <div>
        <img
            src={currentBadge.imageUrl}
            alt={currentBadge.name}
            className="w-20 h-15"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-semibold font-sans">{currentBadge.name}</p>
          <p className="text-[14px] font-semibold text-gray-400">
            P Mahesh
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center border border-gray-300 p-2 rounded-lg bg-pink-100 shadow-md">
      <h1 className="font-semibold text-purple-500">{`🎊${currentTag}🎊`}</h1>
        <div className="flex justify-center items-center">
          <img
            src="https://cdn.pixabay.com/photo/2022/04/22/11/38/gold-7149584_1280.png"
            alt="points"
            className="h-10 w-10"
          />
          <p className="font-semibold font-sans">{totalPoints}</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
