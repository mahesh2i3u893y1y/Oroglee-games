import  { useState } from 'react';

const emojisList = [
  {
    id: 0,
    emojiName: 'Face with stuck out tongue',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png',
  },
  {
    id: 1,
    emojiName: 'Face with head bandage',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png',
  },
  {
    id: 2,
    emojiName: 'Face with hugs',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png',
  },
  {
    id: 3,
    emojiName: 'Face with laughing',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png',
  },
  {
    id: 4,
    emojiName: 'Laughing face with hand in front of mouth',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png',
  },
  {
    id: 5,
    emojiName: 'Face with mask',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png',
  },
  {
    id: 6,
    emojiName: 'Face with silence',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png',
  },
  {
    id: 7,
    emojiName: 'Face with stuck out tongue and winked eye',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png',
  },
  {
    id: 8,
    emojiName: 'Grinning face with sweat',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png',
  },
  {
    id: 9,
    emojiName: 'Smiling face with heart eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png',
  },
  {
    id: 10,
    emojiName: 'Grinning face',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-img.png',
  },
  {
    id: 11,
    emojiName: 'Smiling face with star eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png',
  },
];

const LOSE_IMAGE = 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png';
const WON_IMAGE = 'https://assets.ccbp.in/frontend/react-js/won-game-img.png';

const EmojiGame = () => {
  const [clickedEmojisList, setClickedEmojisList] = useState([]);
  const [isGameInProgress, setIsGameInProgress] = useState(true);
  const [topScore, setTopScore] = useState(0);

  const resetGame = () => {
    setClickedEmojisList([]);
    setIsGameInProgress(true);
  };

  const finishGameAndSetTopScore = (currentScore) => {
    let newTopScore = topScore;

    if (currentScore > topScore) {
      newTopScore = currentScore;
    }

    setTopScore(newTopScore);
    setIsGameInProgress(false);
  };

  const clickEmoji = (id) => {
    const isEmojiPresent = clickedEmojisList.includes(id);
    const clickedEmojisLength = clickedEmojisList.length;

    if (isEmojiPresent) {
      finishGameAndSetTopScore(clickedEmojisLength);
    } else {
      if (emojisList.length - 1 === clickedEmojisLength) {
        finishGameAndSetTopScore(emojisList.length);
      }
      setClickedEmojisList((prevList) => [...prevList, id]);
    }
  };

  const getShuffledEmojisList = () => {
    return emojisList.sort(() => Math.random() - 0.5);
  };

  const renderEmojisList = () => {
    const shuffledEmojisList = getShuffledEmojisList();

    return (
      <ul className="w-[100%] md:w-[80%] m-auto gap-3 flex justify-center items-center flex-wrap bg-slate-50 p-5 shadow-xl rounded-xl">
        {shuffledEmojisList.map((emojiObject) => (
          <li key={emojiObject.id} className="emoji-item">
            <button
              type="button"
              className="emoji-btn p-2 border rounded-lg shadow-sm hover:bg-gray-100"
              onClick={() => clickEmoji(emojiObject.id)}
            >
              <img
                className="emoji-icon w-16 h-16  hover:scale-110 transition-transform duration-300"
                src={emojiObject.emojiUrl}
                alt={emojiObject.emojiName}
              />
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const renderScoreCard = () => {
    const isWon = clickedEmojisList.length === emojisList.length;

    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white shadow-md rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            {isWon ? 'You Won' : 'You Lose'}
          </h1>
          <p className="mt-2 text-lg">{isWon ? 'Best Score' : 'Score'}</p>
          <p className="text-xl font-semibold">
            {clickedEmojisList.length}/12
          </p>
          <button
            type="button"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
        <div className="mt-4">
          <img
            className="w-32 h-32 object-cover"
            src={isWon ? WON_IMAGE : LOSE_IMAGE}
            alt={isWon ? 'Won' : 'Lose'}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="app-container min-h-screen flex flex-col items-center bg-blue-50 p-4">
      <div className="w-full max-w-lg bg-purple-300 p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-white">Score: {clickedEmojisList.length}</p>
          <p className="text-lg font-semibold text-white">Top Score: {topScore}</p>
        </div>
      </div>
      <div className="emoji-game-body w-full max-w-lg">
        {isGameInProgress ? renderEmojisList() : renderScoreCard()}
      </div>
    </div>
  );
};

export default EmojiGame;
