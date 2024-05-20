"use client";
import { auth } from "@/config/firebase";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import StatsIcon from "@/public/dashboardAssets/statsicon.svg";
import CalendarIcon from "@/public/dashboardAssets/calendaricon.svg";
import ProfileIcon from "@/public/dashboardAssets/profileicon.svg";
import LogOutIcon from "@/public/dashboardAssets/logouticon.svg";
import UserIcon from "@/public/components/navbar_components/userimage.png";

const ClientCard = ({ name, email, handlePaging, currPage }) => {
  const router = useRouter();

  const SignOut = async () => {
    await signOut(auth)
      .then((response) => {
        router.push("/sign-in");
      })
      .catch((e) => {
        console.log("Logout Catch ", e.message);
      });
  };

  return (
    <div className="relative rounded-[10px] bg-[#FAFAFA] w-full lg:w-[300px] max-w-[365px] pt-16 pb-12 flex flex-col items-center justify-center lg:space-y-6 mx-2 lg:mx-0 px-4 lg:px-6 tracking-wider">
      <div className="h-28 lg:h-36 rounded-tl-[10px] rounded-tr-[10px] bg-[#F26524] absolute top-0 w-full z-10"></div>
      {/* Client Profile */}
      <div className="flex flex-col items-center justify-center lg:space-y-1 z-20">
        <div className="bg-gray-300 w-24 h-24 rounded-full border-[3px] border-white ">
          <Image src={UserIcon} alt="user-icon"/>
        </div>
        <p className="font-extrabold lg:text-base">{name}</p>
        <p className="font-bold text-gray-600 lg:text-xs">{email}</p>
      </div>
      {/* SERVICES */}
      <div className="w-full items-start pt-4 lg:pt-0">
        <p className="font-extrabold pb-2 lg:text-base">SERVICES</p>
        <div
          onClick={() => handlePaging(1)}
          className={`flex flex-row items-center ${
            currPage == 1 ? "border-l-4 border-green2 pl-2 bg-[#53887B4D]" : ""
          } space-x-2 py-1 hover:bg-[#53887B4D] text-gray-600 hover:text-[#53887B]`}
        >
          <Image
            src={StatsIcon}
            width={25}
            sizes="(max-width: 1024px) 25px"
            alt="stats-icon"
          />
          <p className="font-semibold lg:text-sm">Stats</p>
        </div>
        <div
          onClick={() => handlePaging(2)}
          className={`flex flex-row items-center ${
            currPage == 2 ? "border-l-4 border-green2 pl-2 bg-[#53887B4D]" : ""
          } space-x-2 py-1 hover:bg-[#53887B4D] text-gray-600 hover:text-[#53887B]`}
        >
          <Image
            src={CalendarIcon}
            width={25}
            sizes="(min-width: 1024px) 25px"
            alt="calendar-icon"
          />
          <p className="font-semibold lg:text-sm">Bookings</p>
        </div>
      </div>

      {/* ACCOUNT */}
      <div className="w-full items-start">
        <p className="font-extrabold pb-2 lg:text-base">ACCOUNT</p>
        <div
          onClick={() => handlePaging(3)}
          className={`flex flex-row items-center ${
            currPage == 3 ? "border-l-4 border-green2 pl-2 bg-[#53887B4D]" : ""
          } space-x-2 py-1 hover:bg-[#53887B4D] text-gray-600 hover:text-[#53887B]`}
        >
          <Image src={ProfileIcon} width={25} alt="profile-icon" />
          <p className="font-semibold lg:text-sm">Personal Info</p>
        </div>
        <div
          onClick={() => SignOut()}
          className={`flex flex-row items-center ${
            currPage == 4 ? "border-l-4 border-green2 pl-2 bg-[#53887B4D]" : ""
          } space-x-2 py-1 hover:bg-[#53887B4D] text-gray-600 hover:text-[#53887B]`}
        >
          <Image src={LogOutIcon} width={25} alt="logout-icon" />
          <p className="font-semibold lg:text-sm">Log out</p>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
