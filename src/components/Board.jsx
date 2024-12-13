/* eslint-disable react/prop-types */


const Board = ({ guesses, invalidGuess }) => {
  return (
    <div
      role="grid"
      aria-label="Wordle board"
      className="grid grid-rows-6 gap-2"
    >
      {guesses.map((guess, rowIndex) => (
        <div
          key={rowIndex}
          role="row"
          aria-label={`Guess ${rowIndex + 1}`}
          className={`grid grid-cols-5 gap-2 ${
            invalidGuess && rowIndex === guesses.length - 1 ? "animate-shake" : ""
          }`}
        >
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <div
              key={colIndex}
              role="gridcell"
              aria-label={guess[colIndex] || "Empty cell"}
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-lg font-bold border-2 bg-gray-800 text-white"
            >
              {guess[colIndex] || ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
