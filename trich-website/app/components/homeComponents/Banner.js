import Image from "next/image";
import BannerBG from "@/public/homeAssets/BannerBg.png";
import HomeLogo from "@/public/homeAssets/TrichHomeLogo.svg";
import RevealTitle from "../animation/Reveal";

const Banner = () => {
  return (
    <section
      style={{ backgroundImage: `url(${BannerBG.src})` }}
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
    >
      <RevealTitle>
        <Image
          src={HomeLogo}
          width={800}
          alt="Trich-Logo"
          className="py-[120px]"
        />
      </RevealTitle>
    </section>
  );
};

export default Banner;
