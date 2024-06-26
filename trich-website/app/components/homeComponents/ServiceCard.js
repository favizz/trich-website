import Link from "next/link";

const ServiceCard = ({name, desc, price, duration, isComingSoon}) => {
  return (
    <>
    <div className={`${isComingSoon ? "hidden" : ""} max-w-[400px] h-[440px] lg:h-[360px] rounded-[10px] flex flex-col items-center justify-center bg-white tracking-widest space-y-4 pt-10 pb-6 px-6`}>
      <div className="font-extrabold lg:text-lg flex flex-col space-y-2 items-center justify-center"> 
        <p className="text-black text-center">{name}</p>
        <p className="text-orange1">Price: IDR {price}</p>
        <p className="font-semibold text-orange1 lg:text-base">Duration: {duration}</p>
      </div>
      <p className="text-[#545454] lg:text-xs text-justify tracking-wider">
        {desc}
      </p>
    </div>
    <div className={`${isComingSoon ? "" : "hidden"} max-w-[400px] h-[440px] lg:h-[360px] rounded-[10px] flex flex-col items-center justify-center bg-white tracking-widest`}>
      <p className="text-orange1 font-bold text-2xl">MORE COMING SOON...</p>
    </div>
    </>
  );
};

export default ServiceCard;
