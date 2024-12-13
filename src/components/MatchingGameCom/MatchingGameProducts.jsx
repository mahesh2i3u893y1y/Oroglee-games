import MatchingGameCopy from "./MatchingGameCopy"
import { Products } from "../constants"

const MatchingGameProducts = () => {
  return (
    <div>
        <MatchingGameCopy gameData={Products} title="Match the name and by product"/>
    </div>
  )
}

export default MatchingGameProducts