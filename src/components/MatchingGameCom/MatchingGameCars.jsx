import MatchingGameCopy from "./MatchingGameCopy"
import { Cars } from "../constants"

const MatchingGameCars = () => {
  return (
    <div>
        <MatchingGameCopy gameData={Cars} title="Match Cars and Brands"/>
    </div>
  )
}

export default MatchingGameCars