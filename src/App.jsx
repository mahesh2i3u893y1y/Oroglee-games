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
import Sudoko from "./components/Sudoko";
import MazeGame from "./components/MazeGame";
import Madeness from "./components/Madeness";
import MatchingGame from "./components/MatchingGame";
import SpotTheDifferenceGame from "./components/SpotDifferences";
import ShadowGame from "./components/ShadowGame";
import DotsGame from "./components/DotsGame";
import GuessNumber from "./components/GuessNumber";
import MathsQuiz from "./components/MathsQuiz";
import MissingNumber from "./components/MissingNumber";
import OddOneOut from "./components/OddOneOut";
import ReorderGame from "./components/ReorderGame";
import FindIt from "./components/FindIt";
import MissingLetter from "./components/MissingLetter";
import NumberPattern from "./components/NumberPattern";
import MoonActivity from "./components/MoonActivity";
import Monkey from "./components/Monkey";
import BodmasMaths from "./components/BodmasMaths";
import QuickTap from "./components/QuickTap";
import RevealImage from "./components/RevealImage";
import SpinWheel from "./components/SpinWheel";
import SpinWithMath from "./components/SpinWithMath";
import Layout from "./components/Layout";
import GameRules from "./components/GameRules";
import { Provider } from "react-redux";
import store from "./Utilities/gameStore"
import BrushedResults from "./components/BrushedResults";
// import GameTesting from "./components/GameTesting";
import MatchingGameEasyVegetable from "./components/MatchingGameCom/MatchingGameEasyVegetable";
import MatchingGameEasyFruits from "./components/MatchingGameCom/MatchingGameEasyFruits";
import MadnessEasy from "./components/MadnessGameCom/MadnessEasy";
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
              <Route element={<Layout />}>
                <Route path="/home" element={<Body />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/badges" element={<Badges />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/leaderBoard" element={<ViewLeaderBoard />} />
                <Route path="/streak" element={<Leadership />} />
              </Route>
              <Route path="/testing-game" element={<MatchingGameEasyFruits/>} />
              <Route path="/vegetables" element={<MatchingGameEasyVegetable/>}/>
              <Route path="/professions" element={<MadnessEasy/>} />
              <Route path="/game-rules" element={<GameRules/>}/>
              <Route path="games-landing" element={<BrushedResults/>}/>
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
                <Route path="sudoko" element={<Sudoko />} />
                <Route path="maze" element={<MazeGame />} />
                <Route path="madness" element={<Madeness />} />
                <Route path="matching-game" element={<MatchingGame />} />
                <Route path="differences" element={<SpotTheDifferenceGame />} />
                <Route path="shadow-game" element={<ShadowGame />} />
                <Route path="dots-game" element={<DotsGame />} />
                <Route path="tooth-defender" element={<GuessNumber />} />
                <Route path="maths-quiz" element={<MathsQuiz />} />
                <Route path="missing-number" element={<MissingNumber />} />
                <Route path="odd-one-out" element={<OddOneOut />} />
                <Route path="reorder-it" element={<ReorderGame />} />
                <Route path="find-it" element={<FindIt />} />
                <Route path="missing-letter" element={<MissingLetter />} />
                <Route path="number-pattern" element={<NumberPattern />} />
                <Route path="moon-game" element={<MoonActivity />} />
                <Route path="monkey-game" element={<Monkey />} />
                <Route path="bodmas-maths" element={<BodmasMaths />} />
                <Route path="quick-tap" element={<QuickTap />} />
                <Route path="image-suspense" element={<RevealImage />} />
                <Route path="spin-wheel" element={<SpinWheel />} />
                <Route path="spin-math" element={<SpinWithMath />} />
              </Route>
            </Routes>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
            <MobileNavs />
          </div>
        </div>
      </Router>
    </StreakProvider>
    </Provider>
  );
};


export default App;
