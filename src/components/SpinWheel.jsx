import { useState } from "react";
import { Wheel } from "react-custom-roulette";

const SpinWheel = () => {
  const numbers = [
    { option: "1" },
    { option: "2" },
    { option: "3" },
    { option: "4" },
    { option: "5" },
    { option: "6" },
    { option: "7" },
    { option: "8" },
    { option: "9" },
    { option: "10" },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [targetNumber] = useState(Math.floor(Math.random() * numbers.length));
  const [message, setMessage] = useState("");

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * numbers.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    if (prizeNumber === targetNumber) {
      setMessage("🎉 Congratulations! You hit the target number!");
    } else {
      setMessage("❌ Oops! Try again!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-5 min-h-screen">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
           Spin Game
        </h1>
        <p className="text-center text-lg sm:text-xl mb-6">
          Target Number: <strong>{numbers[targetNumber].option}</strong>
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-4xl">
        {/* Wheel Section */}
        <div className="flex flex-col items-center">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={numbers}
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

        {/* Controls Section */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleSpinClick}
            disabled={mustSpin}
            className={`px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 ${
              mustSpin ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {mustSpin ? "Spinning..." : "Spin"}
          </button>
          {message && (
            <p className="text-lg text-center mt-4 text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
