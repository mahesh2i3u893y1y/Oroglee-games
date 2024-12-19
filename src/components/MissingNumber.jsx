import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loose from "../assets/loose.gif";
import win from "../assets/win.gif";

const MissingNumber = () => {
  const navigate = useNavigate(); // To redirect the user
  const [numbers, setNumbers] = useState([]);
  const [missingNumber, setMissingNumber] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const colors = [
    "bg-red-200", "bg-green-200", "bg-blue-200", "bg-yellow-200",
    "bg-purple-200", "bg-pink-200", "bg-indigo-200", "bg-teal-200",
    "bg-orange-200", "bg-gray-200", "bg-cyan-200", "bg-lime-200",
    "bg-amber-200", "bg-fuchsia-200", "bg-rose-200", "bg-sky-200",
    "bg-violet-200", "bg-emerald-200", "bg-slate-200", "bg-stone-200",
  ];

  // Generate a shuffled grid with one number missing
  const generateGrid = () => {
    const fullArray = Array.from({ length: 25 }, (_, i) => i + 1); // Numbers 1 to 25
    const missing = fullArray.splice(Math.floor(Math.random() * 25), 1)[0]; // Randomly remove one number
    setMissingNumber(missing);

    // Shuffle the remaining 24 numbers
    const shuffledArray = fullArray.sort(() => Math.random() - 0.5);

    // Insert a placeholder for the center (index 12)
    shuffledArray.splice(12, 0, null);

    setNumbers(shuffledArray);
    setUserInput("");
    setFeedback("");
    setTimeLeft(30); // Reset the timer for a new game
    setGameOver(false); // Reset the game-over state
    setShowPopup(false);
  };

  // Handle user input submission
  const handleSubmit = () => {
    if (parseInt(userInput) === missingNumber) {
      setFeedback("🎉 Correct! Great job!");
    } else {
      setFeedback(`❌ Oops! The correct number was ${missingNumber}`);
    }
    setGameOver(true);
    setShowPopup(true);
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeft === 0) {
      setFeedback(`⏰ Time's up! The correct number was ${missingNumber}`);
      setGameOver(true);
      setShowPopup(true);
    } else if (!gameOver) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timerId); // Cleanup timer
    }
  }, [timeLeft, gameOver, missingNumber]);

  // Initialize grid on mount
  useEffect(() => {
    generateGrid();
  }, []);

  // Redirect to home page
  const handleClosePopup = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Find the Missing Number</h1>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <img
              src={feedback.includes("Correct") ? win : loose}
              alt={feedback.includes("Correct") ? "Win" : "Lose"}
              className="w-48 mx-auto mb-4"
            />
            <h2
              className={`text-xl font-bold ${
                feedback.includes("Correct") ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </h2>
            {feedback.includes("Correct") ? (
              <button
                onClick={handleClosePopup}
                className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
              >
                Close
              </button>
            ) : (
              <button
                onClick={generateGrid}
                className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
              >
                Restart Game
              </button>
            )}
          </div>
        </div>
      )}
      {!gameOver && (
        <>
          <h2 className="text-xl mb-4">Time Left: {timeLeft}s</h2>
          <div className="grid grid-cols-5 gap-2">
            {numbers.map((number, index) => (
              <div
                key={index}
                className={`w-16 h-16 flex items-center justify-center text-lg font-bold rounded-lg ${
                  index === 12 ? "bg-gray-200 text-gray-900" : colors[index % colors.length]
                }`}
              >
                {index === 12 ? (
                  <input
                    type="number"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full h-full text-center border-none bg-transparent"
                    disabled={gameOver}
                  />
                ) : (
                  number
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MissingNumber;
