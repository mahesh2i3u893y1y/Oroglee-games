import { useState, useEffect } from "react";

// Helper function to shuffle the array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuickMathGame = () => {
  const [calculations, setCalculations] = useState([
    { id: 1, calculation: "3 + 4 =", answer: 7, revealed: false },
    { id: 2, calculation: "8 - 3 =", answer: 5, revealed: false },
    { id: 3, calculation: "5 + 1 =", answer: 6, revealed: false },
    { id: 4, calculation: "10 - 6 =", answer: 4, revealed: false },
    { id: 5, calculation: "6 + 4 =", answer: 10, revealed: false },
    { id: 6, calculation: "9 + 2 =", answer: 11, revealed: false },
    { id: 7, calculation: "7 + 5 =", answer: 12, revealed: false },
    { id: 8, calculation: "4 + 5 =", answer: 9, revealed: false },
    { id: 9, calculation: "11 - 3 =", answer: 8, revealed: false },
    { id: 10, calculation: "20 + 6 =", answer: 26, revealed: false },
    { id: 11, calculation: "18 + 10 =", answer: 28, revealed: false },
    { id: 12, calculation: "15 + 10 =", answer: 25, revealed: false },
    { id: 13, calculation: "17 + 3 =", answer: 20, revealed: false },
    { id: 14, calculation: "19 + 2 =", answer: 21, revealed: false },
    { id: 15, calculation: "12 + 6 =", answer: 18, revealed: false },
    { id: 16, calculation: "4 + 20 =", answer: 24, revealed: false },
    { id: 17, calculation: "11 + 6 =", answer: 17, revealed: false },
    { id: 18, calculation: "3 - 1 =", answer: 2, revealed: false },
    { id: 19, calculation: "10 + 5 =", answer: 15, revealed: false },
    { id: 20, calculation: "6 - 3 =", answer: 3, revealed: false },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledCalculations, setShuffledCalculations] = useState([]);

  // Shuffle the calculations array only once when the component mounts
  useEffect(() => {
    setShuffledCalculations(shuffleArray([...calculations]));
  }, []); // Empty dependency array ensures it runs only once

  // Function to handle answer click
  const handleAnswerClick = (selectedAnswer) => {
    const correctAnswer = calculations[currentQuestionIndex].answer;

    if (selectedAnswer === correctAnswer) {
      // Mark current calculation as revealed
      const updatedCalculations = [...calculations];
      updatedCalculations[currentQuestionIndex].revealed = true;
      setCalculations(updatedCalculations);

      // Move to next question if there are any left
      if (currentQuestionIndex < calculations.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-10">
      <h1 className="text-4xl font-bold mb-6">Suspense Image</h1>

      {/* Current Calculation */}
      <div className="mb-6 text-lg bg-pink-600 py-3 px-7 flex justify-center items-center rounded-lg">
        <p className="text-white font-semibold">{calculations[currentQuestionIndex].calculation}</p>
      </div>

      {/* Background Image with Answer Boxes Overlaid */}
      <div
        className="relative w-full h-96 bg-cover bg-center grid grid-cols-5 grid-rows-4 gap-0"
        style={{
          backgroundImage: `url('https://cdn.pixabay.com/photo/2023/07/01/18/21/water-8100724_1280.jpg')`, // Replace with your image
        }}
      >
        {shuffledCalculations.map((calc, index) => (
          <div
            key={calc.id}
            className={`w-full h-full ${
              calc.revealed ? "opacity-0" : "opacity-100"
            } bg-white border border-black flex items-center justify-center text-lg font-bold transition-all`}
            style={{
              gridColumn: `${(index % 5) + 1}`, // Distribute items in 5 columns
              gridRow: `${Math.floor(index / 5) + 1}`, // Distribute items in rows
              transition: "opacity 0.5s ease",
            }}
          >
            <button
              className="w-full h-full flex items-center justify-center text-lg font-bold bg-white opacity-100 hover:bg-gray-200 rounded-lg transition-all"
              onClick={() => handleAnswerClick(calc.answer)}
              disabled={calc.revealed}
            >
              {calc.answer}
            </button>
          </div>
        ))}
      </div>

      {calculations.every((calc) => calc.revealed) && (
        <div className="mt-6 text-xl font-semibold text-green-500">
          Congratulations! You have revealed the entire image!
        </div>
      )}
    </div>
  );
};

export default QuickMathGame;
