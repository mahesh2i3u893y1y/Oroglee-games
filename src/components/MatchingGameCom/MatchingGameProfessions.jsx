import MatchingGameCopy from "./MatchingGameCopy"
import { Professions } from "../constants"

const MatchingGameProfessions = () => {
  return (
    <div>
        <MatchingGameCopy gameData={Professions} title="Match the Professions"/>
    </div>
  )
}

export default MatchingGameProfessions