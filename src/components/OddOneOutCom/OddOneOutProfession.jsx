import { professionalQuestions } from "../constants"
import OddOneOutCopy from "./OddOneOutCopy"

const OddOneOutProfession = () => {
  return (
    <div>
        <OddOneOutCopy questions={professionalQuestions}/>
    </div>
  )
}

export default OddOneOutProfession