import { useState, useRef, useEffect } from "react";

const SpotTheDifferenceGame = () => {
  // Define the coordinates of the differences
  const differences = [
    { id: 1, x: 220, y: 95, radius: 20 }, // Difference 1
    { id: 2, x: 80, y: 300, radius: 18 }, // Difference 2
    { id: 3, x: 450, y: 200, radius: 18 }, // Difference 3
    { id: 4, x: 154, y: 55, radius: 20 },  // Difference 4
    { id: 5, x: 490, y: 280, radius: 18 }, // Difference 5
    { id: 6, x: 110, y: 320, radius: 12 }, 
    { id: 7, x: 478, y: 72, radius: 20 }
  ];

  const [foundDifferences, setFoundDifferences] = useState([]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const canvasRef = useRef(null);

  // UseEffect to draw found differences (with green border)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      // Draw green border around found differences
      differences.forEach((difference) => {
        if (foundDifferences.includes(difference.id)) {
          ctx.beginPath();
          ctx.arc(difference.x, difference.y, difference.radius, 0, Math.PI * 2);
          ctx.lineWidth = 3; // Border width
          ctx.strokeStyle = "green"; // Green border
          ctx.stroke(); // Draw only the border
        }
      });
    }
  }, [foundDifferences]);

  // Handle click events to check if the click is near a difference
  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      differences.forEach((difference) => {
        const distance = Math.sqrt(
          (x - difference.x) ** 2 + (y - difference.y) ** 2
        );
        if (distance <= difference.radius && !foundDifferences.includes(difference.id)) {
          // Mark the difference as found and increase score
          setFoundDifferences((prev) => [...prev, difference.id]);
          setScore((prevScore) => prevScore + 1);
          setMessage(`You found a difference!`);
        }
      });
    }
  };

  // Create an array for visualizing the differences with circles
  const renderScoreCircles = () => {
    return differences.map((difference) => {
      return (
        <div
          key={difference.id}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${foundDifferences.includes(difference.id) ? 'bg-green-500' : 'bg-white'}`}
        >
          {foundDifferences.includes(difference.id) && (
            <span className="text-white">✔</span> // Checkmark when found
          )}
        </div>
      );
    });
  };

  // Reset the game
  const resetGame = () => {
    setFoundDifferences([]);
    setScore(0);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Spot the Differences!</h1>

      <div className="relative">
        <img
          src="https://www.champak.in/wp-content/uploads/2019/04/8thapril20191.png"
          alt="Image with differences"
          className="w-4/5 h-4/5 object-cover"
        />
        <canvas
          ref={canvasRef}
          width={768}
          height={768}
          className="absolute top-0 left-0"
          onClick={handleClick}
        />
      </div>

      <p className="mt-4 text-lg">{message}</p>

      {/* Render the circles with checkmarks */}
      <div className="flex space-x-4 mt-4">
        {renderScoreCircles()}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="mt-4 px-6 py-2 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition"
      >
        Reset Game
      </button>

      <div className="mt-6 text-xl">
        <p className="text-lg">Differences found: {score}/{differences.length}</p>
      </div>
    </div>
  );
};

export default SpotTheDifferenceGame;
