import { festiveQuestions } from "../constants"
import OddOneOutCopy from "./OddOneOutCopy"

const OddOneOutFestive = () => {
  return (
    <div>
        <OddOneOutCopy questions={festiveQuestions}/>
    </div>
  )
}

export default OddOneOutFestive