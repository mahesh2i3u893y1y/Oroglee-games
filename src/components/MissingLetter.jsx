import { useState } from "react";
import Confetti from "react-confetti";

const SilentLetterActivity = () => {
    // Letters and words with blanks
    const letters = ["h", "u", "b", "t", "w"];
    const words = [
        { word: "g_ess", letter: "u" },
        { word: "thum_", letter: "b" },
        { word: "r_yme", letter: "h" },
        { word: "lis_en", letter: "t" },
        { word: "s_ord", letter: "w" },
    ];

    // State for inputs, submission, and confetti
    const [inputs, setInputs] = useState(Array(words.length).fill(""));
    const [isCompleted, setIsCompleted] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Window size for confetti
    
    // Update window size on resize
  

    // Handle input change
    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    // Handle submit
    const handleSubmit = () => {
        const allCorrect = inputs.every((input, i) => input === words[i].letter);
        setIsSubmitted(true);
        if (allCorrect) {
            setIsCompleted(true);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto text-center relative ">
            {/* Congratulatory Message and Confetti */}

            <h1 className="text-2xl font-bold mb-4 mt-10">Silent Letter Activity</h1>

            {isSubmitted && isCompleted && (
                <>
                    <Confetti width={800} height={500} numberOfPieces={500} recycle={false} />
                    <div className="  bg-green-300  text-lg font-bold my-2 text-green-600">
                        Congratulations! You completed the activity!
                    </div>
                </>
            )}
            <div className="bg-orange-300 p-4 m-3 flex flex-col justify-center items-center rounded-md" >
                <p className="mb-4 text-lg">Shh! Correctly match the Silent letters to the gaps in each of these words.</p>
                {/* Letters to use */}
                <div className="flex justify-center gap-4 mb-6 bg-orange-600 sm:w-2/5  p-2 rounded-lg">
                    {letters.map((letter, index) => (
                        <div
                            key={index}
                            className=" text-white font-bold rounded-full text-lg  flex justify-center items-center"
                        >
                            {letter}
                        </div>
                    ))}
                </div>
            </div>

            {/* Words with blanks */}
            <div className="grid grid-cols-3 gap-4">
                {words.map((wordObj, index) => (
                    <div key={index} className="text-lg flex justify-center items-center gap-2">
                        <span>{wordObj.word.split("_")[0]}</span>
                        <input
                            type="text"
                            maxLength="1"
                            value={inputs[index]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className="w-5 h-5 border-b-2 border-gray-300 text-center text-lg focus:outline-none  "
                        />
                        <span>{wordObj.word.split("_")[1]}</span>
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600"
            >
                Submit
            </button>

            {/* Error Message if incorrect */}
            {isSubmitted && !isCompleted && (
                <div className="mt-6 p-4 bg-red-500 text-white text-lg font-bold rounded">
                    Oops! Some answers are incorrect. Try again!
                </div>
            )}
        </div>
    );
};

export default SilentLetterActivity;
