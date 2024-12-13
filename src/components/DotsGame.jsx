import { useState, useEffect } from 'react';

const gridSize = 10;
const wordList = ['REACT', 'JAVASCRIPT', 'CSS', 'HTML', 'TAILWIND', 'FUNCTION', 'COMPONENT', 'HOOK', 'STATE', 'PROPS'];
const colors = ['bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-yellow-200', 'bg-purple-200', 'bg-pink-200', 'bg-orange-200', 'bg-teal-200', 'bg-indigo-200', 'bg-cyan-200'];

const generateEmptyGrid = (size) => {
  return Array(size)
    .fill()
    .map(() => Array(size).fill(''));
};

const placeWordInGrid = (grid, word) => {
  const directions = [
    { x: 1, y: 0 }, // Horizontal
    { x: 0, y: 1 }, // Vertical
    { x: 1, y: 1 }, // Diagonal (down-right)
    { x: 1, y: -1 }, // Diagonal (down-left)
  ];

  const wordLength = word.length;
  let placed = false;

  while (!placed) {
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const xStart = Math.floor(Math.random() * grid.length);
    const yStart = Math.floor(Math.random() * grid[0].length);

    let canPlace = true;
    for (let i = 0; i < wordLength; i++) {
      const x = xStart + i * direction.x;
      const y = yStart + i * direction.y;

      if (
        x < 0 ||
        y < 0 ||
        x >= grid.length ||
        y >= grid[0].length ||
        (grid[x][y] !== '' && grid[x][y] !== word[i])
      ) {
        canPlace = false;
        break;
      }
    }

    if (canPlace) {
      for (let i = 0; i < wordLength; i++) {
        const x = xStart + i * direction.x;
        const y = yStart + i * direction.y;
        grid[x][y] = word[i];
      }
      placed = true;
    }
  }
};

const fillEmptySpaces = (grid) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      }
    }
  }
};

const WordSearchGame = () => {
  const [grid, setGrid] = useState(generateEmptyGrid(gridSize));
  const [foundWordsWithCoordinates, setFoundWordsWithCoordinates] = useState([]);
  const [highlighted, setHighlighted] = useState([]);
  const [timer, setTimer] = useState(120);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (foundWordsWithCoordinates.length === wordList.length) {
      setIsWon(true);
      setIsGameOver(true);
    }
  }, [foundWordsWithCoordinates]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1 || isGameOver) {
          clearInterval(timerInterval);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isGameOver]);

  const startGame = () => {
    const newGrid = generateEmptyGrid(gridSize);
    wordList.forEach((word) => placeWordInGrid(newGrid, word));
    fillEmptySpaces(newGrid);
    setGrid(newGrid);
    setFoundWordsWithCoordinates([]);
    setHighlighted([]);
    setTimer(300);
    setScore(0);
    setIsGameOver(false);
    setIsWon(false);
  };

  const handleSelect = (row, col) => {
    if (isGameOver || foundWordsWithCoordinates.length === wordList.length) return;
  
    const alreadySelectedIndex = highlighted.findIndex(([r, c]) => r === row && c === col);
  
    if (alreadySelectedIndex !== -1) {
      // If the cell is already selected, remove it (Undo functionality)
      setHighlighted((prev) => prev.filter((_, index) => index !== alreadySelectedIndex));
    } else {
      const selectedWord = highlighted.concat([[row, col]]);
      setHighlighted(selectedWord);
  
      if (selectedWord.length > 1) {
        // Validate that the selected path is contiguous and in a valid direction
        const [startRow, startCol] = selectedWord[0];
        const [endRow, endCol] = selectedWord[selectedWord.length - 1];
  
        const dRow = endRow - startRow !== 0 ? (endRow - startRow) / Math.abs(endRow - startRow) : 0;
        const dCol = endCol - startCol !== 0 ? (endCol - startCol) / Math.abs(endCol - startCol) : 0;
  
        const isValidPath = selectedWord.every(([currentRow, currentCol], index) => {
          if (index === 0) return true;
          const [prevRow, prevCol] = selectedWord[index - 1];
          return currentRow === prevRow + dRow && currentCol === prevCol + dCol;
        });
  
        if (!isValidPath) {
          setHighlighted([]);
          return;
        }
      }
  
      // Extract the word from the grid based on the selected path
      const word = selectedWord.map(([r, c]) => grid[r][c]).join('');
  
      // Check if the word exists in the word list and has not been found yet
      if (wordList.includes(word)) {
        if (!foundWordsWithCoordinates.some(({ word: foundWord }) => foundWord === word)) {
          setFoundWordsWithCoordinates((prev) => [
            ...prev,
            { word, coordinates: selectedWord, color: colors[prev.length % colors.length] },
          ]);
          setScore((prev) => prev + 10);
        }
        setHighlighted([]);
      }
    }
  };
  

  return (
    <div className="container mx-auto p-6 flex flex-col justify-center items-center">
      <h1 className="text-3xl text-center font-bold mb-6">Word Search Game</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-4">
          <p className="text-lg">Score: {score}</p>
          <p className="text-lg">Time: {timer}s</p>
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded mx-2"
          onClick={startGame}
          disabled={isGameOver && timer > 0}
        >
          Restart
        </button>
      </div>
      {isGameOver ? (
        <div className="text-center">
          {isWon ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
              <p className="text-xl">You found all the words!</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
              <p className="text-xl">Your final score: {score}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <div
            className="grid grid-cols-10 gap-0"
            style={{
              width: `${gridSize * 30}px`,
              height: `${gridSize * 30}px`,
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((letter, colIndex) => {
                const foundHighlight = foundWordsWithCoordinates.find(({ coordinates }) =>
                  coordinates.some(([r, c]) => r === rowIndex && c === colIndex)
                );
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`flex justify-center items-center border text-xl cursor-pointer
                      ${highlighted.some(([r, c]) => r === rowIndex && c === colIndex) ? 'bg-blue-200' : ''}
                      ${foundHighlight ? foundHighlight.color : ''}`}
                    onClick={() => handleSelect(rowIndex, colIndex)}
                    style={{
                      width: '30px',
                      height: '30px',
                    }}
                  >
                    {letter}
                  </div>
                );
              })
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Found Words</h2>
            <ul>
              {foundWordsWithCoordinates.map(({ word }, index) => (
                <li key={index} className="text-lg">{word}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Words to Find</h2>
            <ul>
              {wordList.map((word, index) => (
                <li
                  key={index}
                  className={`text-lg ${foundWordsWithCoordinates.some(({ word: foundWord }) => foundWord === word) ? 'text-green-500' : 'text-gray-500'}`}
                >
                  {word}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordSearchGame;
