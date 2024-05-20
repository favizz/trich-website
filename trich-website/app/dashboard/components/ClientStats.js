import Image from "next/image";
import Link from "next/link";

import Bell from "@/public/dashboardAssets/bell.svg";
import Calendar from "@/public/dashboardAssets/calendar.svg";
import Comb from "@/public/dashboardAssets/comb.svg";
import Recent from "@/public/dashboardAssets/recent.svg";
import Scissors from "@/public/dashboardAssets/scissors.svg";

const ClientStats = ({ bookingData, handlePage }) => {
  
  const getActiveBooking = (bookingData) => {
    const booking = bookingData?.find(booking => booking.status === 1 || booking.status === 2);
    return booking ? booking.date : null;
  };

  return (
    <div className="pb-16 lg:pb-0 lg:text-xs xl:text-base tracking-wider">
      <div className="flex flex-col lg:flex-row justify-between py-4 bg-white rounded-[10px] space-y-4 lg:space-y-0 shadow-xl">
        <div className="px-6 py-2 lg:py-0 border-b border-b-0.5 lg:border-b-0 lg:border-r lg:border-r-0.5 border-gray-500">
          <div className="flex flex-row items-center justify-between">
            <p className="font-extrabold">ACTIVE BOOKINGS</p>
            <Image src={Bell} width={20} alt="bell-icon" />
          </div>
          <p className="font-light py-2">
            {getActiveBooking(bookingData) ? getActiveBooking(bookingData).date : "No Active Bookings Available"}
          </p>
          <Link href="/reservation">
            <p className="font-extrabold text-orange1">Book Now</p>
          </Link>
        </div>
        <div className="px-6">
          <div className="flex flex-row items-center justify-between">
            <p className="font-extrabold">MOST RECENT BOOK</p>
            <Image src={Calendar} width={20} alt="calendar-icon" />
          </div>
          <p className="font-light py-2">
            {getActiveBooking(bookingData) ? getActiveBooking(bookingData).date : "No Recent Bookings"}
          </p>
          <Link href="/reservation">
            <p className="font-extrabold text-orange1">Book Now</p>
          </Link>
        </div>
        <div className="px-6 py-2 lg:py-0 border-t border-t-0.5 lg:border-t-0 lg:border-l lg:border-r-0.5 border-gray-500">
          <div className="flex flex-row items-center justify-between">
            <p className="font-extrabold">BOOKING HISTORY</p>
            <Image src={Recent} width={20} alt="recent-icon" />
          </div>
          <p className="font-light py-2">{bookingData ? bookingData.length : 0}</p>
          <p
            onClick={() => handlePage(2)}
            className="font-extrabold text-orange1"
          >
            View History
          </p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col lg:flex-row justify-between mt-[50px] space-y-4 lg:space-y-0">
        <div className="flex flex-col space-y-2 bg-white rounded-[10px] px-4 py-8">
          <div className="flex flex-row items-center space-x-2">
            <p className="font-extrabold">RECENT HAIRSTYLE</p>
            <Image src={Scissors} width={20} alt="scissors-icon" />
          </div>
          <p className="font-light">No Recent Hairstyle</p>
        </div>
        <div className="flex flex-col space-y-2 bg-white rounded-[10px] px-4 py-8">
          <div className="flex flex-row items-center space-x-2">
            <p className="font-extrabold">RECENT SERVICE</p>
            <Image src={Scissors} width={20} alt="scissors-icon" />
          </div>
          <p className="font-light">No Recent Service</p>
        </div>
        <div className="flex flex-col space-y-2 bg-white rounded-[10px] px-4 py-8">
          <div className="flex flex-row items-center space-x-2">
            <p className="font-extrabold">RECENT BARBERMEN</p>
            <Image src={Scissors} width={20} alt="scissors-icon" />
          </div>
          <p className="font-light">No Recent Barbermen</p>
        </div>
      </div>
    </div>
  );
};

export default ClientStats;
