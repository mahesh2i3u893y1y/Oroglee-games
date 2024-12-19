/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-dom-confetti";
import win from "../../assets/win.gif";

const FindItCopy = ({ words }) => {
  const navigate = useNavigate(); // To redirect the user

  const shuffleWord = (word) => {
    return word.split("").sort(() => Math.random() - 0.5).join("");
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [showEffect, setShowEffect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [jumbledWord, setJumbledWord] = useState(""); // New state to hold jumbled word

  const currentWord = words[currentIndex];

  // Shuffle word once when the currentIndex changes
  useEffect(() => {
    const shuffled = shuffleWord(currentWord.name);
    setJumbledWord(shuffled);
  }, [currentIndex]); // Only re-shuffle when currentIndex changes

  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleSubmit = () => {
    if (userGuess.toLowerCase() === currentWord.name.toLowerCase()) {
      setScore(score + 1);
      setShowEffect(true);
      setTimeout(() => setShowEffect(false), 1000);
      // Automatically move to next question after a correct answer
      setTimeout(handleNextQuestion, 1000);
    }
    setUserGuess(""); // Clear the input box after each guess
  };

  const handleNextQuestion = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < words.length) {
      setCurrentIndex(nextIndex);
    } else {
      setGameOver(true);
    }
  };

  const handleRestartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
  };

  const handleCloseGame = () => {
    navigate("/home"); // Redirect to the home page
  };

  if (gameOver) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
          <img src={win} alt="Win" className="w-48 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Congratulations!
          </h1>
          <p className="text-lg font-semibold mb-4">
            Your final score is {score}/{words.length}
          </p>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleRestartGame}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Restart
            </button>
            <button
              onClick={handleCloseGame}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4 relative">
      {/* Score Display */}
      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md text-lg font-bold text-gray-700">
        Score: {score}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Jumbled Words Activity</h1>

        <div className="flex items-center justify-center mb-4">
          <img
            src={currentWord.image}
            alt={currentWord.name}
            className="w-32 h-32 object-contain mr-4"
          />
          <div className="text-lg font-semibold">{jumbledWord}</div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={userGuess}
            onChange={handleInputChange}
            placeholder="Guess the word"
            className="px-4 py-2 rounded-lg border border-gray-300"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </div>

      {/* Confetti Effect */}
      <div className="absolute">
        <Confetti
          active={showEffect}
          config={{
            angle: "90",
            spread: 100,
            startVelocity: 40,
            elementCount: 50,
            dragFriction: 0.1,
            duration: 3000,
            stagger: 3,
            width: "10px",
            height: "10px",
            colors: ["#ff0", "#ff4081", "#007bff", "#4caf50", "#ff5722"],
          }}
        />
      </div>
    </div>
  );
};

export default FindItCopy;
