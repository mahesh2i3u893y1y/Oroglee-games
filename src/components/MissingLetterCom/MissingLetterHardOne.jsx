import { hardLetters1 ,hardWords1} from "../constants"
import MissingLetterCopy from "./MissingLetterCopy"

const MissingLetterHardOne = () => {
  return (
    <div>
        <MissingLetterCopy letters={hardLetters1} words={hardWords1}/>
    </div>
  )
}

export default MissingLetterHardOne