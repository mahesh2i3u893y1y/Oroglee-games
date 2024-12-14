/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

const MathsQuizCopy = ({ difficulty }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentProblem, setCurrentProblem] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  // Function to generate random numbers and math problems based on difficulty
  const generateProblem = () => {
    let num1, num2, problem, correctAnswer;

    switch (difficulty) {
      case 'medium':
        num1 = Math.floor(Math.random() * 12) + 1; // Random number between 1 and 12
        num2 = Math.floor(Math.random() * 12) + 1; // Random number between 1 and 12
        problem = `${num1} × ${num2}`; // Multiplication problem
        correctAnswer = num1 * num2;
        break;

      case 'hard':
        num1 = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
        num2 = Math.floor(Math.random() * 12) + 1; // Random divisor between 1 and 12
        correctAnswer = Math.floor(num1 / num2);
        num1 = correctAnswer * num2; // Adjust num1 to make the division problem solvable
        problem = `${num1} ÷ ${num2}`; // Division problem
        break;

      default: // Easy level
        { num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        const isAddition = Math.random() > 0.5;

        if (isAddition) {
          problem = `${num1} + ${num2}`;
          correctAnswer = num1 + num2;
        } else {
          if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure no negative results
          problem = `${num1} - ${num2}`;
          correctAnswer = num1 - num2;
        }
        break; }
    }

    setCurrentProblem(problem);
    return correctAnswer;
  };

  const [correctAnswer, setCorrectAnswer] = useState(generateProblem);

  // Function to handle the user's answer
  const handleAnswer = () => {
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback('Oops! Try Again!');
    }

    setAnswer('');
    setCorrectAnswer(generateProblem());
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeft === 0) {
      alert(`Game Over! Your final score is ${score}`);
      setScore(0);
      setTimeLeft(60);
    }
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, score]);

  // Start a new game
  const startNewGame = () => {
    setScore(0);
    setTimeLeft(60);
    setCorrectAnswer(generateProblem());
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAnswer();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
      <h1 className="text-3xl font-bold mb-4">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Math Quiz</h1>

      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-semibold mb-2">Time Left: {timeLeft}s</h2>
          <h2 className="text-xl mb-4 font-semibold">Score: {score}</h2>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Solve this problem:</h3>
          <div className="text-3xl font-bold mb-4">{currentProblem}</div>
        </div>

        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyPress} // Handle Enter key press
          placeholder="Enter your answer"
          className="p-2 border-2 border-gray-300 rounded-lg w-full mb-4 text-center"
        />

        <button
          onClick={handleAnswer}
          className="bg-purple-300 text-white p-2 rounded-lg w-full mb-4 hover:bg-purple-600"
        >
          Submit Answer
        </button>

        <div className="text-center">
          {feedback && <p className="text-xl font-semibold">{feedback}</p>}
        </div>

        <button
          onClick={startNewGame}
          className="mt-4 bg-blue-500 text-white p-2 rounded-lg  hover:bg-blue-600"
        >
          Start New Game
        </button>
      </div>
    </div>
  );
};

export default MathsQuizCopy
