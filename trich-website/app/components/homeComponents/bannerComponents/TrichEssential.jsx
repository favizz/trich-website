import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Essentialstext from '@/public/homeAssets/Essentials1.png';
import Essentialsbanner from '@/public/homeAssets/Essentials2.jpg';

const TrichEssential = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row w-full">
      {/* Left side (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/3 bg-white flex-col justify-between items-start p-14">
        {/* Move Trich Essentials text higher by reducing top padding */}
        <div className="pt-14">
          <Image
            src={Essentialstext}
            alt="Trich Essentials"
            width={250}
            height={40}
          />
        </div>

        {/* Center the text vertically and make it regular weight */}
        <div className="flex-1 flex items-center">
          <div>
            <h2 className="text-3xl font-normal tracking-wider mb-2">FUSION CLAY</h2>
            <h2 className="text-3xl font-normal mb-2">&</h2>
            <h2 className="text-3xl font-normal tracking-wider">FLUX POWDER</h2>
          </div>
        </div>

        {/* Learn More button with same ratio as Trich Essentials text image, stretched to the right */}
        <Link href="/products" className="w-full flex justify-center">
          <div
            className="bg-[#F26524] hover:bg-[#F4511E] text-white text-center py-3 px-8 w-full max-w-[350px] transition-colors duration-300 cursor-pointer font-semibold text-[11px]"
          >
            Learn More
          </div>
        </Link>
      </div>

      {/* Right side (full width on mobile) */}
      <div className="w-full md:w-2/3 relative flex flex-col min-h-screen md:min-h-0">
        {/* Background image - fully cover the container */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={Essentialsbanner}
            alt="Trich Essentials Products"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Mobile-only logo and button */}
        <div className="relative z-10 flex flex-col justify-between items-center min-h-screen py-8 md:hidden">
          {/* Centered logo on mobile */}
          <div className="pt-16 flex justify-center md:hidden">
            <Image
              src={Essentialstext}
              alt="Trich Essentials"
              width={250}
              height={40}
            />
          </div>

          {/* Learn More button at bottom on mobile */}
          <div className="w-full px-8 mt-auto">
            <Link href="/products" className="block">
              <div
                className="bg-[#F26524] hover:bg-[#F4511E] text-white text-center py-3 w-full transition-colors duration-300 cursor-pointer font-semibold"
              >
                Learn More
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrichEssential;
