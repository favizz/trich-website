import Image from "next/image";
import BannerBG from "@/public/homeAssets/BannerBg.png";
import MorningEdgeBG from "@/public/homeAssets/morningedgebg.png";
import HomeLogo from "@/public/homeAssets/TrichHomeLogo.svg";
import RevealTitle from "../animation/Reveal";
import PromoHeading from "./PromoHeading";
import MorningEdgeBox from "./bannerComponents/MorningEdgeBox";

const Banner = () => {
  return (
    <section
      style={{ backgroundImage: `url(${MorningEdgeBG.src})` }}
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat items-start justify-center"
    >
      <MorningEdgeBox />
    </section>
  );
};

export default Banner;

// return (
//   <section
//     style={{ backgroundImage: `url(${MorningEdgeBG.src})` }}
//     className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat items-center justify-center"
//   >
//     <MorningEdgeBox/>
//     <RevealTitle>
//       <Image
//         src={HomeLogo}
//         width={800}
//         alt="Trich-Logo"
//         className="py-[120px]"
//       />
//     </RevealTitle>
//     <PromoHeading />
//   </section>
// );
