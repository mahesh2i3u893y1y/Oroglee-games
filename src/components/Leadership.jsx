

import LeaderBoard from "./LeaderBoard"
// import MobileNavs from "./MobieNavs"
import Streak from "./Streak"


const Leadership = () => {
  return (
    <div className="w-full">
      <div className="w-full p-5">
        <LeaderBoard />
        <Streak />
      </div>
      {/* <div className="md:hidden fixed bottom-0 left-0 w-full">
        <MobileNavs />
      </div> */}
    </div>
  )
}

export default Leadership