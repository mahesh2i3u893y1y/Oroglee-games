import { useState } from "react";
import ElephantShadow from "../assets/elephant-shadow.png";
import FoxShadow from "../assets/fox-shadow.png";
import RhinoShadow from "../assets/rhino-shadow.png";
import MonkeyShadow from "../assets/monkey-shadow.png";
import LionShadow from "../assets/lion-shadow.png";
import PandaShadow from "../assets/panda-shadow.png";
import SnakeShadow from "../assets/snake-shadow.png";
import TigerShadow from "../assets/tiger-shadow.png";
import TortoiseShadow from "../assets/tortoise-shadow.png";

import Elephant from "../assets/elephant.png";
import Fox from "../assets/fox.png";
import Rhino from "../assets/rhino.png";
import Monkey from "../assets/monkey.png";
import Lion from "../assets/lion.png";
import Panda from "../assets/panda.png";
import Snake from "../assets/snake.png";
import Tiger from "../assets/tiger.png";
import Tortoise from "../assets/tortoise.png";

// Initial shadows data
const initialShadows = [
  { id: 1, src: ElephantShadow, animal: "elephant", matched: false },
  { id: 2, src: FoxShadow, animal: "fox", matched: false },
  { id: 3, src: LionShadow, animal: "lion", matched: false },
  { id: 4, src: MonkeyShadow, animal: "monkey", matched: false },
  { id: 5, src: PandaShadow, animal: "panda", matched: false },
  { id: 6, src: RhinoShadow, animal: "rhino", matched: false },
  { id: 7, src: SnakeShadow, animal: "snake", matched: false },
  { id: 8, src: TigerShadow, animal: "tiger", matched: false },
  { id: 9, src: TortoiseShadow, animal: "tortoise", matched: false },
];

// Animals data
const animals = [
  { id: 1, src: Elephant, animal: "elephant" },
  { id: 2, src: Fox, animal: "fox" },
  { id: 3, src: Lion, animal: "lion" },
  { id: 4, src: Monkey, animal: "monkey" },
  { id: 5, src: Panda, animal: "panda" },
  { id: 6, src: Rhino, animal: "rhino" },
  { id: 7, src: Snake, animal: "snake" },
  { id: 8, src: Tiger, animal: "tiger" },
  { id: 9, src: Tortoise, animal: "tortoise" },
];

// Shuffle function
const shuffleArray = (array) => {
  return array
    .map((item) => ({ ...item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ sort, ...item }) => item);
};

// Matching Game Component
const MatchingGame = () => {
  const [shadows, setShadows] = useState(() => shuffleArray(initialShadows));
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleMatch = (shadow) => {
    const currentAnimal = animals[currentAnimalIndex];
    if (shadow.animal === currentAnimal.animal) {
      setShadows((prevShadows) =>
        prevShadows.map((s) =>
          s.animal === shadow.animal ? { ...s, matched: true } : s
        )
      );
      setScore(score + 1);
      setCurrentAnimalIndex((prevIndex) => (prevIndex + 1) % animals.length);
    }
  };

  const handleTouch = (shadow) => {
    handleMatch(shadow);
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Animal Matching Game</h1>
        <p className="text-lg mt-2">Score: {score}</p>
      </div>
      <div className="flex justify-center mb-4">
        {animals[currentAnimalIndex] && (
          <img
            src={animals[currentAnimalIndex].src}
            alt={animals[currentAnimalIndex].animal}
            className="w-32 h-32 md:w-40 md:h-40"
          />
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {shadows.map((shadow) => (
          <div
            key={shadow.id}
            className="flex justify-center items-center h-28 w-28 bg-gray-100 rounded shadow-md md:h-32 md:w-32"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleMatch(shadow);
            }}
            onClick={() => handleTouch(shadow)}
          >
            {shadow.matched ? (
              <img
                src={animals.find((a) => a.animal === shadow.animal).src}
                alt={shadow.animal}
                className="w-24 h-24 md:w-28 md:h-28"
              />
            ) : (
              <img src={shadow.src} alt="shadow" className="w-24 h-24 md:w-28 md:h-28" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingGame;
