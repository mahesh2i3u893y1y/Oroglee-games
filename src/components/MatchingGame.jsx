import { useState, useEffect } from "react";
// import { fruits } from "./constants";

const fruits = [
  { id: 1, name: "Apple", img: "https://cdn.pixabay.com/photo/2014/03/24/13/41/apple-293999_1280.png" },
  { id: 2, name: "Banana", img: "https://cdn.pixabay.com/photo/2014/03/25/17/01/banana-297848_1280.png" },
  { id: 3, name: "Grapes", img: "https://cdn.pixabay.com/photo/2014/04/02/16/15/grape-306724_1280.png" },
  { id: 4, name: "Orange", img: "https://media.istockphoto.com/id/967197394/vector/botany-plants-antique-engraving-illustration-citrus-aurantium-bitter-orange-seville-orange.jpg?s=612x612&w=0&k=20&c=S-15HoHsR-h601f1a6ZKOX9WEfXhntUIwEQLbikh1gE=" },
];

const DragAndDropGame = () => {
  const [shuffledNames, setShuffledNames] = useState([]);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedName, setSelectedName] = useState(null); // For mobile, keep track of selected name
  const [message, setMessage] = useState("");
  const [correctMatches, setCorrectMatches] = useState([]);

  // Function to shuffle the array randomly
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Shuffle names and images separately
    const shuffledNames = shuffleArray([...fruits.map(fruit => fruit.name)]);
    const shuffledImages = shuffleArray([...fruits.map(fruit => fruit)]);
    setShuffledNames(shuffledNames);
    setShuffledImages(shuffledImages);
  }, []);

  // Handle mobile touch selection
  const handleMobileSelection = (fruitName) => {
    if (selectedName) {
      // Check if the selected name matches the image
      const selectedFruit = fruits.find(fruit => fruit.name === selectedName);
      const matchedFruit = fruits.find(fruit => fruit.name === fruitName);

      if (selectedFruit && matchedFruit && selectedFruit.id === matchedFruit.id) {
        setScore(score + 1);
        setMessage(`Correct! ${matchedFruit.name} matched successfully!`);
        setCorrectMatches([...correctMatches, matchedFruit.id]);
      } else {
        setMessage(`Oops! That's not the correct match.`);
      }

      setSelectedName(null); // Reset the selected name after checking
    } else {
      // Select the name when first tapped
      setSelectedName(fruitName);
    }
  };

  // Handle drag start for desktop
  const handleDragStart = (e, fruit) => {
    e.dataTransfer.setData("fruit", JSON.stringify(fruit));
  };

  // Handle drop for desktop
  const handleDrop = (e, fruit) => {
    e.preventDefault();

    // Get the dragged fruit from the dataTransfer object
    const draggedFruit = JSON.parse(e.dataTransfer.getData("fruit"));

    if (draggedFruit.id === fruit.id) {
      setScore(score + 1);
      setMessage(`Correct! ${fruit.name} matched successfully!`);
      setCorrectMatches([...correctMatches, fruit.id]);
    } else {
      setMessage(`Oops! That's not the correct match.`);
    }
  };

  // Handle Reset
  const handleReset = () => {
    setScore(0);
    setMessage("");
    setCorrectMatches([]);
    setSelectedName(null); // Reset selected name
    const shuffledNames = shuffleArray([...fruits.map(fruit => fruit.name)]);
    const shuffledImages = shuffleArray([...fruits.map(fruit => fruit)]);
    setShuffledNames(shuffledNames);
    setShuffledImages(shuffledImages);
  };

  return (
    <div className="game-container p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Match the Fruit Images!</h1>
      <p className="text-2xl font-semibold mb-4">score: <span className="font-semibold text-green-500">{score}</span></p>

      {message && (
        <div className="alert mb-4 p-4 rounded-lg text-center">
          <p className={`text-white ${message.includes("Correct") ? "text-green-600 font-semibold" : "text-red-700 font-semibold"}`}>
            {message}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:space-x-12 mb-10 w-full">
        {/* Fruits Names Area */}
        <div className="w-full sm:w-1/2">
          <h3 className="text-xl font-semibold text-center mb-4">Fruits Names</h3>
          <div className="flex flex-wrap md:flex-col gap-4 justify-center md:items-center">
            {shuffledNames.map((name, index) => (
              <div
                key={index}
                onClick={() => handleMobileSelection(name)} // For mobile, tap to select
                draggable
                onDragStart={(e) => handleDragStart(e, fruits.find(fruit => fruit.name === name))} // For desktop, drag the name
                className="draggable-name w-2/6 p-4 bg-blue-300 rounded-lg cursor-pointer text-center shadow-lg hover:bg-blue-400 transition"
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Fruits Images Area */}
        <div className="w-full sm:w-1/2">
          <h3 className="text-xl font-semibold mb-4">Match the Name to the Image</h3>
          <div className="flex flex-wrap gap-6 justify-center md:w-[70%]">
            {shuffledImages.map((fruit) => (
              <div
                key={fruit.id}
                onClick={() => handleMobileSelection(fruit.name)} // For mobile, tap to match
                onDrop={(e) => handleDrop(e, fruit)} // For desktop, drop the name here
                onDragOver={(e) => e.preventDefault()} // Allow drop
                className={`fruit-image relative p-4 rounded-lg shadow-lg border-4 border-dashed ${correctMatches.includes(fruit.id) ? 'border-green-500' : 'border-gray-300'}`}
              >
                <img
                  src={fruit.img}
                  alt={fruit.name}
                  width="100"
                  height="100"
                  className={`transition-all duration-500 ${correctMatches.includes(fruit.id) ? 'opacity-100 blur-0' : 'opacity-50 blur-lg'}`} // Apply blur if not matched
                />
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

export default DragAndDropGame;
