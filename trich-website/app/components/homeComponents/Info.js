"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import PinIcon from "@/public/homeAssets/pinIcon.svg";
import HomeIcon from "@/public/homeAssets/homeIcon.svg";
import MailIcon from "@/public/homeAssets/mailIcon.svg";
import PhoneIcon from "@/public/homeAssets/phoneIcon.svg";
import ClockIcon from "@/public/homeAssets/clockIcon.svg";
import Map from "@/public/homeAssets/Map.png";

const Schedule = [
  {
    date: "Monday",
    hour: "10:00 - 21:00",
  },
  {
    date: "Tuesday",
    hour: "10:00 - 21:00",
  },
  {
    date: "Wednesday",
    hour: "10:00 - 21:00",
  },
  {
    date: "Thursday",
    hour: "10:00 - 21:00",
  },
  {
    date: "Friday",
    hour: "10:00 - 21:00",
  },
  {
    date: "Saturday",
    hour: "10:00 - 21:00",
  },
  {
    date: "Sunday",
    hour: "10:00 - 21:00",
  },
];

const Info = () => {
  const [imageWidth, setImageWidth] = useState(500); // Default width

  useEffect(() => {
    const updateImageWidth = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 1024) {
        setImageWidth(550);
      } else if (windowWidth <= 1280) {
        setImageWidth(600);
      } else {
        setImageWidth(750);
      }
    };

    updateImageWidth();

    window.addEventListener("resize", updateImageWidth);

    return () => {
      window.removeEventListener("resize", updateImageWidth);
    };
  }, []);
  return (
    <section className="px-6 py-8  lg:px-16 lg:py-12 xl:px-24 xl:py-16 bg-green1 flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 text-white tracking-widest">
      {/* Location and Opening Hours */}
      <div className="flex flex-col space-y-8 xl:space-y-12">
        {/* Location */}
        <div className="flex flex-row space-x-4 items-start">
          {/* Pin Icon */}
          <Image src={PinIcon} alt="Pin-Icon" />
          {/* Location Info flex-col */}
          <div className="flex flex-col space-y-4 items-start text-sm">
            <h2 className="font-bold text-2xl lg:text-3xl xl:text-4xl">
              Location
            </h2>
            <div className="flex flex-row items-center justify-center space-x-3">
              <Image src={HomeIcon} alt="Home-Icon" />
              <p className="xl:text-lg">
                Jl. Sumbawa no. 24, Merdeka, Sumur Bandung, Kota Bandung
              </p>
            </div>
            <div className="flex flex-row items-center justify-center space-x-3">
              <Image src={PhoneIcon} alt="Phone-Icon" />
              <p className="xl:text-lg">
                <a href="tel:+628992310069">+62 899-2310-069</a>
              </p>
            </div>
            <div className="flex flex-row items-center justify-center space-x-3">
              <Image src={MailIcon} alt="Mail-Icon" />
              <p className="xl:text-lg">
                <a href="mailto:trichbarberspace@gmail.com">
                  trichbarberspace@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="flex flex-row space-x-4 items-start">
          <Image src={ClockIcon} alt="Clock-Icon" />
          <div className="flex flex-col space-y-1 items-start text-sm">
            <h2 className="font-bold text-2xl lg:text-3xl xl:text-4xl lg:pb-4 xl:pb-6">
              Opening Hours
            </h2>
            {Schedule.map((s, idx) => {
              return (
                <div key={idx} className="flex flex-row items-center w-full space-x-3 justify-between xl:text-lg">
                  <p className="font-semibold">{s.date}</p>
                  <p>{s.hour}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map */}
      <div>
        <a
          href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDM0MDdqMGoxqAIAsAIA&um=1&ie=UTF-8&fb=1&gl=id&sa=X&geocode=KR-6JXQA52guMatoHFLRyXT_&daddr=Jl.+Sumbawa+No.24,+Merdeka,+Kec.+Sumur+Bandung,+Kota+Bandung,+Jawa+Barat+40113"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={Map}
            width={imageWidth}
            alt="Map-Img"
            object-fit="contain"
          />
        </a>
      </div>
    </section>
  );
};

export default Info;
