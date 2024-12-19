/* eslint-disable react/prop-types */
import { useState } from "react";
import { Wheel } from "react-custom-roulette";

const SpinWithMathsCopy = ({ level, generateQuestions }) => {
  const [questions, setQuestions] = useState(generateQuestions());
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spinsLeft, setSpinsLeft] = useState(10); // Maximum 10 spins
  const [score, setScore] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [visitedIndices, setVisitedIndices] = useState([]); // To track visited questions
  const [gameStarted, setGameStarted] = useState(false); // Controls visibility of question box
  const [questionAnswered, setQuestionAnswered] = useState(true); // Track if the question is answered

  const handleSpinClick = () => {
    if (spinsLeft === 0 || !questionAnswered) return;

    if (!gameStarted) {
      setGameStarted(true); // Start the game on the first spin
    }

    // Filter unvisited questions
    const unvisitedIndices = questions
      .map((_, index) => index)
      .filter((index) => !visitedIndices.includes(index));

    if (unvisitedIndices.length === 0) {
      setMessage("All questions have been visited!");
      return;
    }

    // Pick a random unvisited index
    const newPrizeNumber =
      unvisitedIndices[Math.floor(Math.random() * unvisitedIndices.length)];
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setMessage("");
    setCurrentAnswer("");
    setQuestionAnswered(false); // Question needs to be answered before spinning again
  };

  const handleStopSpinning = () => {
    setMustSpin(false);

    // Mark the current question as visited
    setVisitedIndices((prev) => [...prev, prizeNumber]);
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = questions[prizeNumber];
    const correctAnswer = currentQuestion.answer;

    if (parseInt(currentAnswer, 10) === correctAnswer) {
      setScore(score + 1);
      setMessage("✅ Correct! Your score has been increased!");
    } else {
      setMessage(`❌ Incorrect! The correct answer was ${correctAnswer}.`);
    }

    setQuestions((prevQuestions) =>
      prevQuestions.map((q, index) =>
        index === prizeNumber ? { ...q, answered: true } : q
      )
    );
    setSpinsLeft((prev) => prev - 1);
    setQuestionAnswered(true); // Enable spinning after answering
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Math Spinner Game - {level.toUpperCase()} Level
      </h1>
      <div className="flex flex-col items-center">
        <p className="text-lg mb-2">
          Current Score: <strong>{score}</strong>
        </p>
        <p className="text-lg mb-4">
          Spins Left: <strong>{spinsLeft}</strong>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
        <div className="mb-6">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={questions}
            onStopSpinning={handleStopSpinning}
            outerBorderColor="#ccc"
            outerBorderWidth={8}
            innerRadius={20}
            innerBorderColor="#f0f0f0"
            radiusLineColor="#ddd"
            radiusLineWidth={2}
            textColors={["#333"]}
            backgroundColors={[
              "#FFDDC1",
              "#FFABAB",
              "#32a852",
              "#32a892",
              "#8532a8",
              "#a832a4",
              "#a8327b",
              "#a83248",
              "#a84432",
              "#3267a8",
            ]}
          />
        </div>
        <div className="m-10 w-full max-w-sm">
          {gameStarted && !mustSpin && spinsLeft > 0 && !questions[prizeNumber]?.answered && (
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold mb-4 text-center">
                Question: {questions[prizeNumber]?.option}
              </p>
              <input
                type="number"
                placeholder="Enter your answer"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                className="border p-2 rounded w-32 text-center mb-2"
              />
              <button
                onClick={handleSubmitAnswer}
                className="px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
              >
                Submit Answer
              </button>
            </div>
          )}
          <button
            onClick={handleSpinClick}
            disabled={mustSpin || spinsLeft === 0 || !questionAnswered}
            className={`px-6 py-2 mt-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 ${
              mustSpin || spinsLeft === 0 || !questionAnswered
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {mustSpin
              ? "Spinning..."
              : spinsLeft === 0
              ? "Game Over"
              : "Spin"}
          </button>
          {message && <p className="mt-4 text-lg text-center">{message}</p>}
        </div>
      </div>
      {spinsLeft === 0 && (
        <p className="text-xl mt-6 font-bold text-center">
          Game Over! Your Final Score: {score}
        </p>
      )}
    </div>
  );
};

export default SpinWithMathsCopy;
