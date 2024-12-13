import { useState, useEffect } from 'react';

const SnakeGame = () => {
  const gridSize = 20; // Grid size (20x20)
  const initialSnake = [{ x: 2, y: 2 }]; // Initial snake position with only 1 segment
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState('RIGHT'); // Initial direction
  const [fruit, setFruit] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(Number(localStorage.getItem('snakeTopScore')) || 0); // Ensure topScore is a number
  const [gameOver, setGameOver] = useState(false);
  const [speed,] = useState(150); // Speed of snake movement in milliseconds

  const moveSnake = () => {
    if (gameOver) return;

    let head = { ...snake[0] };
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    // Add new head to the snake
    const newSnake = [head, ...snake];

    // Check for collision with wall
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      endGame();
      return;
    }

    // Check for collision with snake's body
    for (let i = 1; i < newSnake.length; i++) {
      if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
        endGame();
        return;
      }
    }

    // Check if the snake eats the fruit
    if (head.x === fruit.x && head.y === fruit.y) {
      setScore(score + 1);
      setFruit({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      });
    } else {
      newSnake.pop(); // Remove the tail if no fruit eaten
    }

    setSnake(newSnake);
  };

  const endGame = () => {
    setGameOver(true);
    if (score > topScore) {
      setTopScore(score);
      localStorage.setItem('snakeTopScore', score); // Save top score to localStorage
    }
  };

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  // Handling key events for direction change
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && direction !== 'DOWN') {
        setDirection('UP');
      } else if (e.key === 'ArrowDown' && direction !== 'UP') {
        setDirection('DOWN');
      } else if (e.key === 'ArrowLeft' && direction !== 'RIGHT') {
        setDirection('LEFT');
      } else if (e.key === 'ArrowRight' && direction !== 'LEFT') {
        setDirection('RIGHT');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // Restart the game
  const restartGame = () => {
    setSnake(initialSnake);
    setDirection('RIGHT');
    setFruit({ x: 5, y: 5 });
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[99.9%] bg-black">
      <h1 className="text-3xl text-white font-bold mb-2">Snake Game</h1>

      {/* Display Game Over and Score */}
      <div className='flex justify-between items-center'>
        <p className="text-lg text-white mb-2">
          {gameOver ? `Game Over! Score: ${score}` : `Score: ${score}`}
        </p>

        {/* Display Top Score */}
        <p className="text-md text-white mb-2">
          Top Score: {topScore}
        </p>
      </div>

      {/* Game Grid */}
      <div
        className="w-[80%] h-[300px] md:w-[400px] md:h-[400px] bg-black border-2 border-white"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {/* Render snake */}
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;
          const isSnake = snake.some((segment) => segment.x === col && segment.y === row);
          const isFruit = fruit.x === col && fruit.y === row;

          return (
            <div
              key={index}
              className={`w-full h-full ${isSnake ? 'bg-green-500' : ''}`}
              style={{
                backgroundImage: isFruit
                  ? 'url("https://cdn.pixabay.com/photo/2022/09/20/08/17/apple-7467291_1280.png")' // Replace with your apple image URL
                  : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          );
        })}
      </div>

      {/* Restart Button */}
      {gameOver && (
        <button
          onClick={restartGame}
          className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

export default SnakeGame;
