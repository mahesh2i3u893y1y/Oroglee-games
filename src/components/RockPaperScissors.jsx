import  { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const choicesList = [
  {
    id: "ROCK",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png",
  },
  {
    id: "SCISSORS",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png",
  },
  {
    id: "PAPER",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png",
  },
];

const RockPaperScissors = () => {
  const [isShow, setIsShow] = useState(true);
  const [newArray, setNewArray] = useState([choicesList[0], choicesList[1]]);
  const [text, setText] = useState("YOU WON");
  const [score, setScore] = useState(0);

  const getResult = (item1, item2) => {
    if (item1.id === "ROCK") {
      switch (item2.id) {
        case "PAPER":
          return "YOU LOSE";
        case "SCISSORS":
          return "YOU WON";
        default:
          return "IT IS DRAW";
      }
    } else if (item1.id === "PAPER") {
      switch (item2.id) {
        case "ROCK":
          return "YOU WON";
        case "SCISSORS":
          return "YOU LOSE";
        default:
          return "IT IS DRAW";
      }
    } else {
      switch (item2.id) {
        case "ROCK":
          return "YOU LOSE";
        case "PAPER":
          return "YOU WON";
        default:
          return "IT IS DRAW";
      }
    }
  };

  const restartGame = () => {
    setIsShow(true);
  };

  const checkResult = (id) => {
    const choice2 = choicesList[Math.floor(Math.random() * choicesList.length)];
    const choice1 = choicesList.find((choice) => choice.id === id);
    const result = getResult(choice1, choice2);
    let newScore = score;
    if (result === "YOU WON") {
      newScore += 1;
    } else if (result === "YOU LOSE") {
      newScore -= 1;
    }
    setScore(newScore);
    setNewArray([choice1, choice2]);
    setText(result);
    setIsShow(false);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen  bg-blue-900 p-10">
      {/* Score View */}
      <div className="flex justify-between items-center p-2 w-4/5 border border-white rounded-lg bg-transparent">
        <h1 className="text-white text-lg font-bold">
          ROCK
          <br />
          PAPER
          <br />
          SCISSORS
        </h1>
        <div className="flex flex-col items-center bg-white p-2 w-20 rounded-lg">
          <p className="text-blue-900 text-sm font-bold">Score</p>
          <p className="text-blue-900 text-4xl font-bold">{score}</p>
        </div>
      </div>

      {/* Game View */}
      <div className="flex flex-wrap justify-center items-center w-96 mt-12">
        {isShow ? (
          choicesList.map((choice) => (
            <button
              key={choice.id}
              className="m-2 w-36 h-36 bg-transparent border-none"
              onClick={() => checkResult(choice.id)}
            >
              <img
                src={choice.imageUrl}
                alt={choice.id}
                className="w-full h-full"
              />
            </button>
          ))
        ) : (
          <>
            <div className="flex flex-col items-center m-4">
              <p className="text-white text-xl">YOU</p>
              <img
                src={newArray[0].imageUrl}
                alt="your choice"
                className="w-36 h-36"
              />
            </div>
            <div className="flex flex-col items-center m-4">
              <p className="text-white text-xl">OPPONENT</p>
              <img
                src={newArray[1].imageUrl}
                alt="opponent choice"
                className="w-36 h-36"
              />
            </div>
            <div className="flex flex-col items-center m-4">
              <p className="text-white text-2xl">{text}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={restartGame}
              >
                PLAY AGAIN
              </button>
            </div>
          </>
        )}
      </div>

      {/* Rules View */}
      <Popup
        modal
        trigger={
          <button className="mt-auto px-4 py-2 bg-white text-blue-900 rounded-md">
            RULES
          </button>
        }
      >
        {(close) => (
          <div className="flex flex-col items-center p-4 bg-white rounded-lg h-90">
            <button
              className="self-end text-blue-900 text-2xl"
              onClick={close}
            >
              <RiCloseLine />
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
              alt="rules"
              className="w-[60%] h-[60%] mt-4"
            />
          </div>
        )}
      </Popup>
    </div>
  );
};

export default RockPaperScissors;
