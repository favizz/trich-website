import Image from "next/image";

import BarbershopTheme from "@/public/aboutusAssets/barbershop.png";
import ValuesImage from "@/public/aboutusAssets/values.png";
import EyeIcon from "@/public/aboutusAssets/eye.svg";
import TargetIcon from "@/public/aboutusAssets/target.svg";
import FlagIcon from "@/public/aboutusAssets/flag.svg";

const AboutUs = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-green1 py-36">
      <section className="max-w-screen-2xl">
        <section className="flex flex-col lg:flex-row justify-between px-12 lg:px-16 xl:px-24 lg:space-x-16 xl:space-x-20">
          <div className="lg:w-[40vw] lg:pt-10 xl:pt-12">
            <Image
              src={BarbershopTheme}
              layout="responsive"
              alt="barbershop-theme-image"
              className="rounded-2xl"
            />
          </div>
          <div className="lg:max-w-[40vw] space-y-2 lg:space-y-0 pt-10 lg:pt-0 tracking-widest text-white">
            <h2 className="text-orange1 font-extrabold text-2xl lg:text-3xl xl:text-[40px] xl:leading-10">
              About us.
            </h2>
            <div className="bg-orange1 w-full h-[2px] lg:mt-2 lg:mb-6"></div>
            <p className="font-bold md:text-lg xl:text-2xl">
              A short brief about our establishment
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 xl:space-x-10 lg:pt-8 text-[12px] lg:text-[10px] xl:text-[13px] 2xl:text-base">
              <p className="text-left">
                <span className="font-bold">TRICH Barberspace</span> emerged as
                a pioneering force in the barbershop industry, introducing a
                unique blend of exceptional service and breakthrough innovation
                to elevate the customer experience. Came from the word
                “Trichology” which means study of hair, TRICH Barberspace is the
                first cutting-edge establishment that harmonizes time-honored
                barbershop craftsmanship with the latest advancements in
                technology for the optimization of accuracy and also to create
                an unforgettable experience for our customers.
              </p>
              <p className="text-left">
                <span className="font-bold">TRICH Barberspace</span> is on a
                mission to set a new standard for modern barbershops, aiming to
                provide customers with precisely tailored haircuts of the
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

        {/* Our Approach */}
        <section className="flex flex-col-reverse lg:flex-row justify-between pt-6 lg:pt-10 px-12 lg:px-16 xl:px-24 lg:space-x-16 xl:space-x-20">
          <div className="lg:max-w-[40vw] space-y-2 lg:space-y-0 tracking-widest text-white">
            <h2 className="text-orange1 font-extrabold text-2xl lg:text-3xl xl:text-[40px] xl:leading-10">
              Our Approach.
            </h2>
            <div className="bg-orange1 w-full h-[2px] lg:mt-2 lg:mb-6"></div>

            <div className="flex flex-row py-2 space-x-6">
              <Image src={EyeIcon} alt="eye-icon" />
              <div className="flex flex-col space-y-1">
                <p className="font-extrabold lg:text-lg">Vision Statement</p>
                <p className="text-xs md:text-base">
                  Revolutionizing the excellence of the modern barbershop
                  industry.
                </p>
              </div>
            </div>
            <div className="flex flex-row py-2 space-x-6">
              <Image src={TargetIcon} alt="target-icon" />
              <div className="flex flex-col space-y-1">
                <p className="font-extrabold lg:text-lg">Mission Statement</p>
                <p className="text-xs md:text-base">
                  Harmonizing barbershop craftsmanship with the latest
                  advancements in technology.
                </p>
              </div>
            </div>
            <div className="flex flex-row py-2 space-x-6">
              <Image src={FlagIcon} alt="target-icon" />
              <div className="flex flex-col space-y-1">
                <p className="font-extrabold lg:text-lg">Mission Statement</p>
                <p className="text-xs md:text-base">
                  Harmonizing barbershop craftsmanship with the latest
                  advancements in technology.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-[40vw] lg:pt-10 xl:pt-6">
            <Image
              src={ValuesImage}
              alt="values-image"
              layout="responsive"
              className="rounded-2xl"
            />
          </div>
        </section>
      </section>
    </main>
  );
};

export default AboutUs;
