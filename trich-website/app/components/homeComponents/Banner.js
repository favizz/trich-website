import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import BannerBG from "@/public/homeAssets/BannerBg.png";
import MorningEdgeBG from "@/public/homeAssets/morningedgebg.png";
import HomeLogo from "@/public/homeAssets/TrichHomeLogo.svg";
import RevealTitle from "../animation/Reveal";
import PromoHeading from "./PromoHeading";
import DescBg from "@/public/homeAssets/DescBg.png";
import BaseBanner from "./bannerComponents/BaseBanner";

import MorningEdgeBox from "./bannerComponents/MorningEdgeBox";
import { BannerImages } from "./bannerComponents/BannerImages";

const Banner = () => {
  const BannerItems = [
    { type: "component", component: <MorningEdgeBox /> },
    { type: "component", component: <BaseBanner /> },
    { type: "image", src: BannerImages[0] },
    { type: "image", src: BannerImages[1] },
    { type: "image", src: BannerImages[2] },
    { type: "image", src: BannerImages[3] },
    { type: "image", src: BannerImages[4] },
  ];

  return (
    <section
      style={{ backgroundImage: `url(${DescBg.src})` }}
      className="min-h-screen"
    >
      <Carousel className="w-full ">
        <CarouselContent className="w-full h-full">
          {BannerItems.map((slide, index) => (
            <CarouselItem key={index} className="relative h-full">
              {slide.type === "image" ? (
                <Image
                  src={slide.src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full"
                />
              ) : (
                <>{slide.component}</>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Banner;


