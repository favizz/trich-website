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
    hour: "10:00 - 22:00",
  },
  {
    date: "Tuesday",
    hour: "10:00 - 22:00",
  },
  {
    date: "Wednesday",
    hour: "10:00 - 22:00",
  },
  {
    date: "Thursday",
    hour: "10:00 - 22:00",
  },
  {
    date: "Friday",
    hour: "10:00 - 22:00",
  },
  {
    date: "Saturday",
    hour: "10:00 - 22:00",
  },
  {
    date: "Sunday",
    hour: "10:00 - 22:00",
  },
];

const Info = () => {
  return (
    <section className="lg:px-16 lg:py-12 xl:px-24 xl:py-16 bg-green1 flex flex-row justify-between text-white tracking-widest">
      {/* Location and Opening Hours */}
      <div className="flex flex-col space-y-8 xl:space-y-12">
        {/* Location */}
        <div className="flex flex-row space-x-4 items-start">
          {/* Pin Icon */}
          <Image src={PinIcon} alt="Pin-Icon" />
          {/* Location Info flex-col */}
          <div className="flex flex-col space-y-4 items-start text-sm">
            <h2 className="font-bold lg:text-3xl xl:text-4xl">Location</h2>
            <div className="flex flex-row items-center justify-center space-x-3">
              <Image src={HomeIcon} alt="Home-Icon" />
              <p className="xl:text-lg">Jl. Sumbawa no. 24</p>
            </div>
            <div className="flex flex-row items-center justify-center space-x-3">
              <Image src={PhoneIcon} alt="Phone-Icon" />
              <p className="xl:text-lg">+62 821-xxx-xxx</p>
            </div>
            <div className="flex flex-row items-center justify-center space-x-3">
              <Image src={MailIcon} alt="Mail-Icon" />
              <p className="xl:text-lg">trich_barberspace@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="flex flex-row space-x-4 items-start">
          <Image src={ClockIcon} alt="Clock-Icon" />
          <div className="flex flex-col space-y-1 items-start text-sm">
            <h2 className="font-bold lg:text-3xl xl:text-4xl lg:pb-4 xl:pb-6">Opening Hours</h2>
            {Schedule.map((s, idx) => {
              return (
                <div className="flex flex-row items-center w-full justify-between xl:text-lg">
                  <p className="font-semibold">{s.date}</p>
                  <p>{s.hour}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map */}
      <Image src={Map} width={500} alt="Map-Img"/>
    </section>
  );
};

export default Info;
