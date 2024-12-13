import { useState } from "react";

const easyGrid = [
  [null, "+", 1, "+", null, 9],
  ["+", "", "+", "", "+", ""],
  [null, "+", null, "+", 8, 18],
  [9, "+", null, "+", null, 18],
  [18, "", 9, "", 18, ""],
];

const MadenessEasy = () => {
  const [grid, setGrid] = useState(JSON.parse(JSON.stringify(easyGrid))); // Deep clone the grid to prevent state reuse

  const isValid = () => {
    let isCorrect = true;

    // Validate rows
    for (let i = 0; i < grid.length - 1; i++) {
      const expectedRowSum = grid[i][5]; // Last column of the row
      if (typeof expectedRowSum !== "number") continue; // Skip validation for non-numeric cells

      let rowSum = 0;
      for (let j = 0; j < grid[i].length - 1; j++) {
        const cell = grid[i][j];
        if (typeof cell === "number") {
          rowSum += cell;
        }
      }

      console.log(`Row ${i} sum: ${rowSum}, Expected: ${expectedRowSum}`);
      if (rowSum !== expectedRowSum) {
        isCorrect = false;
      }
    }

    // Validate columns
    for (let j = 0; j < grid[0].length - 1; j++) {
      const expectedColSum = grid[4][j]; // Last row of the column
      if (typeof expectedColSum !== "number") continue; // Skip validation for non-numeric cells

      let colSum = 0;
      for (let i = 0; i < grid.length - 1; i++) {
        const cell = grid[i][j];
        if (typeof cell === "number") {
          colSum += cell;
        }
      }

      console.log(`Column ${j} sum: ${colSum}, Expected: ${expectedColSum}`);
      if (colSum !== expectedColSum) {
        isCorrect = false;
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
    if (isNaN(number) && value !== "") return; // Prevent non-numeric values

    console.log(`Updating grid at [${row}, ${col}] to:`, number); // Debug log
    setGrid((prevGrid) =>
      prevGrid.map((r, i) =>
        r.map((cell, j) =>
          i === row && j === col ? (isNaN(number) ? null : number) : cell
        )
      )
    );
  };

  return (
    <div className="flex flex-col items-center">
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
      <button
        className="mt-4 px-6 py-2 bg-red-500 text-white font-bold rounded shadow-md hover:bg-red-600"
        onClick={() => setGrid(JSON.parse(JSON.stringify(easyGrid)))}
      >
        Reset Puzzle
      </button>
    </div>
  );
};
export default MadenessEasy;
