import { useState, useEffect, useRef } from "react";

const FRUIT_IMAGES = [
  "https://cdn.pixabay.com/photo/2012/04/18/12/54/strawberry-36949_1280.png",
  "https://cdn.pixabay.com/photo/2014/12/21/23/39/bananas-575773_1280.png",
  "https://cdn.pixabay.com/photo/2013/07/13/11/29/cherries-158241_1280.png",
  "https://cdn.pixabay.com/photo/2012/04/26/19/35/pears-42897_1280.png",
  "https://cdn.pixabay.com/photo/2014/12/21/23/39/coconut-575780_1280.png",
  "https://cdn.pixabay.com/photo/2017/10/14/15/50/fruit-2850840_1280.png",
  "https://cdn.pixabay.com/photo/2012/04/05/00/32/lemon-25342_1280.png",
  "https://cdn.pixabay.com/photo/2014/03/28/11/49/pineapple-300038_1280.png",
  "https://cdn.pixabay.com/photo/2013/07/13/13/53/kiwi-161728_1280.png",
  "https://cdn.pixabay.com/photo/2014/04/03/10/26/banana-310449_1280.png",
  "https://cdn.pixabay.com/photo/2013/07/13/13/54/bunch-of-grapes-161763_1280.png",
  "https://cdn.pixabay.com/photo/2022/09/20/08/17/apple-7467291_1280.png",
];
const BOMB_IMAGE = "https://cdn.pixabay.com/photo/2017/01/31/16/59/bomb-2025548_1280.png";
const BASKET_IMAGE = "https://cdn.pixabay.com/photo/2022/03/10/23/29/basket-7060922_1280.png";

const FruitCatcher = () => {
  const [fruits, setFruits] = useState([]);
  const [basketPosition, setBasketPosition] = useState(50);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(
    parseInt(localStorage.getItem("topScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [fallSpeed, setFallSpeed] = useState(5); // Initial falling speed (% per tick)
  const gameAreaRef = useRef(null);

  
  // Generate falling objects
useEffect(() => {
    if (gameOver) return;
  
    const interval = setInterval(() => {
      let maxFruitsPerInterval = 1; // Default to 1 fruit
  
      // Increase the number of fruits based on score
      if (score > 30) maxFruitsPerInterval = 4;
      else if (score > 20) maxFruitsPerInterval = 3;
      else if (score > 10) maxFruitsPerInterval = 2;
  
      const newFruits = Array.from({ length: maxFruitsPerInterval }, () => {
        const isBomb = Math.random() < 0.2; // 30% chance to spawn a bomb
        return {
          id: Date.now() + Math.random(), // Ensure unique ID
          type: isBomb ? "bomb" : "fruit",
          image: isBomb
            ? BOMB_IMAGE
            : FRUIT_IMAGES[Math.floor(Math.random() * FRUIT_IMAGES.length)],
          left: Math.random() * 90, // Random horizontal position
          top: 0, // Start from the top
        };
      });
  
      setFruits((prev) => [...prev, ...newFruits]);
    }, 600);
    
  
    return () => clearInterval(interval);
  }, [gameOver, score]);
  

  // Move fruits downward
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setFruits((prev) =>
        prev.map((fruit) => ({
          ...fruit,
          top: fruit.top + fallSpeed,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, [gameOver, fallSpeed]);

  // Adjust falling speed based on score
  useEffect(() => {
    if (score > 200) {
      setFallSpeed(9); // Increase speed by 25%
    } else if (score > 100) {
      setFallSpeed(6); // Increase speed by 10%
    } else {
      setFallSpeed(5); // Default speed
    }
  }, [score]);

  // Collision detection
  useEffect(() => {
    const basketWidth = 10; // Basket width percentage
    const basketLeft = basketPosition - basketWidth / 2;
    const basketRight = basketPosition + basketWidth / 2;
  
    setFruits((prev) => {
      return prev.filter((fruit) => {
        const isCatchable = fruit.top >= 90 && fruit.top <= 95;
        const fruitCenter = fruit.left + 2.5;
  
        if (isCatchable && fruitCenter >= basketLeft && fruitCenter <= basketRight) {
          if (fruit.type === "bomb") {
            setGameOver(true);
          } else {
            // Add a unique flag to ensure it is processed once
            if (!fruit.caught) {
              setScore((prevScore) => prevScore + 1);
              fruit.caught = true; // Mark fruit as caught
            }
          }
          return false; // Remove fruit from state
        }
  
        return fruit.top < 100; // Keep fruit in game area
      });
    });
  }, [basketPosition, fruits]);
  

  // Update top score
  useEffect(() => {
    if (score > topScore) {
      setTopScore(score);
      localStorage.setItem("topScore", score);
    }
  }, [score, topScore]);

  // Handle basket movement
  const handleMouseMove = (e) => {
    const gameArea = gameAreaRef.current;
    const rect = gameArea.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const newPosition = (mouseX / rect.width) * 100;
    setBasketPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  const handleTouchMove = (e) => {
    const gameArea = gameAreaRef.current;
    const rect = gameArea.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const newPosition = (touchX / rect.width) * 100;
    setBasketPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setBasketPosition((pos) => Math.max(pos - 5, 0));
    } else if (e.key === "ArrowRight") {
      setBasketPosition((pos) => Math.min(pos + 5, 100));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Restart the game
  const restartGame = () => {
    setFruits([]);
    setScore(0);
    setFallSpeed(5); // Reset speed
    setGameOver(false);
  };

  return (
    <div
      className="relative w-full h-[99.9%] bg-blue-200 overflow-hidden"
      ref={gameAreaRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Scoreboard */}
      <div className="absolute top-4 left-4 text-xl font-bold text-gray-800">
        Score: {score}
      </div>
      <div className="absolute top-4 right-4 text-xl font-bold text-gray-800">
        Top Score: {topScore}
      </div>

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Game Over</h1>
          <p className="text-2xl mb-6">Your Score: {score}</p>
          <button
            onClick={restartGame}
            className="bg-green-500 px-6 py-2 rounded-lg text-xl"
          >
            Restart
          </button>
        </div>
      )}

      {/* Fruits */}
      {fruits.map((fruit) => (
        <img
          key={fruit.id} 
          src={fruit.image}
          alt={fruit.type}
          className="absolute w-12 h-12 md:w-16 md:h-16"
          style={{
            top: `${fruit.top}%`,
            left: `${fruit.left}%`,
          }}
        />
      ))}

      {/* Basket */}
      <img
        src={BASKET_IMAGE}
        alt="basket"
        className="bottom-14 md:bottom-4 h-16 w-24 md:w-32 md:h-24 absolute "
        style={{
          left: `${basketPosition}%`,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
};

export default FruitCatcher;
