import { easyLetters2,easyWords2 } from "../constants"
import MissingLetterCopy from "./MissingLetterCopy"
const MissingLettersEasyTwo = () => {
  return (
    <div>
        <MissingLetterCopy letters={easyLetters2} words={easyWords2}/>
    </div>
  )
}

export default MissingLettersEasyTwo