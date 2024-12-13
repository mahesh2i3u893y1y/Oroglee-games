import { useState } from "react";

// Helper functions to generate Sudoku board
const generateEmptyBoard = () => Array(6).fill().map(() => Array(6).fill(0));

const fillBoard = (board) => {
  const isSafe = (board, row, col, num) => {
    for (let x = 0; x < 6; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }

    const startRow = Math.floor(row / 2) * 2;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  };

  const solve = (board) => {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 6; num++) {
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

const removeNumbers = (board, blanks) => {
  const removed = board.map((row) => [...row]);
  let count = blanks;
  while (count > 0) {
    const row = Math.floor(Math.random() * 6);
    const col = Math.floor(Math.random() * 6);
    if (removed[row][col] !== 0) {
      removed[row][col] = 0;
      count--;
    }
  }
  return removed;
};

const generateBoard = (blanks) => {
  const board = generateEmptyBoard();
  const solvedBoard = fillBoard(board);
  return { solvedBoard, puzzleBoard: removeNumbers(solvedBoard, blanks) };
};

const MediumSudoku = () => {
  const [game, setGame] = useState(() => generateBoard(12));
  const [board, setBoard] = useState(game.puzzleBoard);
  const [isValid, setIsValid] = useState(null);

  const handleInputChange = (row, col, value) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 6) return;

    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? parsedValue : cell))
    );
    setBoard(newBoard);
  };

  const validateBoard = () => {
    const { solvedBoard } = game;
    const isCorrect = board.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solvedBoard[rowIndex][colIndex])
    );
    setIsValid(isCorrect);
  };

  const resetGame = () => {
    const newGame = generateBoard(12);
    setGame(newGame);
    setBoard(newGame.puzzleBoard);
    setIsValid(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">6x6 Sudoku</h1>
      <div className="grid grid-cols-6 gap-1 bg-white p-4 rounded-lg shadow-md">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              value={value === 0 ? "" : value}
              onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
              className={`w-12 h-12 text-center border-2 text-lg font-semibold ${
                game.puzzleBoard[rowIndex][colIndex] !== 0
                  ? "bg-gray-300 text-black"
                  : "bg-white text-blue-700"
              }`}
              readOnly={game.puzzleBoard[rowIndex][colIndex] !== 0}
            />
          ))
        )}
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          className="px-6 py-2 bg-green-500 text-white font-bold rounded shadow-md hover:bg-green-600"
          onClick={validateBoard}
        >
          Submit
        </button>
        <button
          className="px-6 py-2 bg-red-500 text-white font-bold rounded shadow-md hover:bg-red-600"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
      {isValid !== null && (
        <div
          className={`mt-4 text-lg font-bold ${
            isValid ? "text-green-600" : "text-red-600"
          }`}
        >
          {isValid ? "🎉 Correct! You've solved the Sudoku!" : "❌ Incorrect! Try again!"}
        </div>
      )}
    </div>
  );
};

export default MediumSudoku;