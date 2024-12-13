import { useSelector } from "react-redux";
import { badgesMapping } from "./constants";



const Badges = () => {
  const dayData = useSelector((store) => store.dayData.days);
  const lastDay = dayData.length > 0 ? dayData[dayData.length - 1] : null;
  const lastDayKey = lastDay ? Object.keys(lastDay)[0] : null;
  const totalPoints = lastDayKey ? lastDay[lastDayKey].total_points : 0;


  return (
    <div className="h-screen p-10">
      <div className="flex justify-center items-center flex-wrap">
        {badgesMapping.map((badge) => (
          <div key={badge.name} className="flex flex-col justify-center items-center">
            <img
              src={badge.imageUrl}
              alt="badge"
              className={`h-32 w-32 transition duration-300 ease-in-out ${
                badge.points <= totalPoints ? "" : "blur-sm grayscale"
              }`}
            />
            <h1 className="mt-2 text-lg font-semibold text-gray-800">
              {badge.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;