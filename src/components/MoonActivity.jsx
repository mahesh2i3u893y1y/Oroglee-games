import { useState } from "react";


const earthImg = "https://cdn.pixabay.com/photo/2017/05/13/23/23/electric-2310933_1280.jpg"
const moonImg = "https://cdn.pixabay.com/photo/2016/11/29/13/14/full-moon-1869760_1280.jpg"
const MathPuzzleActivity = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");

  const correctAnswers = [15, 12, 9, 9];

  const handleInputChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value.trim();
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const isCorrect = answers.every((answer, index) => parseInt(answer) === correctAnswers[index]);

    if (isCorrect) {
      setMessage("🎉 Congratulations! All your answers are correct! 🎉");
    } else {
      setMessage("❌ Some answers are incorrect. Please try again! ❌");
    }
  };

  const handleRetry = () => {
    setAnswers(["", "", "", ""]);
    setMessage("");
  };

  return (
    <div className="p-4 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Math Puzzle Activity</h1>

      {/* Hints */}
      <div className="space-y-8">
        <div className="text-center font-medium mb-6">
          <div className="flex justify-center items-center gap-4">
            <img src={moonImg} alt="Moon" className="w-16 h-16" />
            <span>+</span>
            <img src={moonImg} alt="Moon" className="w-16 h-16" />
            <span>+</span>
            <img src={moonImg} alt="Moon" className="w-16 h-16" />
            <span>= 18</span>
          </div>
        </div>
        <div className="text-center font-medium">
          <div className="flex justify-center items-center gap-4">
            <img src={earthImg} alt="Earth" className="w-16 h-16" />
            <span>+</span>
            <img src={earthImg} alt="Earth" className="w-16 h-16" />
            <span>+</span>
            <img src={earthImg} alt="Earth" className="w-16 h-16" />
            <span>= 9</span>
          </div>
        </div>
      </div>

      {/* Challenges */}
      <div className="mt-8 space-y-6">
        {/* Row 1 */}
        <div className="flex items-center justify-center gap-4">
          <img src={moonImg} alt="Moon" className="w-16 h-16" />
          <span>+</span>
          <img src={earthImg} alt="Earth" className="w-16 h-16" />
          <span>+</span>
          <img src={moonImg} alt="Moon" className="w-16 h-16" />
          <span>=</span>
          <input
            type="number"
            className="w-16 p-2 text-center border border-gray-400 rounded"
            value={answers[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
          />
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-center gap-4">
          <img src={earthImg} alt="Earth" className="w-16 h-16" />
          <span>+</span>
          <img src={moonImg} alt="Moon" className="w-16 h-16" />
          <span>+</span>
          <img src={earthImg} alt="Earth" className="w-16 h-16" />
          <span>=</span>
          <input
            type="number"
            className="w-16 p-2 text-center border border-gray-400 rounded"
            value={answers[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
          />
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-center gap-4">
          <img src={moonImg} alt="Moon" className="w-16 h-16" />
          <span>-</span>
          <img src={earthImg} alt="Earth" className="w-16 h-16" />
          <span>+</span>
          <img src={moonImg} alt="Moon" className="w-16 h-16" />
          <span>=</span>
          <input
            type="number"
            className="w-16 p-2 text-center border border-gray-400 rounded"
            value={answers[2]}
            onChange={(e) => handleInputChange(2, e.target.value)}
          />
        </div>

        {/* Row 4 */}
        <div className="flex items-center justify-center gap-4">
          <img src={moonImg} alt="Moon" className="w-16 h-16" />
          <span>+</span>
          <img src={moonImg} alt="Moon" className="w-16 h-16" />
          <span>-</span>
          <img src={earthImg} alt="Earth" className="w-16 h-16" />
          <span>=</span>
          <input
            type="number"
            className="w-16 p-2 text-center border border-gray-400 rounded"
            value={answers[3]}
            onChange={(e) => handleInputChange(3, e.target.value)}
          />
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

      {/* Message and Retry */}
      {message && (
        <div className="mt-6 text-center text-lg font-bold">
          <p className={message.includes("Congratulations") ? "text-green-600" : "text-red-600"}>
            {message}
          </p>
          {!message.includes("Congratulations") && (
            <button
              onClick={handleRetry}
              className="mt-4 px-6 py-3 bg-gray-500 text-white font-bold rounded hover:bg-gray-600"
            >
              Retry
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MathPuzzleActivity;
