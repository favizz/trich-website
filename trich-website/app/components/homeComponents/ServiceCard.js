import Link from "next/link";

const ServiceCard = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white tracking-widest space-y-4 pt-10 pb-6 px-6">
      <div className="font-extrabold lg:text-lg flex flex-col space-y-2 items-center justify-center"> 
        <p className="text-black">HAIRCUT</p>
        <p className="text-orange1">Rp 50.000</p>
      </div>
      <p className="text-[#545454] lg:text-xs text-center tracking-wider">
        Let our experienced stylists craft the perfect haircut to flatter your
        face shape and personal style. Whether you're looking for a trendy new
        look or a classic style with a modern twist, we'll work with you to
        achieve your desired look.
      </p>
      <Link href="/services">
        <div className="bg-orange1 mt-4 text-white rounded font-bold px-8 py-3 lg:text-xs">Book now</div>
      </Link>
    </div>
  );
};

export default ServiceCard;
