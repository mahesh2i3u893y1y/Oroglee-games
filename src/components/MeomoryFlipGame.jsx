import { useState, useEffect } from 'react'


const MeomoryFlipGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(90);
    const [timerActive, setTimerActive] = useState(false);
    const [topScore, setTopScore] = useState(null);

    const images = [
        "https://cdn.pixabay.com/photo/2024/08/13/22/30/ai-generated-8967325_1280.jpg",
        "https://cdn.pixabay.com/photo/2013/05/31/20/11/toothbrush-115120_1280.jpg",
        "https://cdn.pixabay.com/photo/2023/07/20/11/00/muffin-8139065_1280.jpg",
        "https://cdn.pixabay.com/photo/2024/06/05/09/53/ai-generated-8810179_1280.jpg",
        "https://cdn.pixabay.com/photo/2020/08/27/18/30/teeth-5522650_1280.jpg",
        "https://cdn.pixabay.com/photo/2021/09/06/08/59/dentist-6601202_1280.png",
        "https://cdn.pixabay.com/photo/2023/10/19/11/18/biryani-8326234_1280.jpg",
        "https://cdn.pixabay.com/photo/2019/11/13/12/37/dessert-4623573_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/09/05/19/44/grapefruit-1647507_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/08/26/08/06/blackthorn-1621554_1280.jpg",
    ];

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const initializeGame = () => {
        const shuffledCards = shuffleArray([...images, ...images]);
        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTime(90);
        setTimerActive(false);
    };

    useEffect(() => {
        initializeGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let interval;
        if (timerActive && time > 0) {
            interval = setInterval(() => setTime((prev) => prev - 1), 1000);
        } else if (time === 0) {
            clearInterval(interval);
            setTimerActive(false);
            alert("Time's up! Better luck next time.");
        }
        return () => clearInterval(interval);
    }, [timerActive, time]);

    const handleCardClick = (index) => {
        if (!timerActive) setTimerActive(true);

        if (
            flippedCards.includes(index) ||
            matchedCards.includes(index) ||
            flippedCards.length === 2
        ) {
            return;
        }

        setFlippedCards((prev) => [...prev, index]);

        if (flippedCards.length === 1) {
            const firstIndex = flippedCards[0];
            const secondIndex = index;
            setMoves((prev) => prev + 1);

            if (cards[firstIndex] === cards[secondIndex]) {
                setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
                setFlippedCards([]);
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    useEffect(() => {
        if (matchedCards.length === cards.length && cards.length > 0) {
            setTimerActive(false);
            alert(
                `Congratulations! You completed the game in ${moves} moves and ${90 - time} seconds.`
            );

            if (!topScore || moves < topScore.moves) {
                setTopScore({ moves, time: 90 - time });
            }
        }
    }, [matchedCards, cards, moves, time, topScore]);

    return (
        <div className=" h-screen col-span-12 md:col-span-10  z-10 overflow-y-scroll">

            <h1 className="text-purple-800 text-3xl font-semibold text-center my-5">
                Memory Flip Game
            </h1>

            {/* Stats */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-5 px-5">
                <div className="text-lg font-semibold">
                    Moves: <span className="text-purple-800">{moves}</span>
                </div>
                <div className="text-lg font-semibold">
                    Time Remaining:{" "}
                    <span className="text-purple-800">{time} sec</span>
                </div>
                <button
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
                    onClick={initializeGame}
                >
                    Restart
                </button>
            </div>

            {/* Top Score */}
            {topScore && (
                <div className="text-center mb-5 text-purple-600 font-medium">
                    Top Score: {topScore.moves} moves in {topScore.time} seconds
                </div>
            )}

            {/* Game Board */}
            <div className="flex justify-center items-center flex-wrap px-1  md:grid-cols-5 gap-2 w-full  md:w-1/2 mx-auto">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="relative w-16 h-16 sm:w-20 sm:h-20"
                    >
                        <div
                            className={`relative w-full h-full bg-purple-500 rounded-md cursor-pointer transform transition-transform duration-500 ${flippedCards.includes(index) || matchedCards.includes(index)
                                ? "rotate-y-180"
                                : ""
                                }`}
                            onClick={() => handleCardClick(index)}
                        >
                            {/* Front of the card (Suspense image) */}
                            <div
                                className={`absolute w-full h-full bg-purple-400 rounded-md flex justify-center items-center ${flippedCards.includes(index) || matchedCards.includes(index)
                                    ? "hidden"
                                    : ""
                                    }`}
                            >
                                <img
                                    src="https://cdn.pixabay.com/photo/2014/09/03/07/59/question-mark-434153_1280.png" // Replace this with your image URL
                                    alt="Card front"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Back of the card (Image) */}
                            <div
                                className={`absolute w-full h-full backface-hidden rounded-md ${flippedCards.includes(index) || matchedCards.includes(index)
                                    ? "block"
                                    : "hidden"
                                    }`}
                            >
                                <img
                                    src={card}
                                    alt="card"
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default MeomoryFlipGame