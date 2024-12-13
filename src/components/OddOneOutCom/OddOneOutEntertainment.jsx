import { entertainmentQuestions } from "../constants"
import OddOneOutCopy from "./OddOneOutCopy"

const OddOneOutEntertainment = () => {
  return (
    <div>
        <OddOneOutCopy questions={entertainmentQuestions}/>
    </div>
  )
}

export default OddOneOutEntertainment