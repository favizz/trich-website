import DescBg from "@/public/homeAssets/DescBg.png";
import RevealTitle from "../animation/Reveal";

const Desc = () => {
  return (
    <section
      style={{ backgroundImage: `url(${DescBg.src})` }}
      className="lg:h-[40vh] bg-cover bg-center flex flex-col py-16 lg:py-0 space-y-4 xl:space-y-8 items-center justify-center tracking-wider px-8 lg:px-24"
    >
      <RevealTitle>
        <h2 className="font-extrabold text-2xl lg:text-3xl xl:font-bold xl:text-[40px] ">
          Welcome to Trich Barberspace
        </h2>
      </RevealTitle>
      <RevealTitle>
        <p className="text-[#545454] lg:text-sm lg:font-light xl:text-base">
          Trich Barberspace emerged as a pioneering force in the barbershop
          industry, introducing a unique blend of exceptional service and
          cutting-edge innovation to elevate the customer experience. Initially
          situated in the vibrant city of Bandung, Trich Barberspace is on a
          mission to set a new standard for modern barbershops to provide
          customers with precisely tailored haircuts of the highest quality. The
          ultimate version is to extend this unparalleled experience to a global
          scale, establishing Trich Barberspace as the leading name in the
          industry.
        </p>
      </RevealTitle>
    </section>
  );
};

export default Desc;
