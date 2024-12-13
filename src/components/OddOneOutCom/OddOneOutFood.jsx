import { foodQuestions } from "../constants"
import OddOneOutCopy from './OddOneOutCopy'

const OddOneOutFood = () => {
  return (
        <div>
            <OddOneOutCopy questions={foodQuestions}/>
        </div>
  )
}

export default OddOneOutFood