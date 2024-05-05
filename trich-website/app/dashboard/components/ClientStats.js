import Image from "next/image";
import Link from "next/link";

import Bell from "@/public/dashboardAssets/bell.svg";
import Calendar from "@/public/dashboardAssets/calendar.svg";
import Comb from "@/public/dashboardAssets/comb.svg";
import Recent from "@/public/dashboardAssets/recent.svg";
import Scissors from "@/public/dashboardAssets/scissors.svg";

const ClientStats = ({
  activebooking,
  recentbooking,
  totalbookings,
  recenthairstyle,
  recentservice,
  recentbarbermen,
}) => {
  return (
    <div className="lg:text-xs xl:text-base tracking-wider">
      <div className="flex flex-row justify-between py-4 bg-white rounded-[10px] shadow-xl">
        <div className="px-6 border-r border-r-0.5 border-gray-500">
          <div className="flex flex-row items-center justify-between">
            <p className="font-extrabold">ACTIVE BOOKINGS</p>
            <Image src={Bell} width={20} alt="bell-icon" />
          </div>
          <p className="font-light py-2">{activebooking ? activebooking : "No Active Bookings Available"}</p>
          <Link href="/">
            <p className="font-extrabold text-orange1">Book Now</p>
          </Link>
        </div>
        <div className="px-6">
          <div className="flex flex-row items-center justify-between">
            <p className="font-extrabold">MOST RECENT BOOK</p>
            <Image src={Calendar} width={20} alt="calendar-icon" />
          </div>
          <p className="font-light py-2">{recentbooking ? recentbooking : "No Recent Bookings"}</p>
          <Link href="/">
            <p className="font-extrabold text-orange1">Book Now</p>
          </Link>
        </div>
        <div className="px-6 border-l border-r-0.5 border-gray-500">
          <div className="flex flex-row items-center justify-between">
            <p className="font-extrabold">BOOKING HISTORY</p>
            <Image src={Recent} width={20} alt="recent-icon" />
          </div>
          <p className="font-light py-2">{totalbookings ? totalbookings : 0}</p>
          <Link href="/">
            <p className="font-extrabold text-orange1">View History</p>
          </Link>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-row justify-between mt-[50px]">
        <div className="flex flex-col space-y-2 bg-white rounded-[10px] px-4 py-8">
          <div className="flex flex-row items-center space-x-2">
            <p className="font-extrabold">RECENT HAIRSTYLE</p>
            <Image src={Scissors} width={20} alt="scissors-icon" />
          </div>
          <p className="font-light">{recenthairstyle ? recenthairstyle : "No Recent Hairstyle"}</p>
        </div>
        <div className="flex flex-col space-y-2 bg-white rounded-[10px] px-4 py-8">
          <div className="flex flex-row items-center space-x-2">
            <p className="font-extrabold">RECENT SERVICE</p>
            <Image src={Scissors} width={20} alt="scissors-icon" />
          </div>
          <p className="font-light">{recentservice ? recentservice : "No Recent Service"}</p>
        </div>
        <div className="flex flex-col space-y-2 bg-white rounded-[10px] px-4 py-8">
          <div className="flex flex-row items-center space-x-2">
            <p className="font-extrabold">RECENT BARBERMEN</p>
            <Image src={Scissors} width={20} alt="scissors-icon" />
          </div>
          <p className="font-light">{recentbarbermen ? recentbarbermen : "No Recent Barbermen"}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientStats;
