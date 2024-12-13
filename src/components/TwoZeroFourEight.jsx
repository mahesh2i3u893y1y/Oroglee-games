import  { useState, useEffect } from "react";

const SIZE = 4;

const Game = () => {
  const [board, setBoard] = useState(initializeBoard);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Initialize the board with two random tiles
  function initializeBoard() {
    const newBoard = Array(SIZE)
      .fill(0)
      .map(() => Array(SIZE).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
  }

  // Add a random tile (2 or 4) to an empty cell
  function addRandomTile(board) {
    const emptyCells = [];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (board[r][c] === 0) emptyCells.push([r, c]);
      }
    }
    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  // Move and merge logic for a single row/column
  function slideAndMerge(row) {
    const filteredRow = row.filter((num) => num !== 0); // Remove zeros
    for (let i = 0; i < filteredRow.length - 1; i++) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        filteredRow[i] *= 2;
        setScore((prev) => prev + filteredRow[i]);
        filteredRow[i + 1] = 0;
      }
    }
    return [...filteredRow.filter((num) => num !== 0), ...Array(SIZE - filteredRow.filter((num) => num !== 0).length).fill(0)];
  }

  // Handle moves in all directions
  function moveLeft(board) {
    return board.map((row) => slideAndMerge(row));
  }

  function moveRight(board) {
    return board.map((row) => slideAndMerge(row.reverse()).reverse());
  }

  function moveUp(board) {
    const rotated = rotateClockwise(board);
    const moved = moveLeft(rotated);
    return rotateCounterClockwise(moved);
  }

  function moveDown(board) {
    const rotated = rotateClockwise(board);
    const moved = moveRight(rotated);
    return rotateCounterClockwise(moved);
  }

  // Rotate the board for easier manipulation
  function rotateClockwise(board) {
    return board[0].map((_, colIndex) => board.map((row) => row[colIndex]).reverse());
  }

  function rotateCounterClockwise(board) {
    return board[0].map((_, colIndex) => board.map((row) => row[SIZE - colIndex - 1]));
  }

  // Check if any moves are possible
  function isGameOver(board) {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (board[r][c] === 0) return false; // Empty cell
        if (c < SIZE - 1 && board[r][c] === board[r][c + 1]) return false; // Mergeable horizontally
        if (r < SIZE - 1 && board[r][c] === board[r + 1][c]) return false; // Mergeable vertically
      }
    }
    return true;
  }

  // Handle keypress events
  function handleKeyPress(event) {
    if (gameOver) return;

    let newBoard;
    if (event.key === "ArrowUp") newBoard = moveUp(board);
    if (event.key === "ArrowDown") newBoard = moveDown(board);
    if (event.key === "ArrowLeft") newBoard = moveLeft(board);
    if (event.key === "ArrowRight") newBoard = moveRight(board);

    if (newBoard && JSON.stringify(newBoard) !== JSON.stringify(board)) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      if (isGameOver(newBoard)) setGameOver(true);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  // Get tile styles dynamically based on value
  function getTileClass(value) {
    const tileColors = {
      0: "bg-gray-300 text-gray-400",
      2: "bg-yellow-100 text-black",
      4: "bg-yellow-200 text-black",
      8: "bg-orange-300 text-white",
      16: "bg-orange-400 text-white",
      32: "bg-red-400 text-white",
      64: "bg-red-500 text-white",
      128: "bg-green-400 text-white",
      256: "bg-green-500 text-white",
      512: "bg-blue-400 text-white",
      1024: "bg-blue-500 text-white",
      2048: "bg-purple-500 text-white",
    };
    return tileColors[value] || "bg-black text-white";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-4">2048 Game</h1>
      <div className="text-lg font-semibold mb-2">Score: {score}</div>
      {gameOver && <div className="text-red-600 font-bold mb-2">Game Over!</div>}
      <div className="grid grid-cols-4 gap-4 bg-gray-400 p-4 rounded-lg shadow-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`flex items-center justify-center h-20 w-20 rounded ${getTileClass(cell)} text-2xl font-bold`}
            >
              {cell !== 0 ? cell : ""}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Game;
