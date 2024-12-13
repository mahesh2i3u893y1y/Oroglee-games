

import { useNavigate } from "react-router";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { markGameAsPlayed } from "../Utilities/gamesDataSlice";

const DisplayGames = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const games = useSelector((store) => store.games)

  const playedGames = games.filter(game => game.played);
  const unlockedGames = games.filter(game => game.status === "unlocked");
  const lockedGames = games.filter(game => game.status === "locked");

  const handleGameClick = (game) => {
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
      {playedGames.length > 0 && (
        <div>
          <h2 className="text-xl text-center my-5">Played Games</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {playedGames.map((game, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate("/game-rules", { state: { game } }) // Pass the game info to Journey
                }
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

      {/* {unlockedGames.length > 0 && (
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
      )} */}
      {/* Locked Games Section */}
      {lockedGames.length > 0 && (
        <div>
          <h2 className="text-xl text-center my-5">Locked Games</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {lockedGames.map((game, index) => (
              <div
                key={index}
                onClick={(e) => {
                  if (game.status === "locked") {
                    e.preventDefault();
                    return; // Prevent navigation if the game is locked
                  }
                  navigate("/game-rules", { state: { game } }); // Navigate if unlocked
                }}
                className={`bg-black p-3 rounded-lg flex flex-col justify-center items-center transform hover:scale-105 transition-transform duration-300 ease-in-out ${game.status === "locked" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
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
