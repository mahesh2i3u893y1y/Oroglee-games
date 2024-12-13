import MissingLetterCopy from "./MissingLetterCopy"
import { letters,words } from "../constants"
const MissingLetterMain = () => {
  return (
    <div>
        <MissingLetterCopy letters={letters} words={words}/>
    </div>
  )
}

export default MissingLetterMain