
import Image from "next/image";
import HomeLogo from "@/public/homeAssets/TrichHomeLogo.svg";
import RevealTitle from "../components/animation/Reveal";

const Barbers = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green2 space-y-8">
      <Image src={HomeLogo} alt="logo" width={500} />
      <RevealTitle>
        <h2 className="text-3xl font-extrabold text-white tracking-widest">
          COMING SOON
        </h2>
      </RevealTitle>
    </main>
  );
};

export default Barbers;

{
  /* <main className="flex items-center justify-center bg-[#D5C7A9]">
      <div className="w-full h-36 bg-green1 fixed top-0"></div>
      <section className="min-h-screen max-w-screen-2xl w-full py-36">
        <div className="bg-white flex flex-col lg:max-w-[70vw]  lg:py-8 lg:px-12 xl">
          <h2 className="font-extrabold lg:text-5xl xl:text-6xl tracking-widest">
            MEET THE BARBERMEN
          </h2>
          <div className="pt-2 lg:text-xl">
            <p>
              At Trich Barberspace, we believe that a great haircut is more than
            </p>
            <p>
              just a service, it's an experience. That's why we take pride in
              our
            </p>
            <p>
              team of highly skilled and experienced barbers. Each of our
              barbers
            </p>
            <p>
              is passionate about their craft and dedicated to providing you
              with
            </p>
            <p>the best possible haircut.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 pt-12 lg:gap-32 lg:px-24">
            {BarberInfo.map((info, idx) => {
                return (
                    <BarberCard
                        barberImage={info.image}
                        name={info.name}
                        desc={info.desc}
                        key={idx}
                    />
                )
            })}
        </div>
      </section>
    </main> */
}
