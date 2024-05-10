import Link from "next/link";

const ServiceCard = ({name, desc, price, duration}) => {
  return (
    <div className="max-w-[400px] h-[360px] rounded-[10px] flex flex-col items-center justify-center bg-white tracking-widest space-y-4 pt-10 pb-6 px-6">
      <div className="font-extrabold lg:text-lg flex flex-col space-y-2 items-center justify-center"> 
        <p className="text-black text-center">{name}</p>
        <p className="text-orange1">IDR {price}</p>
        <p className="font-semibold text-orange1 lg:text-base">Duration: {duration}</p>
      </div>
      <p className="text-[#545454] lg:text-xs text-justify tracking-wider">
        {desc}
      </p>
      <Link href="/reservation">
        <div className="bg-orange1 mt-4 text-white rounded font-bold px-8 py-3 lg:text-xs">Book now</div>
      </Link>
    </div>
  );
};

export default ServiceCard;
