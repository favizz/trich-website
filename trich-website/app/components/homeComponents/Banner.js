"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import DescBg from "@/public/homeAssets/DescBg.png";
import BaseBanner from "./bannerComponents/BaseBanner";

import MorningEdgeBox from "./bannerComponents/MorningEdgeBox";
import TiberaPromo from "./bannerComponents/TiberaPromo";
import TrichEssential from "./bannerComponents/TrichEssential";
// import { BannerImages } from "./bannerComponents/BannerImages";

const Banner = () => {
  const BannerItems = [
    { type: "component", component: <TiberaPromo /> },
    { type: "component", component: <MorningEdgeBox /> },
    { type: "component", component: <BaseBanner /> },
    { type: "component", component: <TrichEssential /> }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % BannerItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{ backgroundImage: `url(${DescBg.src})` }}
      className="min-h-screen"
    >
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {BannerItems.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {slide.type === "image" ? (
                <Image
                  src={slide.src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full"
                />
              ) : (
                <>{slide.component}</>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
