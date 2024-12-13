import { useState, useEffect } from "react";

const QuickTapNumbers = () => {
  const [numbers, setNumbers] = useState([]); // The randomized numbers to display
  const [tappedNumbers, setTappedNumbers] = useState([]); // Numbers tapped by the user
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  // Helper to generate unique random numbers
  const generateRandomNumbers = (count, max) => {
    const randomSet = new Set();
    while (randomSet.size < count) {
      randomSet.add(Math.floor(Math.random() * max) + 1);
    }
    return Array.from(randomSet).sort(() => Math.random() - 0.5);
  };

  // Initialize random numbers
  useEffect(() => {
    const randomNumbers = generateRandomNumbers(10, 50); // Generate 10 random numbers up to 50
    setNumbers(randomNumbers);
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (!gameOver) {
      setGameOver(true);
      setMessage("Better Luck Next Time!");
    }
  }, [timeLeft, gameOver]);

  // Handle number clicks
  const handleClick = (num) => {
    if (num === Math.min(...numbers.filter((n) => !tappedNumbers.includes(n)))) {
      setTappedNumbers([...tappedNumbers, num]); // Add tapped number to the list
      if (tappedNumbers.length + 1 === numbers.length) {
        setGameOver(true);
        setMessage("Congratulations! You Tapped All Correctly!");
      }
    } else {
      setGameOver(true);
      setMessage("Better Luck Next Time!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      {gameOver ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{message}</h1>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Quick Tap Numbers</h1>
          <p className="text-lg mb-4">Time Left: {timeLeft}s</p>
          <p className="text-lg mb-6">Tap the numbers in ascending order</p>
          <div className="grid grid-cols-4 gap-4">
            {numbers.map((num, index) => (
              <button
                key={index}
                className={`w-16 h-16 ${
                  tappedNumbers.includes(num)
                    ? "bg-gray-300 text-gray-500"
                    : "bg-white text-blue-600 hover:bg-blue-200"
                } shadow-md rounded-full text-lg font-bold transition`}
                onClick={() => handleClick(num)}
                disabled={tappedNumbers.includes(num)} // Disable already tapped numbers
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickTapNumbers;
