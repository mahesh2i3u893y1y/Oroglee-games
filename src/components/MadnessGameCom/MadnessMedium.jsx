import { useState } from "react";

const mediumGrid = [
  [null, "+", 1, "+", null, 9],
  ["+", "", "+", "", "+", ""],
  [null, "+", null, "+", 8, 18],
  ["+", "", "+", "", "+", ""],
  [9, "+", null, "+", null, 18],
  [18, "", 9, "", 18, ""],
];

const MadnessMedium = () => {
  const [grid, setGrid] = useState(mediumGrid);

  const isValid = () => {
    let isCorrect = true;

    // Validate rows
    for (let i = 0; i < grid.length - 1; i += 2) {
      const expectedRowSum = grid[i][5]; // Last column of the row
      let rowSum = 0;

      for (let j = 0; j < grid[i].length - 1; j += 2) {
        const cell = grid[i][j];
        if (typeof cell === "number") {
          rowSum += cell;
        } else {
          isCorrect = false; // A cell is null or not filled properly
        }
      }

      if (rowSum !== expectedRowSum) {
        isCorrect = false; // Row sum does not match expected value
      }
    }

    // Validate columns
    for (let j = 0; j < grid[0].length - 1; j += 2) {
      const expectedColSum = grid[5][j]; // Last row of the column
      let colSum = 0;

      for (let i = 0; i < grid.length - 1; i += 2) {
        const cell = grid[i][j];
        if (typeof cell === "number") {
          colSum += cell;
        } else {
          isCorrect = false; // A cell is null or not filled properly
        }
      }

      if (colSum !== expectedColSum) {
        isCorrect = false; // Column sum does not match expected value
      }
    }

    if (isCorrect) {
      alert("Congratulations! You've solved the puzzle! 🎉");
    } else {
      alert("Some rows or columns are incorrect. Try again! 🙃");
    }
  };

  const handleInputChange = (row, col, value) => {
    const number = value === "" ? null : parseInt(value, 10);
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) =>
        i === row && j === col ? (isNaN(number) ? null : number) : cell
      )
    );
    setGrid(newGrid);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Classroom Madness Puzzle</h1>
      <div className="grid grid-cols-6 gap-1">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`h-12 w-12 flex items-center justify-center border text-xl font-bold ${
                (colIndex === 5 || rowIndex === 5 || cell === "=") && "bg-gray-200"
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
      <button
        className="mt-4 px-6 py-2 bg-red-500 text-white font-bold rounded shadow-md hover:bg-red-600"
        onClick={() => setGrid(mediumGrid)}
      >
        Reset Puzzle
      </button>
    </div>
  );
};

export default MadnessMedium;
