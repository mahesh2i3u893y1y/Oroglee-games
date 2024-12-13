import MatchingGameCopy from "./MatchingGameCopy"
import { Animals } from "../constants"

const MatchingGameAnimals = () => {
  return (
    <div>
        <MatchingGameCopy gameData={Animals} title="Match the Animals with Names"/>
    </div>

  )
}

export default MatchingGameAnimals