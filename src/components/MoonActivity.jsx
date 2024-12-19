import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import loose from "../assets/loose.gif";
import win from "../assets/win.gif";

const earthImg = "https://cdn.pixabay.com/photo/2017/05/13/23/23/electric-2310933_1280.jpg";
const moonImg = "https://cdn.pixabay.com/photo/2016/11/29/13/14/full-moon-1869760_1280.jpg";

const MathPuzzleActivity = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const correctAnswers = [15, 9, 12, 9];

  const handleInputChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value.trim();
    setAnswers(updatedAnswers);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = () => {
    const correct = answers.every((answer, index) => parseInt(answer) === correctAnswers[index]);

    if (correct) {
      setMessage("🎉 Congratulations! All your answers are correct! 🎉");
      setIsCorrect(true);
    } else {
      setMessage("❌ Some answers are incorrect. Please try again! ❌");
      setIsCorrect(false);
    }
    setShowPopup(true); // Show pop-up for both correct and incorrect answers
  };

  const handleRetry = () => {
    setAnswers(["", "", "", ""]);
    setMessage("");
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
    if (isCorrect) {
      navigate("/home"); // Navigate only on correct answers
    }
  };

  return (
    <div className="p-4 bg-blue-50 min-h-screen flex flex-col justify-center items-center">
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
            onKeyDown={(e) => handleKeyDown(e, 0)}
              ref={(el) => (inputRefs.current[0] = el)}
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
            value={answers[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
              ref={(el) => (inputRefs.current[1] = el)}
          />
        </div>

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
            value={answers[2]}
            onChange={(e) => handleInputChange(2, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 2)}
              ref={(el) => (inputRefs.current[2] = el)}
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
            onKeyDown={(e) => handleKeyDown(e, 3)}
              ref={(el) => (inputRefs.current[3] = el)}
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

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <img
              src={isCorrect ? win : loose}
              alt={isCorrect ? "Win" : "Lose"}
              className="w-48 mx-auto mb-4"
            />
            <h2
              className={`text-xl font-bold mb-4 ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </h2>
            <button
              onClick={isCorrect ? handleClose : handleRetry}
              className={`mt-4 px-6 py-3 font-bold rounded ${
                isCorrect
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              {isCorrect ? "Close" : "Retry"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathPuzzleActivity;


