/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-dom-confetti";
import win from "../../assets/win.gif";

const ReOrderGameCopy = ({ questions }) => {
    const navigate = useNavigate(); // To redirect the user
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [score, setScore] = useState(0);
  const [showEffect, setShowEffect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showResults, setShowResults] = useState(false); // To show the results after game ends

  const questions_length = questions.length;

  // Shuffle function to randomize array and ensure it's not in correct order
  const shuffleArray = (array, correctOrder) => {
    let shuffled;
    do {
      shuffled = [...array].sort(() => Math.random() - 0.5);
    } while (JSON.stringify(shuffled) === JSON.stringify(correctOrder));
    return shuffled;
  };

  // Initialize shuffled items on question change
  useEffect(() => {
    if (currentQuestion < questions.length) {
      const shuffledItems = shuffleArray(
        [...questions[currentQuestion].items],
        questions[currentQuestion].correctOrder
      );
      setCurrentOrder(shuffledItems);
    }
  }, [currentQuestion]);

  const confettiConfig = {
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
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("draggedItem", index);
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("draggedItem");
    const newOrder = [...currentOrder];
    const draggedItem = newOrder.splice(draggedIndex, 1)[0];
    newOrder.splice(index, 0, draggedItem);
    setCurrentOrder(newOrder);

    // Check if the order is correct
    if (JSON.stringify(newOrder) === JSON.stringify(questions[currentQuestion].correctOrder)) {
      setScore(score + 1);
      setShowEffect(true);
      setTimeout(() => {
        setShowEffect(false);
        handleNextQuestion(); // Automatically move to next question after correct answer
      }, 1000); // Hide confetti and move to next question after 1 second
    }
  };


  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setGameOver(true); // End the game when all questions are answered
      setShowResults(true); // Show results popup
    }
  };

  const handleRestartGame = () => {
    setCurrentQuestion(0);
    setCurrentOrder([]);
    setScore(0);
    setGameOver(false);
    setShowResults(false); // Reset results display
  };

  const handleCloseResults = () => {
    navigate("/home"); // Redirect to home page
  };

  if (gameOver && !showResults) {
    return (
      <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Game Over!</h1>
          <p className="text-lg font-semibold mb-4">Your final score is {score}/{questions_length}</p>
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

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Reorder Activity</h1>
        <p className="text-lg text-center font-semibold mb-6">
          Situation: {questions[currentQuestion].situation}
        </p>

        <div className="space-y-4">
          {currentOrder.map((item, index) => (
            <div
              key={item}
              className="bg-blue-200 text-4xl font-bold flex items-center justify-center h-16 w-full rounded-lg shadow-md cursor-pointer"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={(e) => e.preventDefault()}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleNextQuestion}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            skip
          </button>
        </div>
      </div>

      {/* Confetti Effect */}
      <div className="absolute">
        <Confetti active={showEffect} config={confettiConfig} />
      </div>

      {/* Results Popup */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <img
              src={win}
              alt="Win"
              className="w-48 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-green-600 mb-4">
              🎊Congratulations! Your final score is🎊 <br/> {score}/{questions_length}
            </h2>
            <button
              onClick={handleCloseResults}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReOrderGameCopy;
