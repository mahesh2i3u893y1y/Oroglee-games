import { useNavigate } from "react-router"
import { unlockRandomGame } from "../Utilities/gamesDataSlice"
import { useDispatch } from "react-redux"


const BrushedResults = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hanldeGameButton = () => {
        dispatch(unlockRandomGame())
        navigate("/games/displaygames")
    }
    
  return (
    <div className="text-center p-5">
        <h1 className="text-2xl font-bold">🥳🎊🎊🎊You have unlocked one more Game🎊🎊🎊🥳</h1>
        <button className="bg-purple-500 px-4 py-2 text-white font-bold rounded-md my-2"
        onClick={hanldeGameButton}>Start game</button>
    </div>
  )
}

export default BrushedResults