import { useState, useEffect } from "react";
import bird from "../assets/bird-removebg-preview (1).png";
import pipe from "../assets/pipes-removebg-preview.png";


const App = () => {
  // Game states
  const [birdPosition, setBirdPosition] = useState(50); // Initial bird position (middle)
  const [gameStarted, setGameStarted] = useState(false); // Game state
  const [obstacles, setObstacles] = useState([
    { left: 100, height: 30 }, // Initial obstacle
    { left: 150, height: 40 }, // Second obstacle
  ]); // Multiple obstacles
  const [score, setScore] = useState(0); // Player's score
  const [topScore, setTopScore] = useState(0); // Highest score
  const [gameOver, setGameOver] = useState(false); // Game over state

  // Constants
  const gravity = 1; // Reduced gravity for smoother descent
  const jumpHeight = 10; // Reduced jump height for smoother play
  const birdSize = 5; // Bird size as percentage of game height
  const obstacleWidth = 5; // Consistent obstacle width as percentage of game width (increased for better visibility)
  const openingSize = 40; // Increased opening size (percentage)
  const gameHeight = 100; // Total height of the game in percentages

  // Bird's falling mechanics (gravity)
  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver) {
      timer = setInterval(() => {
        setBirdPosition((prev) => prev + gravity);
      }, 50); // Lower frequency for smoother fall
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  // Obstacles movement mechanics
  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver) {
      timer = setInterval(() => {
        setObstacles((prevObstacles) => {
          const newObstacles = prevObstacles.map((obstacle) => ({
            ...obstacle,
            left: obstacle.left - 1, // Move obstacles left
          }));

          // Check if the first obstacle is out of bounds
          if (newObstacles[0].left <= -obstacleWidth) {
            newObstacles.shift(); // Remove the first obstacle
            newObstacles.push({
              left: 100, // Add new obstacle at the right
              height: Math.floor(Math.random() * (gameHeight - openingSize)),
            });
            setScore((prev) => prev + 1); // Increment score
          }

          return newObstacles;
        });
      }, 50); // Smooth transition
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  // Collision detection
  useEffect(() => {
    const birdTop = birdPosition;
    const birdBottom = birdPosition + birdSize;

    // Check for collision with each obstacle
    obstacles.forEach(({ left, height }) => {
      const obstacleTop = height;
      const obstacleBottom = height + openingSize;

      if (
        birdTop <= 0 || // Hits the ceiling
        birdBottom >= gameHeight || // Hits the ground
        (left <= 15 && left + obstacleWidth >= 10 && // Hits obstacle
          (birdTop < obstacleTop || birdBottom > obstacleBottom))
      ) {
        setGameOver(true);
        setTopScore((prev) => (score > prev ? score : prev)); // Update top score
      }
    });
  }, [birdPosition, obstacles, score]);

  // Handle bird jump
  const handleJump = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    setBirdPosition((prev) => (prev - jumpHeight < 0 ? 0 : prev - jumpHeight));
  };

  // Keyboard controls (Space bar to jump)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        handleJump();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, gameOver]);

  // Restart the game
  const restartGame = () => {
    setBirdPosition(50);
    setObstacles([
      { left: 100, height: 30 },
      { left: 150, height: 40 },
    ]);
    setScore(0);
    setGameStarted(false);
    setGameOver(false);
  };

  return (
    <div
      className="relative mx-auto mt-10 h-[70%] w-[70%] overflow-hidden rounded"
      onClick={handleJump}
      style={{
        backgroundImage: 'url("https://cdn.pixabay.com/photo/2021/12/02/02/59/mountains-6839521_1280.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Bird */}
      <div
        className="absolute rounded-full transition-all duration-150 ease-out"
        style={{
          width: `${birdSize}%`,
          height: `${birdSize}%`,
          top: `${birdPosition}%`,
          left: "10%",
        }}
      >
        <img src={bird} alt="bird" />
      </div>

      {/* Obstacles */}
      {obstacles.map(({ left, height }, index) => (
        <div key={index}>
          {/* Top Obstacle */}
          <div
            className="absolute"
            style={{
              width: `${obstacleWidth}%`, // Set obstacle width as a percentage
              height: `${height}%`, // Top obstacle height
              left: `${left}%`, // Horizontal position
              top: 0, // Positioned at the top
              backgroundImage: `url(${pipe})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Bottom Obstacle */}
          <div
            className="absolute"
            style={{
              width: `${obstacleWidth}%`, // Set obstacle width as a percentage
              height: `${gameHeight - height - openingSize}%`, // Bottom obstacle height
              left: `${left}%`, // Horizontal position
              bottom: 0, // Positioned at the bottom
              backgroundImage: `url(${pipe})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      ))}


      {/* Score */}
      <div className="absolute top-2 left-2 text-white text-xl font-bold">
        Score: {score}
      </div>

      {/* Top Score */}
      <div className="absolute top-2 right-2 text-white text-xl font-bold">
        Top Score: {topScore}
      </div>

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 text-white">
          <h1 className="text-2xl font-bold mb-4">Game Over</h1>
          <p className="text-lg mb-2">Score: {score}</p>
          <p className="text-lg mb-4">Top Score: {topScore}</p>
          <button
            className="px-4 py-2 bg-yellow-500 rounded font-bold"
            onClick={restartGame}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
