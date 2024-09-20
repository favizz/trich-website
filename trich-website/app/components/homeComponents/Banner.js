import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import DescBg from "@/public/homeAssets/DescBg.png";
import BaseBanner from "./bannerComponents/BaseBanner";

import MorningEdgeBox from "./bannerComponents/MorningEdgeBox";
import TiberaPromo from "./bannerComponents/TiberaPromo";
// import { BannerImages } from "./bannerComponents/BannerImages";

const Banner = () => {
  const BannerItems = [
    { type: "component", component: <TiberaPromo /> },
    { type: "component", component: <MorningEdgeBox /> },
    { type: "component", component: <BaseBanner /> },
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


