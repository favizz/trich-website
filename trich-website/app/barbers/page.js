'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram } from 'lucide-react';
import BarberBanner from "@/public/barbersasset/barber_banner.png";
import Barber1 from "@/public/barbersasset/barber1.png";
import Barber2 from "@/public/barbersasset/barber2.png";
import Barber3 from "@/public/barbersasset/barber3.png";
import Barber4 from "@/public/barbersasset/barber4.png";
import Work1 from "@/public/barbersasset/ourwork1.png";
import Work3 from "@/public/barbersasset/ourwork3.png";
import Work4 from "@/public/barbersasset/ourwork4.png";
import Work5 from "@/public/barbersasset/ourwork5.png";
import DescBg from "@/public/homeAssets/DescBg.png";

// Barber profiles array (no changes needed)
const barbers = [
  { name: "Nama", bio: "Lorem ipsum dolor sit amet...", image: Barber1 },
  { name: "Nama", bio: "Lorem ipsum dolor sit amet...", image: Barber2 },
  { name: "Nama", bio: "Lorem ipsum dolor sit amet...", image: Barber3 },
  { name: "Nama", bio: "Lorem ipsum dolor sit amet...", image: Barber4 },
  { name: "Nama", bio: "Lorem ipsum dolor sit amet...", image: Barber3 },
  { name: "Nama", bio: "Lorem ipsum dolor sit amet...", image: Barber1 },
  { name: "Nama", bio: "Lorem ipsum dolor sit amet...", image: Barber2 },
];

// Portfolio array (no changes needed)
const portfolio = [Work3, Work4, Work5, Work1, Work4, Work5, Work1, Work3];

