import  { useEffect, useState } from "react";
import { generateSudoku } from "./SudokoGame";

const ModerateSudoku = () => {
  const [puzzle, setPuzzle] = useState(null);

  useEffect(() => {
    const newPuzzle = generateSudoku(6, 20); // 6x6 grid with 20 clues
    setPuzzle(newPuzzle);
  }, []);

  if (!puzzle) {
    return <div className="text-lg font-semibold">Generating Moderate Puzzle...</div>;
  }

  return (
    <div className="grid grid-cols-6 gap-1 bg-gray-100 p-4 rounded-lg">
      {puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="text"
            defaultValue={cell !== 0 ? cell : ""}
            disabled={cell !== 0}
            className={`w-14 h-14 text-center border rounded ${
              cell !== 0 ? "bg-gray-300" : "bg-white"
            }`}
          />
        ))
      )}
    </div>
  );
};

export default ModerateSudoku;
