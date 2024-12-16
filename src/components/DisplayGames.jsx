

import { useNavigate } from "react-router";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { markGameAsPlayed } from "../Utilities/gamesDataSlice";
import { useEffect } from "react";


const DisplayGames = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { games, level } = useSelector((store) => store.games);

  useEffect(() => {
    console.log("Current level updated to:", level); // Debug log
  }, [level]);

  // Filter games based on the level
  const filteredGames = games.filter(
    (game) => game.level === level || game.level === "all"
  );

  const playedGames = filteredGames.filter((game) => game.played);
  console.log(playedGames)
  const unlockedGames = filteredGames.filter((game) => game.status === "unlocked");
  const lockedGames = filteredGames.filter((game) => game.status === "locked");


  const handleGameClick = (game) => {
    console.log("Clicked game:", game); // Debug log
    if (!game.played) {
      dispatch(markGameAsPlayed(game.id)); // Mark game as played
    }
    navigate("/game-rules", { state: { game } }); // Navigate to game rules
  };

  return (
    <div className="p-5">
      <h1 className="text-purple-800 text-3xl font-semibold text-center my-5">Games</h1>

      {unlockedGames.length > 0 && (
        <div>
          <h2 className="text-xl text-center my-5">Unlocked Games</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {unlockedGames.map((game, index) => (
              <div
                key={index}
                onClick={() => handleGameClick(game)}
                className="bg-black p-3 rounded-lg flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
                style={{ aspectRatio: "1", minWidth: "150px", maxWidth: "200px" }}
              >
                <img src={game.img} alt={game.name} className="w-2/3 h-2/3 object-contain" />
                <p className="text-white font-semibold my-1">{game.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Played Games */}
      {playedGames.length > 0 && (
        <div>
          <h2 className="text-xl text-center my-5">Played Games</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {playedGames.map((game, index) => (
              <div
                key={index}
                onClick={() =>  navigate("/game-rules", { state: { game } })}
                className="bg-black p-3 rounded-lg flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
                style={{ aspectRatio: "1", minWidth: "150px", maxWidth: "200px" }}
              >
                <img src={game.img} alt={game.name} className="w-2/3 h-2/3 object-contain" />
                <p className="text-white font-semibold my-1">{game.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Games */}
      {lockedGames.length > 0 && (
        <div>
          <h2 className="text-xl text-center my-5">Locked Games</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {lockedGames.map((game, index) => (
              <div
                key={index}
                className="bg-black p-3 rounded-lg flex flex-col justify-center items-center opacity-50 cursor-not-allowed"
                style={{ aspectRatio: "1", minWidth: "150px", maxWidth: "200px" }}
              >
                <img src={game.img} alt={game.name} className="w-2/3 h-2/3 object-contain" />
                <p className="text-white font-semibold my-1">{game.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

};

export default DisplayGames;


