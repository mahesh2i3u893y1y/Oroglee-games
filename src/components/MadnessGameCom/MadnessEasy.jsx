import { useState } from "react";
import Confetti from "react-confetti";

const easyGrid = [
  [null, "+", 1, "+", null, 9],
  ["+", "", "+", "", "+", ""],
  [null, "+", null, "+", 8, 18],
  [9, "+", null, "+", null, 18],
  [18, "", 9, "", 18, ""],
];

const MadenessEasy = () => {
  const [grid, setGrid] = useState(JSON.parse(JSON.stringify(easyGrid))); // Deep clone the grid to prevent state reuse
  const [showMessage, setShowMessage] = useState({ success: false, error: false });

  const isValid = () => {
    let isCorrect = true;

    // Validate rows
    for (let i = 0; i < grid.length - 1; i++) {
      const expectedRowSum = grid[i][5]; // Last column of the row
      if (typeof expectedRowSum !== "number") continue;

      let rowSum = 0;
      for (let j = 0; j < grid[i].length - 1; j++) {
        const cell = grid[i][j];
        if (typeof cell === "number") {
          rowSum += cell;
        }
      }

      if (rowSum !== expectedRowSum) {
        isCorrect = false;
      }
    }

    // Validate columns
    for (let j = 0; j < grid[0].length - 1; j++) {
      const expectedColSum = grid[4][j]; // Last row of the column
      if (typeof expectedColSum !== "number") continue;

      let colSum = 0;
      for (let i = 0; i < grid.length - 1; i++) {
        const cell = grid[i][j];
        if (typeof cell === "number") {
          colSum += cell;
        }
      }

      if (colSum !== expectedColSum) {
        isCorrect = false;
      }
    }

    if (isCorrect) {
      setShowMessage({ success: true, error: false });
    } else {
      setShowMessage({ success: false, error: true });
    }
  };

  const handleInputChange = (row, col, value) => {
    const number = value === "" ? null : parseInt(value, 10);
    if (isNaN(number) && value !== "") return;

    setGrid((prevGrid) =>
      prevGrid.map((r, i) =>
        r.map((cell, j) =>
          i === row && j === col ? (isNaN(number) ? null : number) : cell
        )
      )
    );
  };

  const restartGame = () => {
    setGrid(JSON.parse(JSON.stringify(easyGrid)));
    setShowMessage({ success: false, error: false });
  };

  return (
    <div className="flex flex-col items-center relative">
      <h1 className="text-2xl font-bold mb-4">Classroom Madness Puzzle - Easy Level</h1>
      <div className="grid grid-cols-6 gap-1">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`h-12 w-12 flex items-center justify-center border text-xl font-bold ${
                (colIndex === 5 || rowIndex === 4 || cell === "=") && "bg-gray-200"
              } ${cell === "+" && "bg-blue-200"}`}
            >
              {cell === null || typeof cell === "number" ? (
                <input
                  type="text"
                  value={cell !== null ? cell : ""}
                  className="w-full h-full text-center border-none outline-none"
                  onChange={(e) =>
                    handleInputChange(rowIndex, colIndex, e.target.value)
                  }
                />
              ) : (
                cell
              )}
            </div>
          ))
        )}
      </div>
      <button
        className="mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded shadow-md hover:bg-green-600"
        onClick={isValid}
      >
        Check Solution
      </button>

      {/* Success Popup */}
      {showMessage.success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center shadow-lg relative">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <Confetti
                width={300}
                height={300}
                recycle={false}
                numberOfPieces={150}
              />
            </div>
            <h2 className="text-3xl font-bold text-green-500 mb-4">Congratulations!</h2>
            <p className="text-lg mb-6">You have solved the puzzle! 🎉</p>
            <button
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
              onClick={restartGame}
            >
              Restart
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showMessage.error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center shadow-lg relative">
            <h2 className="text-3xl font-bold text-red-500 mb-4">Try Again</h2>
            <p className="text-lg mb-6">Some rows or columns are incorrect. 🙃</p>
            <button
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
              onClick={() => setShowMessage({ success: false, error: false })}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MadenessEasy;
