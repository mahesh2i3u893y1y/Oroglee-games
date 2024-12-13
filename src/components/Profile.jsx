// import Sidebar from "./Sidebar";
import { LuUser2 } from "react-icons/lu";
import { CiCalendarDate } from "react-icons/ci";
import { SlGlobe } from "react-icons/sl";
import { TbMessageLanguage } from "react-icons/tb";
import { IoChatbubblesOutline } from "react-icons/io5";
// import MobileNavs from "./MobieNavs";

const Profile = () => {
  return (
    <div className=" bg-slate-100 min-h-full md:min-h-screen pb-10 md:pb-0">
      {/* Sidebar - Visible on medium screens and up */}
      

      {/* Main Content */}
      <div className="col-span-12  flex flex-col md:flex md:flex-row w-full p-5 md:p-8 lg:p-10">
        {/* Sidebar User Info */}
        <div className="p-3 md:p-5 w-full lg:w-[30%]">
          <div className="flex flex-col mb-8 md:mb-16">
            <LuUser2 className="text-[30px] md:text-[40px] text-purple-700" />
            <h1 className="font-semibold font-sans self-start text-lg md:text-xl">Mahesh</h1>
            <p className="text-sm md:text-base self-start">mahesh@gmail.com</p>
          </div>
          <ul className="md:block flex flex-col space-y-2">
            <li className="font-semibold text-purple-600 text-[16px] md:text-[18px]">Personal information</li>
            <li className="text-sm md:text-base">Billing & Payments</li>
            <li className="text-sm md:text-base">Orders History</li>
            <li className="text-sm md:text-base">Gift Cards</li>
          </ul>
        </div>

        {/* Profile Info */}
        <div className="w-full lg:w-[70%] p-5 md:p-8 lg:p-10 gap-2">
          <h1 className="font-sans text-[20px] md:text-[24px] font-semibold">Personal information</h1>
          <p className="text-xs md:text-sm mb-5">Manage your personal information, including phone numbers and email address where you can be contacted.</p>
          
          {/* Information Cards */}
          <ul className="flex flex-wrap gap-3">
            <li className="bg-white w-full md:w-5/12 flex justify-between p-3 md:p-4 rounded-lg shadow-lg">
              <div>
                <h1 className="font-semibold font-sans text-sm md:text-base">Name</h1>
                <p className="text-xs md:text-sm font-sans">Mahesh</p>
              </div>
              <LuUser2 className="text-[18px] md:text-[20px] text-purple-700" />
            </li>
            <li className="bg-white w-full md:w-5/12 flex justify-between p-3 md:p-4 rounded-lg shadow-lg">
              <div>
                <h1 className="font-semibold font-sans text-sm md:text-base">Date of Birth</h1>
                <p className="text-xs md:text-sm font-sans">28 Dec 2002</p>
              </div>
              <CiCalendarDate className="text-[18px] md:text-[20px] text-purple-700" />
            </li>
            <li className="bg-white w-full md:w-5/12 flex justify-between p-3 md:p-4 rounded-lg shadow-lg">
              <div>
                <h1 className="font-semibold font-sans text-sm md:text-base">Country Region</h1>
                <p className="text-xs md:text-sm font-sans">Andhra Pradesh</p>
              </div>
              <SlGlobe className="text-[18px] md:text-[20px] text-purple-700" />
            </li>
            <li className="bg-white w-full md:w-5/12 flex justify-between p-3 md:p-4 rounded-lg shadow-lg">
              <div>
                <h1 className="font-semibold font-sans text-sm md:text-base">Language</h1>
                <p className="text-xs md:text-sm font-sans">Telugu</p>
              </div>
              <TbMessageLanguage className="text-[18px] md:text-[20px] text-purple-700" />
            </li>
            <li className="bg-white w-full md:w-5/12 flex justify-between p-3 md:p-4 rounded-lg shadow-lg">
              <div>
                <h1 className="font-semibold font-sans text-sm md:text-base">Contactable at</h1>
                <p className="text-xs md:text-sm font-sans">mahesh@gmail.com</p>
              </div>
              <IoChatbubblesOutline className="text-[18px] md:text-[20px] text-purple-700" />
            </li>
          </ul>
        </div>
      </div>

      {/* MobileNavs - Visible only on smaller screens */}
      {/* <div className="md:hidden fixed bottom-0 left-0 w-full">
        <MobileNavs />
      </div> */}
    </div>
  );
};

export default Profile;
