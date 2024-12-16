import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLevel } from "../Utilities/gamesDataSlice";
import { addNewDay, enableNextDay } from "../Utilities/dayDataSlice";
import { useNavigate } from "react-router";

const BrushingGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { brushedToday, nextDayAvailable } = useSelector((state) => state.dayData);

  const level = useSelector((store) => store.games.level)

  const [skipDays, setSkipDays] = useState(0);

  const handleBrushed = () => {
    if (!brushedToday) {
      dispatch(addNewDay({ missed: false }));
      navigate("/games-landing");
    }
  };


  const handleSkipDays = () => {
    const daysToSkip = parseInt(skipDays, 10);
    if (daysToSkip > 0) {
      for (let i = 0; i < daysToSkip; i++) {
        dispatch(addNewDay({ missed: true }));
      }
      setSkipDays(0);
    }
  };

  const handleNextDay = () => {
    if (nextDayAvailable) {
      dispatch(enableNextDay());
    }
  };

  const handleLevelChange = (level) => {
    console.log("Dispatching level change to:", level);
    dispatch(updateLevel(level))
  }

  return (
    <div className="flex flex-col gap-4 items-center ">
      <p>{level}</p>
      <div className="flex justify-center items-center gap-3">
        <button
          className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold"
          onClick={() => handleLevelChange("easy")}
        >
          Level-1
        </button>
        <button
          className="bg-yellow-400 px-4 py-2 rounded-md text-white font-semibold"
          onClick={() => handleLevelChange("medium")}
        >
          Level-2
        </button>
        <button
          className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold"
          onClick={() => handleLevelChange("hard")}
        >
          Level-3
        </button>
      </div>
      <div className="flex gap-3">
        <button
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition disabled:opacity-50"
          onClick={handleBrushed}
          disabled={brushedToday}
        >
          Brushed
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
          onClick={handleNextDay}
          disabled={!nextDayAvailable}
        >
          Next Day
        </button>
      </div>
      <div className="flex gap-3">
        <button
          className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
          onClick={handleSkipDays}
        >
          Skipped
        </button>
        <input
          type="number"
          className="border border-gray-400 p-2 rounded-md"
          value={skipDays}
          onChange={(e) => setSkipDays(e.target.value)}
          placeholder="Enter days to skip"
          min="1"
        />
      </div>
    </div>
  );
};

export default BrushingGame;
