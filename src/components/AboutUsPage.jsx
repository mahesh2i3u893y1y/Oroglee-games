import { useNavigate } from "react-router"

const AboutUsPage = () => {
    const navigate = useNavigate()

    const handleRouting = () => {
        navigate("/home")
    }
  return (
    <div className="h-screen flex justify-center items-center">
        <button className="bg-purple-700 text-white font-semibold rounded-md px-2 py-3" onClick={handleRouting}>Start the Journey</button>
    </div>
  )
}

export default AboutUsPage