import { easyLetters1,easyWords1 } from "../constants"
import MissingLetterCopy from "./MissingLetterCopy"

const MissingLettersEasyOne = () => {
  return (
    <div>
        <MissingLetterCopy letters={easyLetters1} words={easyWords1}/>
    </div>
  )
}

export default MissingLettersEasyOne