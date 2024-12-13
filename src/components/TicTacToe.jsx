import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Board state
  const [isXTurn, setIsXTurn] = useState(true); // Track whose turn it is
  const [winner, setWinner] = useState(null); // Track the winner
  const [scoreboard, setScoreboard] = useState({ X: 0, O: 0 }); // Scoreboard

  // Sound effects
  const moveSound = new Audio("/src/assets/sounds/sound-1-167181.mp3"); // Add the path to your move sound file
  const winSound = new Audio("/win-sound.mp3"); // Add the path to your win sound file
  const drawSound = new Audio("/draw-sound.mp3"); // Add the path to your draw sound file

  // Play sound effects
  const playSound = (sound) => {
    sound.play();
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);

    playSound(moveSound); // Play move sound

    checkWinner(newBoard);

    if (!isXTurn) {
      setIsXTurn(true);
    } else {
      setIsXTurn(false);
      setTimeout(() => makeAIMove(newBoard), 500); // Delay for AI's move
    }
  };

  const makeAIMove = (board) => {
    if (winner) return;

    const emptyIndices = board
      .map((value, index) => (value === null ? index : null))
      .filter((i) => i !== null);

    // Try to win or block
    const bestMove = findBestMove(board, "O") || findBestMove(board, "X");

    // If no win/block move is found, fallback to any available move
    const move = bestMove !== null ? bestMove : emptyIndices[0];

    if (move !== null) {
      board[move] = "O";
      setBoard([...board]);
      playSound(moveSound); // Play move sound
      checkWinner(board);
      setIsXTurn(true);
    }
  };

  const findBestMove = (board, player) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;

      // Check if two cells are the same and the third is empty
      if (board[a] === player && board[b] === player && board[c] === null) {
        return c;
      }
      if (board[a] === player && board[c] === player && board[b] === null) {
        return b;
      }
      if (board[b] === player && board[c] === player && board[a] === null) {
        return a;
      }
    }

    return null; // No winning or blocking move found
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        updateScoreboard(board[a]);
        playSound(winSound); // Play win sound
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner("Draw");
      playSound(drawSound); // Play draw sound
    }
  };

  const updateScoreboard = (player) => {
    if (player !== "Draw") {
      setScoreboard((prev) => ({
        ...prev,
        [player]: prev[player] + 1,
      }));
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXTurn(true);
  };

  const resetGame = () => {
    restartGame();
    setScoreboard({ X: 0, O: 0 });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black to-purple-500">
      <h1 className="text-3xl font-bold text-white mb-4">Tic-Tac-Toe</h1>

      {/* Scoreboard */}
      <div className="flex justify-between w-80 bg-black p-4 rounded-lg shadow-lg mb-6">
        <div className="text-lg font-semibold text-white">Mahesh: {scoreboard.X}</div>
        <div className="text-lg font-semibold text-white">Oroglee: {scoreboard.O}</div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2  w-64 justify-center items-center  bg-black mx-auto p-4 rounded-lg shadow-lg">
        {board.map((value, index) => (
          <div
            key={index}
            onClick={() => (isXTurn ? handleClick(index) : null)}
            className={`w-20 h-20 flex items-center justify-center text-3xl  text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300 drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)] font-bold bg-white border-2 border-gray-300 cursor-pointer 
            ${winner && !board[index] ? "cursor-not-allowed" : "hover:bg-gray-200"}`}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Winner Display */}
      {winner && (
        <div className="mt-6 text-xl font-bold text-white">
          {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner === "X" ? "Mahesh" : "Oroglee"}`}
        </div>
      )}

      {/* Controls */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={restartGame}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Restart Round
        </button>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-green-700 text-white rounded-lg "
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
