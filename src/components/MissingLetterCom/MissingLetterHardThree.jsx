import { hardLetters3,hardWords3 } from "../constants"
import MissingLetterCopy from "./MissingLetterCopy"

const MissingLetterHardThree = () => {
  return (
    <div>
        <MissingLetterCopy words={hardWords3} letters={hardLetters3}/>
    </div>
  )
}

export default MissingLetterHardThree