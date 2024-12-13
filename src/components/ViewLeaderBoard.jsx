// import MobileNavs from "./MobieNavs"
// import Sidebar from "./Sidebar"
import ViewRank from "./ViewRank"


const ViewLeaderBoard = () => {
  return (
    <div className="h-screen">
      <div className="md:col-span-10 m-2 p-5 overflow-y-auto hidden-scrollbar ">
        <ul className="flex justify-between font-sans mb-2 items-center bg-purple-200 text-blue-700 rounded-xl p-4">
          <li>Rank</li>
          <li>Learners</li>
          <li>Score</li>
          <li>Streak</li>
        </ul>
        <ViewRank/>
      </div>
      {/* <div className="md:hidden fixed bottom-0 left-0 w-full">
        <MobileNavs />
      </div> */}
    </div>

  )
}

export default ViewLeaderBoard