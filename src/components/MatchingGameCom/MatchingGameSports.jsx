import { Sports } from "../constants"
import MatchingGameCopy from "./MatchingGameCopy"

const MatchingGameSports = () => {
  return (
    <div>
        <MatchingGameCopy gameData={Sports} title="Match the Sports with Names"/>
    </div>
  )
}

export default MatchingGameSports