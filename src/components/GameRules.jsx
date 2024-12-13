import { useLocation, useNavigate } from "react-router";


const GameRules = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve game info from state
  const { game } = location.state || {};
  return (
    <div className="p-5">
      {/* Centered Main Heading */}
      <h1 className="text-purple-800 text-3xl font-semibold text-center my-5">
        Memory Matching Game
      </h1>

      {/* Video and Rules Side by Side */}
      <div className="flex flex-wrap justify-around  gap">
        {/* Game Video */}
        <div className="flex justify-center">
          <video
            autoPlay
            loop
            muted
            className="w-full max-w-lg rounded-lg shadow-lg"
          >
            <source src={game.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Rules Section */}
        <div className="bg-gray-100 p-5 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-lg font-bold mb-4">Rules:</h2>
          <ul className="text-gray-700 list-disc list-inside">
            <li>Flip all the cards face down.</li>
            <li>Start the timer when the child begins.</li>
            <li>The child selects two cards to flip over, revealing their images.</li>
            <li>If the cards match, the pair is removed from the grid.</li>
            <li>If the cards do not match, flip them back face down.</li>
            <li>Only two cards may be flipped at a time.</li>
            <li>
              The child can take as many turns as they want within the timer. The
              child should try to remember the positions of the cards they’ve
              already seen to help make matches.
            </li>
            <li>If all pairs are matched before the timer runs out, the child wins!</li>
          </ul>

          {/* Start Game Button */}
          <button
          onClick={() => navigate(game.link)}
          className="bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-purple-900"
        >
          Start Game
        </button>
        </div>
      </div>
    </div>
  );
};

export default GameRules;
