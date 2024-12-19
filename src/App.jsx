import Body from "./components/Body";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/Profile";
import Badges from "./components/Badges";
import Journey from "./components/Journey";
import Leadership from "./components/Leadership";
import { StreakProvider } from "./components/StreakContext";
import ViewLeaderBoard from "./components/ViewLeaderBoard";
import MobileNavs from "./components/MobieNavs";
import Games from "./components/Games";
import MeomoryFlipGame from "./components/MeomoryFlipGame";
import DisplayGames from "./components/DisplayGames";
import Puzzle from "./components/Puzzle";
import FruitCatcher from "./components/FruitCatcher";
import EmojiGame from "./components/EmojiGame";
import TikTacToe from "./components/TicTacToe";
import SnakeGame from "./components/SnakeGame";
import Sketch from "./components/Sketch";
import RockPaperScissors from "./components/RockPaperScissors";
import WordGame from "./components/WordGame";
import TwoZeroFourEight from "./components/TwoZeroFourEight";
import EasySudoku from "./components/SudokuGamesCom/EasySudoku";
import MediumSudoku from "./components/SudokuGamesCom/MediumSudoku";

import MazeGame from "./components/MazeGame";
import MadenessEasy from "./components/MadnessGameCom/MadnessEasy";
import MadnessMedium from "./components/MadnessGameCom/MadnessMedium";
import MadnessHard from "./components/MadnessGameCom/MadnessHard";
import MatchingGameAnimals from "./components/MatchingGameCom/MatchingGameAnimals";
import MatchingGameEasyFruits from "./components/MatchingGameCom/MatchingGameEasyFruits";
import MatchingGameEasyVegetable from "./components/MatchingGameCom/MatchingGameEasyVegetable";
import MatchingGameCars from "./components/MatchingGameCom/MatchingGameCars";
import MatchingGameSports from "./components/MatchingGameCom/MatchingGameSports";
import MatchingGameFlags from "./components/MatchingGameCom/MatchingGameFlags";
import MatchingGamePlanets from "./components/MatchingGameCom/MatchingGamePlanets";
import MatchingGameProfessions from "./components/MatchingGameCom/MatchingGameProfessions";
import MatchingGameProducts from "./components/MatchingGameCom/MatchingGameProducts";
import SpotTheDifferenceGame from "./components/SpotDifferences";
import ShadowGame from "./components/ShadowGame";
import DotsGame from "./components/DotsGame";
import GuessNumber from "./components/GuessNumber";
import MathsQuizEasy from "./components/MathsQuizCom/MathsQuizEasy";
import MathsQuizMedium from "./components/MathsQuizCom/MathsQuizMedium";
import MathsQuizHard from "./components/MathsQuizCom/MathsQuizHard";
import MissingNumber from "./components/MissingNumber";
import OddOneOutMain from "./components/OddOneOutCom/OddOneOutMain";
import OddOneOutTravel from "./components/OddOneOutCom/OddOneOutTravel";
import OddOneOutAnimal from "./components/OddOneOutCom/OddOneOutAnimal";
import OddOneOutEntertainment from "./components/OddOneOutCom/OddOneOutEntertainment";
import OddOneOutFestive from "./components/OddOneOutCom/OddOneOutFestive";
import OddOneOutProfession from "./components/OddOneOutCom/OddOneOutProfession";
import OddOneOutWhether from "./components/OddOneOutCom/OddOneOutWhether";
import OddOneOutFood from "./components/OddOneOutCom/OddOneOutFood";
import OddoneOutSports from "./components/OddOneOutCom/OddoneOutSports";
import ReOrderGameMain from "./components/ReOrderGameCom/ReOrderGameMain";
import ReOrderGameEasyOne from "./components/ReOrderGameCom/ReOrderGameEasyOne";
import ReOrderGameEasyTwo from "./components/ReOrderGameCom/ReOrderGameEasyTwo";
import ReOrderGameMediumOne from "./components/ReOrderGameCom/ReOrderGameMediumOne";
import ReOrderGameMediumTwo from "./components/ReOrderGameCom/ReOrderMediumTwo";
import ReOrderGameMediumThree from "./components/ReOrderGameCom/ReOrderGameMediumThree";
import ReOrderGameHardOne from "./components/ReOrderGameCom/ReOrderGameHardOne";
import ReOrderGameHardTwo from "./components/ReOrderGameCom/ReOrderGameHardTwo";
import ReOrderGameHardThree from "./components/ReOrderGameCom/ReOrderGameHardThree";
import FindItEasyOne from "./components/FindItCom/FIndItEasyOne";
import FindItEasyTwo from "./components/FindItCom/FindItEasyTwo";
import FindItEasyThree from "./components/FindItCom/FindItEasyThree";
import FindItMediumOne from "./components/FindItCom/FindItMediumOne";
import FindItMediumTwo from "./components/FindItCom/FindItMediumTwo";
import FindItMediumThree from "./components/FindItCom/FindItMediumThree";
import FindItHardOne from "./components/FindItCom/FindItHardOne";
import FindItHardTwo from "./components/FindItCom/FindItHardTwo";
import FindItHardThree from "./components/FindItCom/FindItHardThree";
import MissingLetterMain from "./components/MissingLetterCom/MissingLetterMain";
import MissingLettersEasyOne from "./components/MissingLetterCom/MissingLettersEasyOne";
import MissingLettersEasyTwo from "./components/MissingLetterCom/MissingLettersEasyTwo";
import MissingLettersMediumOne from "./components/MissingLetterCom/MissingLettersMediumOne";
import MissingLetterMediumTwo from "./components/MissingLetterCom/MissingLetterMediumTwo";
import MissingLetterMediumtThree from "./components/MissingLetterCom/MissingLetterMediumtThree";
import MissingLetterHardOne from "./components/MissingLetterCom/MissingLetterHardOne";
import MissingLetterHardTwo from "./components/MissingLetterCom/MissingLetterHardTwo";
import MissingLetterHardThree from "./components/MissingLetterCom/MissingLetterHardThree";
import NumberPatternEasy from "./components/NumberPatternCom/NumberPatternEasy";
import NumberPatternMedium from "./components/NumberPatternCom/NumberPatternMedium";
import NumberPatternHard from "./components/NumberPatternCom/NumberPatternHard";
import MoonActivity from "./components/MoonActivity";
import Monkey from "./components/Monkey";
import BodmasMaths from "./components/BodmasMaths";
import QuickTap from "./components/QuickTap";
import RevealImage from "./components/RevealImage";
import SpinWheel from "./components/SpinWheel";
import SpinMathHard from "./components/SpinWithMathsCom/SpinMathHard";
import SpinMathEasy from "./components/SpinWithMathsCom/SpinMathEasy";
import Layout from "./components/Layout";
import GameRules from "./components/GameRules";
import { Provider } from "react-redux";
import store from "./Utilities/gameStore"
import BrushedResults from "./components/BrushedResults";
import AddGroup from "./components/AddGroup";
// import GameTesting from "./components/GameTesting";
import AddUsers from "./components/AddUsers";
import SpinMathMedium from "./components/SpinWithMathsCom/SpinMathMedium";
import SpinWithMath from "./components/SpinWithMath";

