import { animalQuestions } from "../constants"
import OddOneOutCopy from "./OddOneOutCopy"

const OddOneOutAnimal = () => {
  return (
    <div>
        <OddOneOutCopy questions={animalQuestions}/>
    </div>
  )
}

export default OddOneOutAnimal