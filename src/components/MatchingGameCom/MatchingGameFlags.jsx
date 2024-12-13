import MatchingGameCopy from "./MatchingGameCopy"
import { Countries } from "../constants"

const MatchingGameFlags = () => {
  return (
    <div>
        <MatchingGameCopy gameData={Countries} title="Match the Countries with Flags"/>
    </div>
  )
}

export default MatchingGameFlags