const App = () => {
  return (
    <Provider store={store}>
      <StreakProvider>
        <Router>
          {/* Main App Layout */}
          <div className="relative flex flex-col h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Routes Content */}
            <div className="flex-grow overflow-y-auto">
              <Routes>
                <Route path="/" element={<AddUsers/>} />
                <Route element={<Layout />}>
                  <Route path="/home" element={<Body />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/badges" element={<Badges />} />
                  <Route path="/journey" element={<Journey />} />
                  <Route path="/groups" element={<AddGroup/>} />
                  <Route path="/leaderBoard" element={<ViewLeaderBoard />} />
                  <Route path="/streak" element={<Leadership />} />
                </Route>
                <Route path="/game-rules" element={<GameRules />} />
                <Route path="/spin" element={<SpinWithMath/>}/>
                <Route path="games-landing" element={<BrushedResults />} />
                {/* <Route path="/games" element={<Games/>} /> */}
                <Route path="/games" element={<Games />}>
                  <Route index element={<Navigate to="displaygames" />} />
                  <Route path="displaygames" element={<DisplayGames />} />
                  <Route path="memoryflip" element={<MeomoryFlipGame />} />
                  <Route path="puzzle" element={<Puzzle />} />
                  <Route path="fruit-catcher" element={<FruitCatcher />} />
                  <Route path="emoji-game" element={<EmojiGame />} />
                  <Route path="tic-tac-toe" element={<TikTacToe />} />
                  <Route path="snake" element={<SnakeGame />} />
                  <Route path="sketch" element={<Sketch />} />
                  <Route path="rock-paper-scissor" element={<RockPaperScissors />} />
                  <Route path="fluffy-bird" element={<WordGame />} />
                  <Route path="2048" element={<TwoZeroFourEight />} />
                  <Route path="sudoko-easy" element={<EasySudoku />} />
                  <Route path="sudoko-medium" elemen={<MediumSudoku />} />
                  <Route path="maze" element={<MazeGame />} />
                  <Route path="madness/easy" element={<MadenessEasy />} />
                  <Route path="madness/medium" element={<MadnessMedium />} />
                  <Route path="madness/hard" element={<MadnessHard />} />
                  <Route path="matching/animal" element={<MatchingGameAnimals />} />
                  <Route path="matching/fruits" elemen={<MatchingGameEasyFruits />} />
                  <Route path="matching/vegetables" element={<MatchingGameEasyVegetable />} />
                  <Route path="matching/cars" element={<MatchingGameCars />} />
                  <Route path="matching/sports" element={<MatchingGameSports />} />
                  <Route path="matching/products" element={<MatchingGameProducts />} />
                  <Route path="matching/planets" element={<MatchingGamePlanets />} />
                  <Route path="matching/flags" element={<MatchingGameFlags />} />
                  <Route path="matching/professions" element={<MatchingGameProfessions />} />
                  <Route path="differences" element={<SpotTheDifferenceGame />} />
                  <Route path="shadow-game" element={<ShadowGame />} />
                  <Route path="dots-game" element={<DotsGame />} />
                  <Route path="tooth-defender" element={<GuessNumber />} />
                  <Route path="maths-quiz-easy" element={<MathsQuizEasy />} />
                  <Route path="maths-quiz-medium" element={<MathsQuizMedium />} />
                  <Route path="maths-quiz-hard" element={<MathsQuizHard />} />
                  <Route path="missing-number" element={<MissingNumber />} />
                  <Route path="odd-one-out-main" element={<OddOneOutMain />} />
                  <Route path="odd-one-out-wheather" element={<OddOneOutWhether />} />
                  <Route path="odd-one-out-travel" element={<OddOneOutTravel />} />
                  <Route path="odd-one-out-sports" element={<OddoneOutSports />} />
                  <Route path="odd-one-out-profession" element={<OddOneOutProfession />} />
                  <Route path="odd-one-out-food" element={<OddOneOutFood />} />
                  <Route path="odd-one-out-festive" element={<OddOneOutFestive />} />
                  <Route path="odd-one-out-entertainment" element={<OddOneOutEntertainment />} />
                  <Route path="odd-one-out-animal" element={<OddOneOutAnimal />} />
                  <Route path="reorder-it-easy-1" element={<ReOrderGameMain />} />
                  <Route path="reorder-it-easy-2" element={<ReOrderGameEasyOne />} />
                  <Route path="reorder-it-easy-3" element={<ReOrderGameEasyTwo />} />
                  <Route path="reorder-it-medium-1" element={<ReOrderGameMediumOne />} />
                  <Route path="reorder-it-medium-2" element={<ReOrderGameMediumTwo />} />
                  <Route path="reorder-it-medium-3" element={<ReOrderGameMediumThree />} />
                  <Route path="reorder-it-hard-1" element={<ReOrderGameHardOne />} />
                  <Route path="reorder-it-hard-2" element={<ReOrderGameHardTwo />} />
                  <Route path="reorder-it-hard-3" element={<ReOrderGameHardThree />} />
                  <Route path="findIt/easy/1" element={<FindItEasyOne />} />
                  <Route path="findIt/easy/2" element={<FindItEasyTwo />} />
                  <Route path="findIt/easy/3" element={<FindItEasyThree />} />
                  <Route path="findIt/medium/1" element={<FindItMediumOne />} />
                  <Route path="findIt/medium/2" element={<FindItMediumTwo />} />
                  <Route path="findIt/medium/3" element={<FindItMediumThree />} />
                  <Route path="findIt/hard/1" element={<FindItHardOne />} />
                  <Route path="findIt/hard/2" element={<FindItHardTwo />} />
                  <Route path="findIt/hard/3" element={<FindItHardThree />} />
                  <Route path="missing-letter-easy-1" element={<MissingLetterMain />} />
                  <Route path="missing-letter-easy-2" element={<MissingLettersEasyOne />} />
                  <Route path="missing-letter-easy-3" element={<MissingLettersEasyTwo />} />
                  <Route path="missing-letter-medium-1" element={<MissingLettersMediumOne />} />
                  <Route path="missing-letter-medium-2" element={<MissingLetterMediumTwo />} />
                  <Route path="missing-letter-medium-3" element={<MissingLetterMediumtThree />} />
                  <Route path="missing-letter-hard-1" element={<MissingLetterHardOne />} />
                  <Route path="missing-letter-hard-2" element={<MissingLetterHardTwo />} />
                  <Route path="missing-letter-hard-3" element={<MissingLetterHardThree />} />
                  <Route path="number-pattern-easy" element={<NumberPatternEasy />} />
                  <Route path="number-pattern-medium" element={<NumberPatternMedium />} />
                  <Route path="number-pattern-hard" element={<NumberPatternHard />} />
                  <Route path="moon-game" element={<MoonActivity />} />
                  <Route path="monkey-game" element={<Monkey />} />
                  <Route path="bodmas-maths" element={<BodmasMaths />} />
                  <Route path="quick-tap" element={<QuickTap />} />
                  <Route path="image-suspense" element={<RevealImage />} />
                  <Route path="spin-wheel" element={<SpinWheel />} />
                  <Route path="spin-math-easy" element={<SpinMathEasy />} />
                  <Route path="spin-math-hard" element={<SpinMathHard />} />
                  <Route path="spin-math-medium" element={<SpinMathMedium />} />
                </Route>
              </Routes>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden  fixed bottom-0 left-0 w-full z-50">
              <MobileNavs />
            </div>
          </div>
        </Router>
      </StreakProvider>
    </Provider>
  );
};


export default App;
