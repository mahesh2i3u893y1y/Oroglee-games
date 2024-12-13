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
  const removed = board.map(row => [...row]);
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

// Difficulty settings
const difficulties = {
  easy: 30, // Less blanks
  moderate: 40, // Moderate blanks
  difficult: 50, // More blanks
};

const boxColors = [
  "#FFDDC1", "#FFABAB", "#FFC3A0", // Colors for the first row of boxes
  "#FF677D", "#D4A5A5", "#c1bad9", // Colors for the second row of boxes
  "#31A2AC", "#61C0BF", "#bf8d6b", // Colors for the third row of boxes
];

const Sudoku = () => {
  const [level, setLevel] = useState("easy");
  const [board, setBoard] = useState(generateBoard(difficulties.easy));
  const [selectedCell, setSelectedCell] = useState(null);
  const [wrongCells, setWrongCells] = useState([]);

  const isValidNumber = (row, col, number) => {
    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === number) return false;
    }
    for (let i = 0; i < 9; i++) {
      if (i !== row && board[i][col] === number) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const subRow = startRow + i;
        const subCol = startCol + j;
        if ((subRow !== row || subCol !== col) && board[subRow][subCol] === number) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleNumberInput = (number) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? number : cell))
    );

    // Check if the entered number is valid
    if (!isValidNumber(row, col, number)) {
      // If the number is invalid, add the cell to the wrongCells state for animation
      setWrongCells((prev) => [...prev, { row, col }]);
    } else {
      // If the number is valid, clear it from wrongCells
      setWrongCells((prev) => prev.filter((cell) => cell.row !== row || cell.col !== col));
    }

    setBoard(newBoard);
    setSelectedCell(null);
  };

  const getSubgridColor = (row, col) => {
    const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3); // Calculate the subgrid index
    return boxColors[boxIndex];
  };

  const nextLevel = () => {
    const nextLevels = {
      easy: "moderate",
      moderate: "difficult",
      difficult: null,
    };
    const newLevel = nextLevels[level];
    if (newLevel) {
      setLevel(newLevel);
      setBoard(generateBoard(difficulties[newLevel]));
    } else {
      alert("Congratulations! You've completed all levels! 🎉");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50">
      <h1 className="text-3xl font-bold mb-4">Sudoku - {level.toUpperCase()} Level</h1>
      <div className="grid grid-cols-9 gap-1 bg-emerald-50 p-2 rounded-lg shadow-lg">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const isSelected =
              selectedCell &&
              selectedCell.row === rowIndex &&
              selectedCell.col === colIndex;

            // Check if this cell is in the wrongCells array
            const isWrong = wrongCells.some(
              (cell) => cell.row === rowIndex && cell.col === colIndex
            );

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`h-12 w-12 flex items-center justify-center border rounded-lg border-gray-500 text-xl font-bold cursor-pointer
                ${isWrong ? "bg-red-500 text-white" : ""} 
                ${value === 0 ? "bg-white" : "bg-blue-100 text-blue-900"} 
                ${isSelected ? "bg-yellow-300" : ""}`}
                style={{ backgroundColor: getSubgridColor(rowIndex, colIndex) }} // Apply the background color for each subgrid
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {value !== 0 ? value : ""}
              </div>
            );
          })
        )}
      </div>
      <div className="flex mt-4 space-x-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="h-12 w-12 rounded-full bg-purple-500 text-white font-bold text-xl shadow-md hover:bg-blue-600"
            onClick={() => handleNumberInput(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <button
        className="mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded shadow-md hover:bg-green-600"
        onClick={() => {
          const allValid = board.every((row, rowIndex) =>
            row.every((_, colIndex) => isValidNumber(rowIndex, colIndex, board[rowIndex][colIndex]))
          );
          if (allValid) {
            alert("Great job! The board is valid! 🎉");
            nextLevel();
          } else {
            alert("Some numbers are incorrect. Keep trying! 🙃");
          }
        }}
      >
        Check Solution
      </button>
      <button
        className="mt-4 px-6 py-2 bg-red-500 text-white font-bold rounded shadow-md hover:bg-red-600"
        onClick={() => setBoard(generateBoard(difficulties[level]))}
      >
        Reset Board
      </button>
    </div>
  );
};

export default Sudoku;
