import { travelQuestions } from "../constants"
import OddOneOutCopy from "./OddOneOutCopy"

const OddOneOutTravel = () => {
  return (
    <div>
        <OddOneOutCopy questions={travelQuestions}/>
    </div>
  )
}

export default OddOneOutTravel