/* eslint-disable react/prop-types */
import Tracker from "./Tracker";
import { useSelector } from "react-redux";

const Streak = ({ clickCount }) => {
  // Access days array and baseDate from Redux store
  const dayData = useSelector((store) => store.dayData.days);

  // Safely get the last day's details
  const lastDay = dayData.length > 0 ? dayData[dayData.length - 1] : null;
  const lastDayKey = lastDay ? Object.keys(lastDay)[0] : null;
  const lastDayDetails = lastDayKey
    ? lastDay[lastDayKey]
    : { current_streak: 0, total_points: 0 };

  return (
    <div className="border border-gray-300 p-4 pb-2 my-4 rounded-lg shadow-lg">
      <div className="my-2">
        <h1 className="font-semibold font-sans">Brushing Consistency</h1>
        <p className="text-gray-400 text-[14px]">
          Track your progress and consistency.
        </p>
      </div>
      <div className="flex justify-between items-center">
        {/* Current Streak Section */}
        <div>
          <p>Current Streak</p>
          <div className="flex justify-center items-center">
            <img
              src="https://cdn.vectorstock.com/i/500p/03/49/burning-fire-icon-isolated-on-white-vector-51200349.jpg"
              alt="streak"
              className="w-12 h-12"
            />
            <p className="font-semibold text-2xl">{lastDayDetails.current_streak}</p>
          </div>
        </div>

        {/* Consistency Score Section */}
        <div>
          <p>Consistency Score</p>
          <div className="flex justify-center items-center">
            <img
              src="https://cdn.pixabay.com/photo/2022/04/22/11/38/gold-7149584_1280.png"
              alt="consistency"
              className="h-12 w-12"
            />
            <p className="font-semibold text-2xl">{lastDayDetails.total_points}</p>
          </div>
        </div>
      </div>
      {/* Tracker Component */}
      <Tracker clickCount={clickCount} />
    </div>
  );
};

export default Streak;
