/* eslint-disable react/prop-types */
import { useState } from "react";

const NumberPatternCopy = ({correctAnswers,num1,num2,num3,num4}) => {
  const [answers, setAnswers] = useState(["", ["", ""], ["", ""], ["", ""]]); // Use arrays for all rows
  const [message, setMessage] = useState("");

  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedAnswers = [...answers];

    if (Array.isArray(updatedAnswers[rowIndex])) {
      // Update specific column for multi-column rows
      updatedAnswers[rowIndex][colIndex] = value.trim();
    } else {
      // Update single-column row
      updatedAnswers[rowIndex] = value.trim();
    }

    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const isCorrect = answers.every((row, index) => {
      if (Array.isArray(row)) {
        return row.every((col, colIndex) => col === correctAnswers[index][colIndex]);
      }
      return row === correctAnswers[index];
    });

    if (isCorrect) {
      setMessage("🎉 Congratulations! All your answers are correct! 🎉");
    } else {
      setMessage("❌ Some answers are incorrect. Try again! ❌");
    }
  };

  return (
    <div className="p-4 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Fill in the Missing Numbers!
      </h1>
      <div className="space-y-8">
        {/* Row 1 */}
        <div className="flex items-center justify-center gap-4">
          {num1.map((num, index) => (
            <div
              key={index}
              className="w-16 h-16 flex items-center justify-center bg-yellow-200 text-xl font-bold text-gray-700 rounded-full"
            >
              {num === "_" ? (
                <input
                  type="number"
                  className="w-12 bg-transparent text-center border border-gray-400 rounded"
                  value={answers[0]}
                  onChange={(e) => handleInputChange(0, null, e.target.value)}
                />
              ) : (
                num
              )}
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-center gap-4">
          {num2.map((num, index) => (
            <div
              key={index}
              className="w-16 h-16 flex items-center justify-center bg-green-200 text-xl font-bold text-gray-700 rounded-full"
            >
              {num === "_" ? (
                <input
                  type="number"
                  className="w-12 bg-transparent text-center border border-gray-400 rounded"
                  value={answers[1][index - 2] || ""}
                  onChange={(e) => handleInputChange(1, index - 2, e.target.value)}
                />
              ) : (
                num
              )}
            </div>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-center gap-4">
          {num3.map((num, index) => (
            <div
              key={index}
              className="w-16 h-16 flex items-center justify-center bg-blue-200 text-xl font-bold text-gray-700 rounded-full"
            >
              {num === "_" ? (
                <input
                  type="number"
                  className="w-12 bg-transparent text-center border border-gray-400 rounded"
                  value={answers[2][Math.floor(index / 2)] || ""}
                  onChange={(e) => handleInputChange(2, Math.floor(index / 2), e.target.value)}
                />
              ) : (
                num
              )}
            </div>
          ))}
        </div>

        {/* Row 4 */}
        <div className="flex items-center justify-center gap-4">
          {num4.map((num, index) => (
            <div
              key={index}
              className="w-16 h-16 flex items-center justify-center bg-red-200 text-xl font-bold text-gray-700 rounded-full"
            >
              {num === "_" ? (
                <input
                  type="number"
                  className="w-12 bg-transparent text-center border border-gray-400 rounded"
                  value={answers[3][index - 1] || ""}
                  onChange={(e) => handleInputChange(3, index - 1, e.target.value)}
                />
              ) : (
                num
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="mt-6 text-center text-lg font-bold">
          <p
            className={
              message.includes("Congratulations")
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default NumberPatternCopy;
