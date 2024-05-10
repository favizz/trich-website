import Image from "next/image";

import BarbershopTheme from "@/public/aboutusAssets/barbershop.png";

const AboutUs = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-green1 py-36">
      <section className="max-w-screen-2xl">
        <section className="flex flex-row justify-between lg:px-16 xl:px-24 lg:space-x-16 xl:space-x-20">
          <div className="lg:w-[40vw]">
            <Image
              src={BarbershopTheme}
              layout="responsive"
              alt="barbershop-theme-image"
            />
          </div>
          <div className="lg:max-w-[40vw] tracking-widest text-white">
            <h2 className="text-orange1 font-bold lg:text-3xl xl:text-[40px] xl:leading-10">
              About us.
            </h2>
            <div className="bg-orange1 w-full h-[2px] lg:mt-2 lg:mb-6"></div>
            <p className="font-bold lg:text-lg xl:text-2xl">
              A short brief about our establishment
            </p>
            <div className="flex flex-row lg:space-x-6 xl:space-x-10 lg:pt-8 lg:text-sm xl:text-base">
              <p className="text-justify">
                <span className="font-extrabold">TRICH Barberspace</span>{" "}
                emerged as a pioneering force in the barbershop industry,
                introducing a unique blend of exceptional service and
                breakthrough innovation to elevate the customer experience. Came
                from the word “Trichology” which means study of hair, TRICH
                Barberspace is the first cutting-edge establishment that
                harmonizes time-honored barbershop craftsmanship with the latest
                advancements in technology for the optimization of accuracy and
                also to create an unforgettable experience for our customers.
              </p>
              <p className="text-justify">
                <span className="font-extrabold">TRICH Barberspace</span> is on
                a mission to set a new standard for modern barbershops, aiming
                to provide customers with precisely tailored haircuts of the
                highest quality. The ultimate version is to extend this
                unparalleled experience to a global scale, establishing TRICH
                Barberspace as the leading name in the industry. Our passion
                runs deep, like the steady hum of clippers and the timeless
                artistry of grooming. We are driven by a burning desire to
                redefine how people experience the barbershop by leveraging
                innovative technology to create efficiency.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AboutUs;
