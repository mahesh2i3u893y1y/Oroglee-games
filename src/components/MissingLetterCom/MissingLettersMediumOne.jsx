import { mediumLetters1,mediumWords1 } from "../constants"
import MissingLetterCopy from "./MissingLetterCopy"

const MissingLettersMediumOne = () => {
  return (
    <div>
        <MissingLetterCopy letters={mediumLetters1} words={mediumWords1}/>
    </div>
  )
}

export default MissingLettersMediumOne