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
            <h2 className="font-bold lg:text-3xl xl:text-[40px] xl:leading-10">
              About us.
            </h2>
            <div className="w-full h-[2px] bg-white lg:mt-2 lg:mb-6"></div>
            <p className="font-bold lg:text-lg xl:text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </p>
            <div className="flex flex-row lg:space-x-6 lg:pt-8 lg:text-sm xl:text-base">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Aenean vel elit scelerisque mauris pellentesque pulvinar
                pellentesque habitant morbi. In mollis nunc sed id. Viverra nibh
                cras pulvinar mattis nunc. Pellentesque habitant morbi tristique
                senectus et netus. Nunc mattis enim ut tellus elementum
                sagittis. Nulla at volutpat diam ut venenatis tellus in metus.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Aenean vel elit scelerisque mauris pellentesque pulvinar
                pellentesque habitant morbi. In mollis nunc sed id. Viverra nibh
                cras pulvinar mattis nunc. Pellentesque habitant morbi tristique
                senectus et netus. Nunc mattis enim ut tellus elementum
                sagittis. Nulla at volutpat diam ut venenatis tellus in metus.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AboutUs;
