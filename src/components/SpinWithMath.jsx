import { useState } from "react";
import { Wheel } from "react-custom-roulette";

const SpinWheel = () => {
  // Generate random addition and subtraction questions
  const generateQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const isAddition = Math.random() > 0.5;
      const question = isAddition
        ? `${num1} + ${num2}`
        : `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
      const answer = isAddition ? num1 + num2 : Math.max(num1, num2) - Math.min(num1, num2);
      questions.push({ option: question, answer });
    }
    return questions;
  };

  const [questions, setQuestions] = useState(generateQuestions());
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * questions.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setMessage("");
    setCurrentAnswer("");
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setMessage("Solve the question above!");
  };

  const handleSubmitAnswer = () => {
    const correctAnswer = questions[prizeNumber].answer;
    if (parseInt(currentAnswer, 10) === correctAnswer) {
      setScore(score + 1);
      setMessage("✅ Correct! Your score has been increased!");
    } else {
      setMessage(`❌ Incorrect! The correct answer was ${correctAnswer}.`);
    }
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, index) => index !== prizeNumber)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Math Spinner Game</h1>
      <p className="text-lg mb-2">
        Current Score: <strong>{score}</strong>
      </p>
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
          backgroundColors={["#FFDDC1", "#FFABAB", "#32a852", "#32a892", "#8532a8", "#a832a4", "#a8327b", "#a83248", "#a84432", "#3267a8"]}
        />
      </div>
      {!mustSpin && questions.length > 0 && (
        <div className="flex flex-col items-center">
          <p className="text-lg font-bold mb-4">
            Question: {questions[prizeNumber].option}
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
        disabled={mustSpin || questions.length === 0}
        className={`px-6 py-2 mt-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 ${
          mustSpin || questions.length === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {mustSpin ? "Spinning..." : questions.length === 0 ? "No More Questions" : "Spin"}
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
};

export default SpinWheel;
