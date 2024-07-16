import Image from "next/image";
import BannerBG from "@/public/homeAssets/BannerBg.png";
import HomeLogo from "@/public/homeAssets/TrichHomeLogo.svg";
import RevealTitle from "../animation/Reveal";
import PromoHeading from "./PromoHeading";

const Banner = () => {
  return (
    <section
      style={{ backgroundImage: `url(${BannerBG.src})` }}
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat items-center justify-center"
    >
      <RevealTitle>
        <Image
          src={HomeLogo}
          width={800}
          alt="Trich-Logo"
          className="py-[120px]"
        />
      </RevealTitle>
      <PromoHeading />
    </section>
  );
};

export default Banner;
