import { weatherQuestions } from "../constants"
import OddOneOutCopy from "./OddOneOutCopy"

const OddOneOutWhether = () => {
  return (
    <div>
        <OddOneOutCopy questions={weatherQuestions}/>
    </div>

  )
}

export default OddOneOutWhether