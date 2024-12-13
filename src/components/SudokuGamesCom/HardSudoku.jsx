import { useState } from "react";

// Helper functions to generate the Sudoku board
const generateEmptyBoard = () => Array(9).fill().map(() => Array(9).fill(0));

const fillBoard = (board) => {
  const isSafe = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  };

  const solve = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
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

const removeNumbers = (board, difficulty) => {
  const removed = board.map((row) => [...row]);
  let count = difficulty;
  while (count > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (removed[row][col] !== 0) {
      removed[row][col] = 0;
      count--;
    }
  }
  return removed;
};

const generateBoard = (difficulty) => {
  const board = generateEmptyBoard();
  const solvedBoard = fillBoard(board);
  return removeNumbers(solvedBoard, difficulty);
};

const difficulties = {
  easy: 30,
  moderate: 40,
  difficult: 50,
};

const HardSudoku = () => {
  const [level, ] = useState("easy");
  const [board, setBoard] = useState(generateBoard(difficulties.easy));
  const [wrongCells, setWrongCells] = useState([]);

  const handleInputChange = (row, col, value) => {
    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? Number(value) || 0 : cell))
    );
    setBoard(newBoard);
  };

  const validateBoard = () => {
    const isSafe = (row, col, num) => {
      for (let i = 0; i < 9; i++) {
        if (i !== col && board[row][i] === num) return false;
        if (i !== row && board[i][col] === num) return false;
      }
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[startRow + i][startCol + j] === num && (startRow + i !== row || startCol + j !== col)) {
            return false;
          }
        }
      }
      return true;
    };

    const wrongCells = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== 0 && !isSafe(row, col, board[row][col])) {
          wrongCells.push({ row, col });
        }
      }
    }

    setWrongCells(wrongCells);
    return wrongCells.length === 0;
  };

  const handleSubmit = () => {
    if (validateBoard()) {
      alert("Congratulations! You've solved the Sudoku!");
    } else {
      alert("Some cells are incorrect. Please try again.");
    }
  };

  const handleReset = () => {
    setBoard(generateBoard(difficulties[level]));
    setWrongCells([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Sudoku - {level.toUpperCase()} Level</h1>
      <div className="grid grid-cols-9 gap-1 bg-white p-4 rounded shadow-lg">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              value={value === 0 ? "" : value}
              onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
              className={`h-12 w-12 text-center border text-lg font-bold rounded shadow focus:outline-none
                ${wrongCells.some((cell) => cell.row === rowIndex && cell.col === colIndex) ? "bg-red-200" : "bg-gray-100"}`}
              disabled={value !== 0 && board[rowIndex][colIndex] !== 0}
            />
          ))
        )}
      </div>
      <div className="mt-4 space-x-4">
        <button
          className="px-6 py-2 bg-green-500 text-white font-bold rounded shadow-md hover:bg-green-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="px-6 py-2 bg-red-500 text-white font-bold rounded shadow-md hover:bg-red-600"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default HardSudoku;
