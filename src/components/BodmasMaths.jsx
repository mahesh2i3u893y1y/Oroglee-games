import  { useState } from "react";

const CircularRocketPath = () => {
  const rocketPaths = {
    A: ["3*4", "12-7", "9+8", "2*3"],
    B: ["6*6", "24%6", "9-5", "17-8"],
    C: ["8+5", "18%3", "17-6", "5*4"],
  };

  const calculateTotal = (path) =>
    path.reduce((sum, expression) => sum + Function(`return ${expression}`)(), 0);

  const rocketTotals = {
    A: calculateTotal(rocketPaths.A),
    B: calculateTotal(rocketPaths.B),
    C: calculateTotal(rocketPaths.C),
  };

  const correctRocket = Object.keys(rocketTotals).reduce((a, b) =>
    rocketTotals[a] > rocketTotals[b] ? a : b
  );

  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.toUpperCase() === correctRocket) {
      setFeedback("🎉 Congratulations! You found the correct rocket!");
    } else {
      setFeedback("🚀 Better luck next time! Try again.");
    }
  };

 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Rocket Math Activity</h1>
      <svg width="400" height="400" viewBox="0 0 400 400" className="relative">
        {/* Circular Paths */}
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="lightgray"
          strokeWidth="2"
        />
        {/* Rocket A */}
        <text x="200" y="30" textAnchor="middle" fill="blue" fontSize="16">
          Rocket A
        </text>
        {/* Rocket B */}
        <text x="370" y="200" textAnchor="middle" fill="red" fontSize="16">
          Rocket B
        </text>
        {/* Rocket C */}
        <text x="200" y="370" textAnchor="middle" fill="green" fontSize="16">
          Rocket C
        </text>
        {/* Earth */}
        <circle cx="200" cy="200" r="30" fill="blue" />
        <text x="200" y="205" textAnchor="middle" fill="white" fontSize="14">
          Earth
        </text>

        {/* Rocket A Operations */}
        {rocketPaths.A.map((operation, index) => {
          const angle = (-90 + index * 45) * (Math.PI / 180); // Adjust angle for positions
          const x = 200 + 100 * Math.cos(angle);
          const y = 200 + 100 * Math.sin(angle);
          return (
            <text
              key={operation}
              x={x}
              y={y}
              textAnchor="middle"
              fill="blue"
              fontSize="14"
              className="font-semibold"
            >
              {operation}
            </text>
          );
        })}

        {/* Rocket B Operations */}
        {rocketPaths.B.map((operation, index) => {
          const angle = (30 + index * 45) * (Math.PI / 180); // Adjust angle for positions
          const x = 200 + 100 * Math.cos(angle);
          const y = 200 + 100 * Math.sin(angle);
          return (
            <text
              key={operation}
              x={x}
              y={y}
              textAnchor="middle"
              fill="red"
              fontSize="14"
              className="font-semibold"
            >
              {operation}
            </text>
          );
        })}

        {/* Rocket C Operations */}
        {rocketPaths.C.map((operation, index) => {
          const angle = (150 + index * 45) * (Math.PI / 180); // Adjust angle for positions
          const x = 200 + 100 * Math.cos(angle);
          const y = 200 + 100 * Math.sin(angle);
          return (
            <text
              key={operation}
              x={x}
              y={y}
              textAnchor="middle"
              fill="green"
              fontSize="14"
              className="font-semibold"
            >
              {operation}
            </text>
          );
        })}
      </svg>

      {/* Input Section */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col items-center gap-4"
      >
        <label className="text-lg font-medium text-gray-700">
          Which rocket has the highest total? (A, B, or C)
        </label>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 text-center"
          placeholder="Enter A, B, or C"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* Feedback Message */}
      {feedback && (
        <p
          className={`mt-4 text-lg font-medium ${
            feedback.includes("Congratulations")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
};

export default CircularRocketPath;
