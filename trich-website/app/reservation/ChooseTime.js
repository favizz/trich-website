import Image from "next/image";
import { useState, useEffect } from "react";

import LeftArrow from "@/public/reservationAssets/leftarrow.svg";
import RightArrow from "@/public/reservationAssets/rightarrow.svg";

const ChooseTime = ({ date, handleDate, handleTime, handlePage }) => {
  const operationalTimes = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];
  const [pickedTime, pickTime] = useState(0);

  const handleTimePick = (input) => {
    if (input === -1) {
      if (pickedTime > 0) {
        pickTime(pickedTime - 1);
      }
    } else if (input === 1) {
      if (pickedTime < operationalTimes.length - 1) {
        // adjusted index comparison
        pickTime(pickedTime + 1);
      }
    }
  };

  useEffect(() => {
    handleTime(operationalTimes[pickedTime]);
  }, [pickedTime])

  const handleDateChange = (event) => {
    const inputDate = new Date(event.target.value);
    inputDate.setMinutes(
      inputDate.getMinutes() + inputDate.getTimezoneOffset()
    );

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      inputDate
    );

    handleDate(formattedDate);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center lg:text-sm xl:text-base 2xl:text-lg">
      <p className="text-orange1 font-semibold">Booking hanya bisa diatas tanggal 24/05/24</p>
      <input type="date" onChange={handleDateChange} className="my-4"/>
      <div className="w-full h-[0.5px] bg-gray-600 mb-8"></div>
      <div className="space-y-4 flex flex-col items-center">
        <p className="font-bold">
          <span className="text-[#545454]">Selected Date:</span> {date}
        </p>
        <p className="font-extrabold">Select Available Time</p>
        <div className="flex flex-row space-x-8">
          <Image
            onClick={() => handleTimePick(-1)}
            src={LeftArrow}
            alt="left-arrow"
          />
          <div className="text-black font-bold bg-white border border-1 border-black rounded px-6 py-2">
            {operationalTimes[pickedTime]}
          </div>
          <Image
            onClick={() => handleTimePick(1)}
            src={RightArrow}
            alt="right-arrow"
          />
        </div>
        <div
          onClick={() => date !== null ? handlePage(3) : null}
          className="border border-1 border-orange1 text-orange1 font-bold px-12 py-2 rounded"
        >
          Pay
        </div>
      </div>
    </div>
  );
};

export default ChooseTime;
