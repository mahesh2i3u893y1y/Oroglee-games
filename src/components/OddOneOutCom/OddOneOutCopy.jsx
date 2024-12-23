/* eslint-disable react/prop-types */
import win from "../../assets/win.gif";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-dom-confetti";

const OddOneOutCopy = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showEffect, setShowEffect] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const questionLength = questions.length;
  const navigate = useNavigate();

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

  const handleOptionClick = (index) => {
    if (!isAnswered) {
      if (index === questions[currentQuestion].correctIndex) {
        setScore(score + 1);
        setShowEffect(true);
        setTimeout(() => setShowEffect(false), 1000);
      }
      setIsAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questionLength) {
      setCurrentQuestion(currentQuestion + 1);
      setIsAnswered(false);
    } else {
      setShowCongratulations(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsAnswered(false);
    setShowCongratulations(false);
  };

  const handleClose = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-3 relative">
      {/* Score Display */}
      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md text-lg font-bold text-gray-700">
        Score: {score}
      </div>

      {!showCongratulations ? (
        currentQuestion < questions.length ? (
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6">Find the Odd One Out</h1>
            <div className="text-center mb-6">
              <div className="text-6xl mt-5">{questions[currentQuestion].mainImage}</div>
              <p className="text-lg font-semibold mt-2">Main Situation</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`text-4xl p-4 rounded-lg border ${
                    isAnswered
                      ? index === questions[currentQuestion].correctIndex
                        ? "bg-green-300 border-green-500"
                        : "bg-red-300 border-red-500"
                      : "bg-blue-200 border-blue-400"
                  }`}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              ))}
            </div>

            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Next
              </button>
            )}
          </div>
        ) : null
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
          <p className="text-lg font-semibold mb-4">You completed the game!</p>
          <img src={win} alt="Win" className="w-40 h-40 mx-auto mb-4" />
          <p className="text-lg font-semibold">Your Score: {score} / {questionLength}</p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleRestart}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Play Again
            </button>
            <button
              onClick={handleClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Great Job Effect */}
      {showEffect && (
        <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-green-400 p-5">
          Great Job!
        </div>
      )}

      {/* Confetti Effect */}
      <div className="absolute">
        <Confetti active={showEffect} config={confettiConfig} />
      </div>
    </div>
  );
};

export default OddOneOutCopy;