export default function Barbers() {
  return (
    <main className="min-h-screen" style={{ backgroundImage: `url(${DescBg.src})` }}>
      {/* Spacer Element */}
      <div style={{ height: "144px" }}></div> 

      {/* Banner Section */}
      <section
        className="banner-class h-[400px] flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${BarberBanner.src})`,
          position: "relative", 
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${BarberBanner.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5, 
          }}
        ></div>
        <div
          className="absolute text-left text-white max-w-[80%] mx-auto px-8"
          style={{
            top: "50%", 
            left: "10%", 
            transform: "translateY(-50%)", 
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-wider mb-4 text-center md:text-left">
            MEET OUR BARBER
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 text-center md:text-left">
            TRICH commit to serve you...
          </p>
          <div className="w-full text-center md:text-left">
            <Link href="/reservation">
              <Button
                variant="outline"
                className="text-white border-white bg-transparent rounded-none px-6 py-5 mx-auto md:mx-0"
              >
                BOOK NOW
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Barber Details Section */}
      <section
        className="barber-details-class py-20"
        style={{
          height: "80vh", 
        }}
      >
        <div className="container mx-auto px-4 relative">
          {/* Barber Profiles Carousel */}
          <div className="relative">
            {/* Carousel Container */}
            <div
              id="barber-carousel"
              className="flex gap-1 overflow-x-auto scrollbar-hide relative z-10 mx-auto"
              style={{
                scrollSnapType: "x mandatory",
                maxWidth: "65%",
                padding: "0 1%",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                height: "60vh",
              }}
            >
              {barbers.map((barber, i) => (
                <div
                  key={i}
                  className="flex-none w-[100%] sm:w-[50%] md:w-[34%] p-2"
                  style={{
                    scrollSnapAlign: "center",
                  }}
                >
                  <div className="relative rounded-lg overflow-hidden shadow-lg">
                    {/* Image */}
                    <div className="relative w-full h-[400px]">
                      <Image
                        src={barber.image}
                        alt={barber.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>

                    {/* Text and Icons */}
                    <div className="absolute inset-0 flex flex-col justify-end items-start p-4 text-white bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      {/* Name and Description */}
                      <h3 className="text-xl font-bold mb-1">{`Name${i + 1}`}</h3>
                      <p className="text-sm mb-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                      </p>

                      {/* Social Icons */}
                      <div className="flex items-center gap-4">
                        <a href="#" className="text-white hover:text-gray-600">
                          <Facebook className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-white hover:text-gray-600">
                          <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-white hover:text-gray-600">
                          <Instagram className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Fading Effect */}
            <div
              className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-[#204b49] to-transparent z-10 pointer-events-none"
              style={{ opacity: 0.5 }} 
            ></div>
            <div
              className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#204b49] to-transparent z-10 pointer-events-none"
              style={{ opacity: 0.5 }}
            ></div>

            {/* Left Chevron */}
            <button
              className="absolute left-[5%] top-1/2 -translate-y-1/2 z-20 p-2 opacity-70"
              style={{ transform: "scale(3)" }} 
              onClick={() => {
                const container = document.getElementById("barber-carousel");
                if (container) {
                  container.scrollBy({ left: -container.offsetWidth, behavior: "smooth" }); 
                }
              }}
            >
              <ChevronLeft className="w-[120%] h-[120%] text-[#646464]" />
            </button>

            {/* Right Chevron */}
            <button
              className="absolute right-[5%] top-1/2 -translate-y-1/2 z-20 p-2 opacity-70"
              style={{ transform: "scale(3)" }} 
              onClick={() => {
                const container = document.getElementById("barber-carousel");
                if (container) {
                  container.scrollBy({ left: container.offsetWidth, behavior: "smooth" }); 
                }
              }}
            >
              <ChevronRight className="w-[120%] h-[120%] text-[#646464]" />
            </button>
          </div>
        </div>
      </section>

      {/* Model Section */}
      <section className="model-class py-10"
        style={{
          height: "50vh", 
          background: "linear-gradient(to right, #518679, #0F1419)"
        }}
      >
      <div className="container mx-auto px-4">
        {/* Adjustable Header */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 text-center sm:text-left"
            style={{ marginLeft: "0", marginRight: "0" }}
        >
          Our Works
        </h2>

        {/* Portfolio Container */}
        <div className="relative">

          {/* Carousel with Fading Areas */}
          <div
            id="portfolio-carousel"   
            className="flex gap-8 overflow-x-auto scrollbar-hide relative z-10"
            style={{
              scrollSnapType: "x mandatory", 
            }}
          >
            {portfolio.map((image, i) => (
              <div
                key={i}
                className="flex-none w-[60%] sm:w-48 md:w-64 relative aspect-square"
                style={{
                  scrollSnapAlign: "center", 
                }}
              >
                <Image
                  src={image}
                  alt={`Portfolio ${i + 1}`}
                  fill
                  className=" object-cover"
                />
              </div>
            ))}
          </div>  

          {/* Add Fading Effect */}
          <div
            className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-[#518679] to-transparent z-10 pointer-events-none"
            style={{ opacity: 0.5 }} 
          ></div>
          <div
            className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#0F1419] to-transparent z-10 pointer-events-none"
            style={{ opacity: 0.5 }}
          ></div>

          {/* Left Chevron */}
          <button
            className="absolute left-[5%] top-1/2 -translate-y-1/2 z-20 p-2 opacity-70"
            style={{ transform: "scale(3)" }} 
            onClick={() => {
              const container = document.getElementById("portfolio-carousel");
              if (container) {
                container.scrollBy({ left: -container.offsetWidth, behavior: "smooth" }); 
              }
            }}
          >
            <ChevronLeft className="w-[120%] h-[120%] text-[#ffffff]" />
          </button>

          {/* Right Chevron */}
          <button
            className="absolute right-[5%] top-1/2 -translate-y-1/2 z-20 p-2 opacity-70"
            style={{ transform: "scale(3)" }} 
            onClick={() => {
              const container = document.getElementById("portfolio-carousel");
              if (container) {
                container.scrollBy({ left: container.offsetWidth, behavior: "smooth" }); 
              }
            }}
          >
            <ChevronRight className="w-[120%] h-[120%] text-[#ffffff]" />
          </button>
        </div>
      </div>
    </section>
    </main>
  );
}