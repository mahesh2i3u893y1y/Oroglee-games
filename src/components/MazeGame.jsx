import { useState, useEffect } from "react";

const Wordle = () => {
  const height = 6; // Number of guesses
  const width = 5; // Length of the word

  const wordList = [
    "cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", "evade",
    "naval", "serve", "heath", "dwarf", "model", "karma", "stink", "grade",
  ];
  const guessList = [...wordList];

  const [word, setWord] = useState(
    wordList[Math.floor(Math.random() * wordList.length)].toUpperCase()
  );
  const [board, setBoard] = useState(
    Array.from({ length: height }, () => Array(width).fill(""))
  );
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const handleInput = (key) => {
    if (gameOver) return;

    if (/^[A-Z]$/.test(key) && col < width) {
      const updatedBoard = board.map((r, i) =>
        i === row ? r.map((tile, j) => (j === col ? key : tile)) : r
      );
      setBoard(updatedBoard);
      setCol(col + 1);
    } else if (key === "Backspace" && col > 0) {
      const updatedBoard = board.map((r, i) =>
        i === row ? r.map((tile, j) => (j === col - 1 ? "" : tile)) : r
      );
      setBoard(updatedBoard);
      setCol(col - 1);
    } else if (key === "Enter" && col === width) {
      processGuess();
    }
  };

  const processGuess = () => {
    const guess = board[row].join("");
    if (!guessList.includes(guess.toLowerCase())) {
      setMessage("Not in word list");
      return;
    }

    const newBoard = [...board];
    const letterCount = {};
    let correct = 0;

    word.split("").forEach((char) => {
      letterCount[char] = (letterCount[char] || 0) + 1;
    });

    // Mark correct letters
    for (let i = 0; i < width; i++) {
      if (guess[i] === word[i]) {
        newBoard[row][i] = { letter: guess[i], status: "correct" };
        letterCount[guess[i]]--;
        correct++;
      }
    }

    // Mark present and absent letters
    for (let i = 0; i < width; i++) {
      if (!newBoard[row][i]?.status) {
        if (word.includes(guess[i]) && letterCount[guess[i]] > 0) {
          newBoard[row][i] = { letter: guess[i], status: "present" };
          letterCount[guess[i]]--;
        } else {
          newBoard[row][i] = { letter: guess[i], status: "absent" };
        }
      }
    }

    setBoard(newBoard);

    if (correct === width) {
      setMessage("You Win!");
      setGameOver(true);
    } else if (row === height - 1) {
      setMessage(`Game Over! The word was ${word}`);
      setGameOver(true);
    } else {
      setRow(row + 1);
      setCol(0);
    }
  };

  const restartGame = () => {
    setWord(wordList[Math.floor(Math.random() * wordList.length)].toUpperCase());
    setBoard(Array.from({ length: height }, () => Array(width).fill("")));
    setRow(0);
    setCol(0);
    setGameOver(false);
    setMessage("");
  };

  const renderKeyboard = () => {
    const rows = [
      "QWERTYUIOP",
      "ASDFGHJKL",
      "ZXCVBNM",
    ];
    return (
      <div className="flex flex-col items-center space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-1">
            {row.split("").map((key) => (
              <button
                key={key}
                onClick={() => handleInput(key)}
                className="w-8 h-8 bg-gray-300 rounded text-center font-bold"
              >
                {key}
              </button>
            ))}
          </div>
        ))}
        <div className="flex space-x-2">
          <button
            onClick={() => handleInput("Backspace")}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Backspace
          </button>
          <button
            onClick={() => handleInput("Enter")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Enter
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      handleInput(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [col, row, gameOver, board]);

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <h1 className="text-4xl font-bold">Wordle</h1>
      <div className="grid grid-rows-6 gap-2">
        {board.map((r, i) => (
          <div key={i} className="grid grid-cols-5 gap-2">
            {r.map((tile, j) => (
              <div
                key={j}
                className={`w-12 h-12 border-2 flex items-center justify-center text-lg font-bold ${
                  tile?.status === "correct"
                    ? "bg-green-500 text-white"
                    : tile?.status === "present"
                    ? "bg-yellow-500 text-white"
                    : tile?.status === "absent"
                    ? "bg-gray-500 text-white"
                    : "border-gray-300"
                }`}
              >
                {tile.letter || tile}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="text-xl text-red-500">{message}</p>
      {renderKeyboard()}
      <button
        onClick={restartGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Restart
      </button>
    </div>
  );
};

export default Wordle;
