import { useState } from "react";

const MonkeyActivity = () => {
    // State to store user answers
    const [answers, setAnswers] = useState({
        blue: "",
        green: "",
        white: "",
        black: "",
    });

    const [isCorrect, setIsCorrect] = useState(false);

    // Default answers
    const correctAnswers = {
        blue: "0",
        green: "3",
        white: "4",
        black: "2",
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const areAnswersCorrect =
            answers.blue === correctAnswers.blue &&
            answers.green === correctAnswers.green &&
            answers.white === correctAnswers.white &&
            answers.black === correctAnswers.black;

        setIsCorrect(areAnswersCorrect);
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers((prev) => ({ ...prev, [name]: value }));
    };

    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="font-bold text-3xl p-3 ">Decode the password</h1>
            <p className="bg-pink-500 text-white font-semibold p-5 rounded-sm">Answer the following questions and write down the 4-digit password to free the caged Monkey!</p>
             {isCorrect && (
                <div className="">
                    <p className="text-green-600 text-center font-medium text-lg md:text-2xl">
                        🎉 Congratulations! The monkey is out of the cage!
                    </p>
                </div>
            )}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Questions Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        Monkey in the Cage Activity
                    </h1>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-700 font-medium">
                                🟦 How many blue stones do you see?
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 font-medium">
                                🟩 How many green stones do you see?
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 font-medium">
                                ⬜ How many white stones do you see?
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 font-medium">
                                ⬛ How many black stones do you see?
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image Section with Password Inputs */}
                <div className="relative">
                    <img
                        src={
                            isCorrect
                                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKf_vRuRuoesbtcl1zMpO7CZaD4pJTTx-uaA&s"
                                : "https://png.pngtree.com/png-clipart/20220125/original/pngtree-monkey-in-a-cage-png-image_7211360.png"
                        }
                        alt="Monkey"
                        className="w-full md:w-96 h-72 object-contain"
                    />
                    {!isCorrect && (
                        <form
                            className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex justify-center items-center gap-2">
                                <input
                                    type="text"
                                    name="blue"
                                    value={answers.blue}
                                    onChange={handleChange}
                                    className="w-10 h-10 border-2 border-blue-400 rounded outline-none bg-transparent text-center bg-gray-200"
                                />
                                <input
                                    type="text"
                                    name="green"
                                    value={answers.green}
                                    onChange={handleChange}
                                    className="w-10 h-10 rounded border-2 border-green-400 outline-none bg-transparent text-center bg-gray-200"
                                />
                                <input
                                    type="text"
                                    name="white"
                                    value={answers.white}
                                    onChange={handleChange}
                                    className="w-10 h-10 border-2 border-white outline-none rounded bg-transparent text-center bg-gray-200"
                                />
                                <input
                                    type="text"
                                    name="black"
                                    value={answers.black}
                                    onChange={handleChange}
                                    className="w-10 h-10 border-2 border-black outline-none rounded bg-transparent text-center bg-gray-200"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>

    );
};

export default MonkeyActivity;
