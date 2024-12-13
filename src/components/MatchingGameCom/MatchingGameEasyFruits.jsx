import MatchingGameCopy from "./MatchingGameCopy" 
import { fruits } from "../constants"

const MatchingGameEasyFruits = () => {
  return (
    <div>
        <MatchingGameCopy gameData={fruits} title="Match the Fruits" />
    </div>
  )
}

export default MatchingGameEasyFruits