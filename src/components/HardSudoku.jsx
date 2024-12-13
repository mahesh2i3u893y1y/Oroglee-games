import  { useEffect, useState } from "react";
import { generateSudoku } from './SudokoGame'

const HardSudoku = () => {
  const [puzzle, setPuzzle] = useState(null);

  useEffect(() => {
    const newPuzzle = generateSudoku(9, 30); // 9x9 grid with 30 clues
    setPuzzle(newPuzzle);
  }, []);

  if (!puzzle) {
    return <div className="text-lg font-semibold">Generating Hard Puzzle...</div>;
  }

  return (
    <div className="grid grid-cols-9 gap-1 bg-gray-100 p-4 rounded-lg">
      {puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="text"
            defaultValue={cell !== 0 ? cell : ""}
            disabled={cell !== 0}
            className={`w-10 h-10 text-center border rounded ${
              cell !== 0 ? "bg-gray-300" : "bg-white"
            }`}
          />
        ))
      )}
    </div>
  );
};

export default HardSudoku;
