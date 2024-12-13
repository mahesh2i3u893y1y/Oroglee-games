import { useState, useEffect } from "react";
import Confetti from "react-dom-confetti";

const JumbledWordsActivity = () => {
  const words = [
    { image: "https://cdn.pixabay.com/photo/2024/03/01/19/57/airbus-8607152_1280.jpg", name: "Aeroplane" },
    { image: "https://cdn.pixabay.com/photo/2017/04/06/22/11/car-2209439_1280.png", name: "Car" },
    { image: "https://cdn.pixabay.com/photo/2017/04/04/17/40/fruits-2202411_1280.jpg", name: "Banana" },
    { image: "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg", name: "House" },
    { image: "https://cdn.pixabay.com/photo/2020/01/24/22/32/elephant-4791438_1280.jpg", name: "Elephant" },
    { image: "https://cdn.pixabay.com/photo/2015/11/17/13/13/puppy-1047521_1280.jpg", name: "Dog" },
    { image: "https://cdn.pixabay.com/photo/2017/09/23/11/43/football-2778583_1280.jpg", name: "Ball" },
    { image: "https://cdn.pixabay.com/photo/2018/05/03/22/34/lion-3372720_1280.jpg", name: "Lion" },
    { image: "https://cdn.pixabay.com/photo/2016/08/08/15/08/cruise-1578528_1280.jpg", name: "Ship" },
    { image: "https://cdn.pixabay.com/photo/2016/11/18/13/03/apple-1834328_1280.jpg", name: "Computer" },
  ];

  const shuffleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
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

  if (gameOver) {
    return (
      <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Game Over!</h1>
          <p className="text-lg font-semibold mb-4">Your final score is {score}</p>
          <button
            onClick={handleRestartGame}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Restart Game
          </button>
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
          <img src={currentWord.image} alt={currentWord.name} className="w-32 h-32 object-contain mr-4" />
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
        <Confetti active={showEffect} config={{ angle: "90", spread: 100, startVelocity: 40, elementCount: 50, dragFriction: 0.1, duration: 3000, stagger: 3, width: "10px", height: "10px", colors: ["#ff0", "#ff4081", "#007bff", "#4caf50", "#ff5722"] }} />
      </div>
    </div>
  );
};

export default JumbledWordsActivity;
