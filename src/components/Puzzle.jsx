/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const PuzzleGame = () => {
  const [pieces, setPieces] = useState([]);
  const [completedPieces, setCompletedPieces] = useState([]);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [topScore, setTopScore] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [activePiece, setActivePiece] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const gridSize = 3; // 3x3 grid
  const defaultImages = [
    "https://cdn.pixabay.com/photo/2024/05/29/21/16/dental-8797255_1280.png",
    "https://cdn.pixabay.com/photo/2020/08/27/18/31/teeth-5522653_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/05/16/17/33/school-8766573_1280.jpg",
  ];

  const soundEffect = new Audio(
    "https://freesound.org/data/previews/566/566160_10460217-lq.mp3"
  ); // Example sound effect

  useEffect(() => {
    initializeGame();
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 768); // Check if screen is smaller than 768px
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    const newPieces = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        newPieces.push({
          id: `${row}-${col}`,
          originalRow: row,
          originalCol: col,
          currentRow: null,
          currentCol: null,
        });
      }
    }
    setPieces(shuffleArray(newPieces));
    setCompletedPieces([]);
    setTime(0);
    setTimerActive(true);
    setIsGameOver(false);
    setCurrentImage(defaultImages[Math.floor(Math.random() * defaultImages.length)]);
  };

  const handleDragStart = (e, piece) => {
    e.dataTransfer.setData("piece", JSON.stringify(piece));
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    const piece = JSON.parse(e.dataTransfer.getData("piece"));
    placePiece(piece, target);
  };

  const handleTouchStart = (piece) => {
    setActivePiece(piece);
  };

  const handleTouchEnd = (target) => {
    if (activePiece) {
      placePiece(activePiece, target);
      setActivePiece(null);
    }
  };

  const placePiece = (piece, target) => {
    if (
      piece.originalRow === target.row &&
      piece.originalCol === target.col
    ) {
      soundEffect.play();
      setCompletedPieces((prev) => [...prev, piece.id]);
      setPieces((prev) =>
        prev.map((p) =>
          p.id === piece.id
            ? { ...p, currentRow: target.row, currentCol: target.col }
            : p
        )
      );
    }

    if (completedPieces.length + 1 === gridSize * gridSize) {
      setTimerActive(false);
      setIsGameOver(true);
      if (!topScore || time < topScore) {
        setTopScore(time);
      }
    }
  };

  const handleRestart = () => {
    initializeGame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-purple-700 mb-5">
        Enhanced Puzzle Maker Game
      </h1>

      <div className="text-lg font-medium mb-4">
        Timer: <span className="text-purple-700">{time}s</span>
      </div>

      {topScore !== null && (
        <div className="text-lg font-medium mb-4">
          Top Score: <span className="text-green-700">{topScore}s</span>
        </div>
      )}

      <div
        className="relative mb-5 grid gap-1"
        style={{
          width: isSmallScreen ? "300px" : "300px", // Adjust puzzle size for small screens
          height: isSmallScreen ? "300px" : "300px",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {[...Array(gridSize * gridSize)].map((_, index) => {
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;
          const isUnblurred = completedPieces.includes(`${row}-${col}`);

          return (
            <div
              key={`${row}-${col}`}
              className="w-full h-full border border-gray-300"
              style={{
                backgroundImage: `url(${currentImage})`,
                backgroundSize: `${gridSize * 100}%`,
                backgroundPosition: `${(col / (gridSize - 1)) * 100}% ${(
                  row / (gridSize - 1)
                ) * 100}%`,
                filter: isUnblurred ? "none" : "blur(5px)",
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, { row, col })}
              onTouchEnd={() => handleTouchEnd({ row, col })}
            ></div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {pieces.map(
          (piece) =>
            !completedPieces.includes(piece.id) && (
              <div
                key={piece.id}
                draggable
                onDragStart={(e) => handleDragStart(e, piece)}
                onTouchStart={() => handleTouchStart(piece)}
                className="w-16 h-16 md:w-24 md:h-24 border border-gray-300 bg-cover bg-center cursor-grab"
                style={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundSize: `${gridSize * 100}%`,
                  backgroundPosition: `${
                    (piece.originalCol / (gridSize - 1)) * 100
                  }% ${(piece.originalRow / (gridSize - 1)) * 100}%`,
                }}
              ></div>
            )
        )}
      </div>

      {isGameOver && (
        <div className="text-lg font-semibold text-green-500 mb-4">
          🎉 Congratulations! You completed the puzzle in {time} seconds! 🎉
        </div>
      )}

      <button
        onClick={handleRestart}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Restart Game
      </button>
    </div>
  );
};

export default PuzzleGame;
