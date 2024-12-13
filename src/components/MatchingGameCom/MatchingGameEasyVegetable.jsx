import { Vegetables } from "../constants";

import MatchingGameCopy from "./MatchingGameCopy"; 



const MatchingGameEasyVegetable = () => {
  return (
    <div>
        <MatchingGameCopy gameData={Vegetables} title="Match the vegetables"/>
    </div>
  )
}

export default MatchingGameEasyVegetable