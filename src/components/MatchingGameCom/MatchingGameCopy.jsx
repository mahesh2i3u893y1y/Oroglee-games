/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

// Generic Game Component
const MatchingGameCopy = ({ gameData, title }) => {
  const [shuffledNames, setShuffledNames] = useState([]);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedName, setSelectedName] = useState(null);
  const [message, setMessage] = useState("");
  const [correctMatches, setCorrectMatches] = useState([]);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    setShuffledNames(shuffleArray([...gameData.map((item) => item.name)]));
    setShuffledImages(shuffleArray([...gameData]));
  }, [gameData]);

  const handleMobileSelection = (itemName) => {
    if (selectedName) {
      const selectedItem = gameData.find((item) => item.name === selectedName);
      const matchedItem = gameData.find((item) => item.name === itemName);

      if (selectedItem && matchedItem && selectedItem.id === matchedItem.id) {
        setScore(score + 1);
        setMessage(`Correct! ${matchedItem.name} matched successfully!`);
        setCorrectMatches([...correctMatches, matchedItem.id]);
      } else {
        setMessage("Oops! That's not the correct match.");
      }

      setSelectedName(null);
    } else {
      setSelectedName(itemName);
    }
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const handleDrop = (e, item) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("item"));

    if (draggedItem.id === item.id) {
      setScore(score + 1);
      setMessage(`Correct! ${item.name} matched successfully!`);
      setCorrectMatches([...correctMatches, item.id]);
    } else {
      setMessage("Oops! That's not the correct match.");
    }
  };

  const handleReset = () => {
    setScore(0);
    setMessage("");
    setCorrectMatches([]);
    setSelectedName(null);
    setShuffledNames(shuffleArray([...gameData.map((item) => item.name)]));
    setShuffledImages(shuffleArray([...gameData]));
  };

  return (
    <div className="game-container p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">{title}</h1>
      <p className="text-2xl font-semibold mb-4">
        Score: <span className="text-green-500">{score}</span>
      </p>

      {message && (
        <div className="alert mb-4 p-4 rounded-lg text-center">
          <p className={`${message.includes("Correct") ? "text-green-600" : "text-red-700"}`}>
            {message}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:space-x-12 mb-10 w-full">
        <div className="w-full sm:w-1/2">
          <h3 className="text-xl font-semibold text-center mb-4">Names</h3>
          <div className="flex flex-wrap md:flex-col gap-4 justify-center md:items-center">
            {shuffledNames.map((name, index) => (
              <div
                key={index}
                onClick={() => handleMobileSelection(name)}
                draggable
                onDragStart={(e) => handleDragStart(e, gameData.find((item) => item.name === name))}
                className="draggable-name w-1/6 px-2 py-3 bg-blue-300 rounded-lg cursor-pointer text-center shadow-lg hover:bg-blue-400 transition"
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <h3 className="text-xl font-semibold mb-4">Match the Name to the Image</h3>
          <div className="flex flex-wrap gap-7 justify-center md:w-[70%]">
            {shuffledImages.map((item) => (
              <div
                key={item.id}
                onClick={() => handleMobileSelection(item.name)}
                onDrop={(e) => handleDrop(e, item)}
                onDragOver={(e) => e.preventDefault()}
                className={`fruit-image p-4 rounded-lg shadow-lg border-4 border-dashed ${
                  correctMatches.includes(item.id) ? "border-green-500" : "border-gray-300"
                }`}
              >
                <img src={item.img} alt={item.name} className="w-20 h-20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleReset}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Reset Game
      </button>
    </div>
  );
};


export default MatchingGameCopy