import MatchingGameCopy from "./MatchingGameCopy"
import { Planets } from "../constants"

const MatchingGamePlanets = () => {
  return (
    <div>
        <MatchingGameCopy gameData={Planets} title="Match the Planets with names"/>
    </div>
  )
}

export default MatchingGamePlanets