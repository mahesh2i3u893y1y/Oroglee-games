/* eslint-disable react/prop-types */


const keys = [
  "QWERTYUIOP",
  "ASDFGHJKL",
  "ZXCVBNM",
  "ENTER BACKSPACE",
];

function Keyboard({ onKeyPress }) {
    return (
        <div
            role="keyboard"
            aria-label="Virtual keyboard"
            className="flex flex-col gap-2 mt-4"
        >
            {keys.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1">
                    {row.split(" ").map((key) => (
                        <button
                            key={key}
                            onClick={() => onKeyPress(key)}
                            className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 text-white hover:bg-gray-600 rounded"
                            aria-label={`Key ${key}`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Keyboard;
