import { useState } from "react";

// Helper functions to generate the Sudoku board
const generateEmptyBoard = (size) => Array(size).fill().map(() => Array(size).fill(0));

const fillBoard = (board, size) => {
  const isSafe = (board, row, col, num) => {
    const regionSize = Math.sqrt(size);

    // Row and column checks
    for (let x = 0; x < size; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }

    // Region check
    const startRow = Math.floor(row / regionSize) * regionSize;
    const startCol = Math.floor(col / regionSize) * regionSize;
    for (let i = 0; i < regionSize; i++) {
      for (let j = 0; j < regionSize; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }

    return true;
  };

  const solve = (board) => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= size; num++) {
            if (isSafe(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solve(board);
  return board;
};

const removeNumbers = (board, size, blanks) => {
  const removed = board.map((row) => [...row]);
  let count = blanks;
  while (count > 0) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (removed[row][col] !== 0) {
      removed[row][col] = 0;
      count--;
    }
  }
  return removed;
};

const generateBoard = (size, blanks) => {
  const board = generateEmptyBoard(size);
  const solvedBoard = fillBoard(board, size);
  return removeNumbers(solvedBoard, size, blanks);
};

const EasySudoku = () => {
  const size = 4;
  const blanks = 6; // Number of blanks to create in the puzzle

  const [originalBoard] = useState(() => generateBoard(size, blanks));
  const [board, setBoard] = useState(originalBoard);
  const [isSolved, setIsSolved] = useState(false);

  const handleInputChange = (row, col, value) => {
    if (originalBoard[row][col] !== 0) return; // Prevent changes to original numbers
    const parsedValue = parseInt(value, 10);

    const newBoard = board.map((r, i) =>
      r.map((cell, j) =>
        i === row && j === col ? (isNaN(parsedValue) ? 0 : parsedValue) : cell
      )
    );
    setBoard(newBoard);
  };

  const checkSolution = () => {
    const isValid = (row, col, num) => {
      const regionSize = Math.sqrt(size);

      for (let x = 0; x < size; x++) {
        if ((board[row][x] === num && x !== col) || (board[x][col] === num && x !== row)) {
          return false;
        }
      }

      const startRow = Math.floor(row / regionSize) * regionSize;
      const startCol = Math.floor(col / regionSize) * regionSize;
      for (let i = 0; i < regionSize; i++) {
        for (let j = 0; j < regionSize; j++) {
          const currentRow = startRow + i;
          const currentCol = startCol + j;
          if (
            board[currentRow][currentCol] === num &&
            (currentRow !== row || currentCol !== col)
          ) {
            return false;
          }
        }
      }
      return true;
    };

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const value = board[row][col];
        if (value === 0 || !isValid(row, col, value)) {
          alert("Incorrect solution. Try again!");
          return;
        }
      }
    }
    setIsSolved(true);
    alert("Congratulations! You solved the puzzle!");
  };

  const resetBoard = () => {
    setBoard(originalBoard);
    setIsSolved(false);
  };

  const subgridColors = ["#FFDDC1", "#FFABAB", "#FFC3A0", "#FF677D"];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">4x4 Sudoku</h1>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${size}, 60px)`,
          gridTemplateRows: `repeat(${size}, 60px)`
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const subgridIndex =
              Math.floor(rowIndex / 2) * 2 + Math.floor(colIndex / 2);

            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                value={value === 0 ? "" : value}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, e.target.value)
                }
                className={`w-16 h-16 text-center border bg-white text-lg font-bold shadow-md focus:outline-none`}
                style={{ backgroundColor: subgridColors[subgridIndex] }}
              />
            );
          })
        )}
      </div>
      <div className="mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={checkSolution}
        >
          Submit
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={resetBoard}
        >
          Reset
        </button>
      </div>
      {isSolved && (
        <div className="mt-4 text-green-600 font-bold text-lg">
          🎉 You solved the puzzle 🎉
        </div>
      )}
    </div>
  );
};

export default EasySudoku;