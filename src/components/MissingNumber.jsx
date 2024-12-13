import { useState, useEffect } from 'react';

const MissingNumber = () => {
  const [numbers, setNumbers] = useState([]);
  const [missingNumber, setMissingNumber] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

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
    setUserInput('');
    setFeedback('');
    setTimeLeft(30); // Reset the timer for a new game
    setGameOver(false); // Reset the game-over state
  };

  // Handle user input submission
  const handleSubmit = () => {
    if (parseInt(userInput) === missingNumber) {
      setFeedback('Correct! Great job!');
    } else {
      setFeedback(`Oops! The correct number was ${missingNumber}`);
    }
    setGameOver(true);
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeft === 0) {
      setFeedback(`Time's up! The correct number was ${missingNumber}`);
      setGameOver(true);
    } else if (!gameOver) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timerId); // Cleanup timer
    }
  }, [timeLeft, gameOver, missingNumber]);

  // Initialize grid on mount
  useEffect(() => {
    generateGrid();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Find the Missing Number</h1>
      {gameOver ? (
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">{feedback}</p>
          <button
            onClick={generateGrid}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Restart Game
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl mb-4">Time Left: {timeLeft}s</h2>
          <div className="grid grid-cols-5 gap-2">
            {numbers.map((number, index) => (
              <div
                key={index}
                className={`w-16 h-16 flex items-center justify-center ${
                  index === 12 ? 'bg-gray-200 text-gray-900' : 'bg-blue-500 text-white'
                } text-lg font-bold rounded-lg`}
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
