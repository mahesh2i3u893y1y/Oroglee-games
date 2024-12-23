// Dictionary Game in React with Tailwind CSS
import { useState, useEffect } from 'react';
import win from "../assets/win.gif"
const words = ["apple", "bat", "cat", "doll", "elephant", "flag", "gate", "hen", "ink", "jeep", "knife", "lion", "monkey", "nose", "owl", "pig", "queen", "rest", "sing", "ton", "under", "village", "wolf", "yellow", "zebra"];

const DictionaryWords = () => {
  const [currentWord, setCurrentWord] = useState(() => words[Math.floor(Math.random() * words.length)]);
  const [userWord, setUserWord] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [isGameOver, setIsGameOver] = useState(false);
  const [usedWords, setUsedWords] = useState(new Set());

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setIsGameOver(true);
    }
  }, [timer]);

  const handleInputChange = (e) => {
    setUserWord(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lowerCaseWord = userWord.toLowerCase();

    if (usedWords.has(lowerCaseWord)) {
      alert("Word already taken! Try a new one.");
      setUserWord("");
      return;
    }

    if (
      userWord.length > 0 &&
      userWord[0].toLowerCase() === currentWord.slice(-1).toLowerCase()
    ) {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${lowerCaseWord}`
        );
        if (response.ok) {
          setScore((prev) => prev + 1);
          setCurrentWord(lowerCaseWord);
          setUsedWords((prev) => new Set(prev).add(lowerCaseWord));
          setUserWord("");
        } else {
          alert("Enter a valid word found in the dictionary!");
        }
      } catch (error) {
        console.log(error);
        alert("Error validating the word. Please try again.");
      }
    } else {
      alert("Enter a valid word starting with the correct letter!");
    }
  };

  const resetGame = () => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setUserWord("");
    setScore(0);
    setTimer(120);
    setUsedWords(new Set());
    setIsGameOver(false);
  };

  const closeGame = () => {
    window.location.href = "/home";
  };

  return (
    <div className="flex flex-col items-center justify-center h-[99.9%] bg-cover bg-center" 
    style={{backgroundImage: "url('https://cdn.pixabay.com/photo/2015/03/18/20/25/word-cloud-679936_1280.png')"}}>
     

      {!isGameOver ? (
        <div className='bg-blue-100 p-5'>
           <h1 className="text-3xl font-bold text-blue-600 mb-4">Dictionary Game</h1>
          <p className="text-xl">Current Word: <span className="font-bold">{currentWord}</span></p>
          <p className="text-lg mt-2">Time Left: <span className="font-bold text-red-500">{timer}s</span></p>
          <p className="text-lg mt-2">Score: <span className="font-bold text-green-500">{score}</span></p>

          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              value={userWord}
              onChange={handleInputChange}
              className="border border-blue-300 rounded px-3 py-2 text-lg"
              placeholder="Enter a word"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 ml-2 hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      ) : null}

      {isGameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-2xl font-bold text-green-600 mb-4">Game Over!</p>
            <p className="text-xl mb-4">Your Score: <span className="font-bold">{score}</span></p>
            <img
              src={win}
              alt="Game Over"
              className="w-64 h-64 mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={resetGame}
                className="bg-green-500 text-white rounded px-6 py-3 mr-4 hover:bg-green-600"
              >
                Restart
              </button>
              <button
                onClick={closeGame}
                className="bg-red-500 text-white rounded px-6 py-3 hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DictionaryWords;
