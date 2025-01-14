'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";

import BarberBanner from "@/public/productAssets/product_banner.png";
import DescBg from "@/public/homeAssets/DescBg.png";
import Trichlogo from "@/public/productAssets/trich_logo.png";
import WhatsApp from "@/public/productAssets/WhatsApp.png";

import Product1 from "@/public/productAssets/products/2_Trich.png";
import Product2 from "@/public/productAssets/products/3_Trich.png";
import Product3 from "@/public/productAssets/products/4 Trich.png";
import Product4 from "@/public/productAssets/products/5_Trich.png";
import Product5 from "@/public/productAssets/products/6_Trich.png";
import Product6 from "@/public/productAssets/products/7_Trich.png";
import Product7 from "@/public/productAssets/products/8_Trich.png";
import Product8 from "@/public/productAssets/products/9_Trich.png";
import Product9 from "@/public/productAssets/products/10_Trich.png";
import Product10 from "@/public/productAssets/products/11_Trich.png";
import Product11 from "@/public/productAssets/products/12_Trich.png";
import Product12 from "@/public/productAssets/products/13_Trich.png";
import Product13 from "@/public/productAssets/products/14_Trich.png";
import Product14 from "@/public/productAssets/products/15_Trich.png";
import Product15 from "@/public/productAssets/products/16_Trich.png";
import Product16 from "@/public/productAssets/products/17_Trich.png";
import Product17 from "@/public/productAssets/products/18_Trich.png";
import Product18 from "@/public/productAssets/products/19_Trich.png";
import Product19 from "@/public/productAssets/products/20_Trich.png";
import Product20 from "@/public/productAssets/products/21_Trich.png";

const Products = () => {
  const [products] = useState([
    { id: 1, name: "Silky Smooth Serum", price: "Rp1.200", rating: 4.9, amountSold: 10, description: "Gives your hair a sleek and polished finish.", image: Product1 },
    { id: 2, name: "Herbal Infusion Shampoo", price: "Rp1.500", rating: 5, amountSold: 15, description: "Infused with natural herbs for gentle cleansing.", image: Product2 },
    { id: 3, name: "Detangling Mist", price: "Rp900", rating: 4.7, amountSold: 8, description: "Eases tangles and knots for effortless styling.", image: Product3 },
    { id: 4, name: "Volume Boost Spray", price: "Rp1.300", rating: 4.8, amountSold: 12, description: "Adds instant volume to lifeless hair.", image: Product4 },
    { id: 5, name: "Color Repair Conditioner", price: "Rp1.100", rating: 4.8, amountSold: 6, description: "Protects and repairs color-treated hair.", image: Product5 },
    { id: 6, name: "Scalp Refresh Toner", price: "Rp800", rating: 4.6, amountSold: 7, description: "Rejuvenates and soothes your scalp.", image: Product6 },
    { id: 7, name: "Hydrating Hair Mask", price: "Rp1.400", rating: 4.9, amountSold: 20, description: "Deeply moisturizes and revitalizes your hair.", image: Product7 },
    { id: 8, name: "Anti-Dandruff Shampoo", price: "Rp1.000", rating: 4.8, amountSold: 13, description: "Effectively reduces dandruff for a healthy scalp.", image: Product8 },
    { id: 9, name: "Keratin Repair Serum", price: "Rp1.500", rating: 5, amountSold: 18, description: "Strengthens hair with keratin-rich formula.", image: Product9 },
    { id: 10, name: "Fragrance Mist for Hair", price: "Rp1.000", rating: 4.7, amountSold: 9, description: "Leaves hair with a delightful and lasting scent.", image: Product10 },
    { id: 11, name: "Sun Protect Hair Spray", price: "Rp1.200", rating: 4.9, amountSold: 11, description: "Shields hair from UV damage and dryness.", image: Product11 },
    { id: 12, name: "Ultra Shine Gloss", price: "Rp1.300", rating: 4.8, amountSold: 10, description: "Adds a glossy finish for radiant hair.", image: Product12 },
    { id: 13, name: "Soft Curl Enhancer", price: "Rp900", rating: 4.6, amountSold: 5, description: "Enhances natural curls for soft definition.", image: Product13 },
    { id: 14, name: "Split-End Repair Cream", price: "Rp1.400", rating: 4.7, amountSold: 14, description: "Reduces the appearance of split ends.", image: Product14 },
    { id: 15, name: "Texturizing Spray", price: "Rp1.200", rating: 4.8, amountSold: 10, description: "Adds texture and body to fine hair.", image: Product15 },
    { id: 16, name: "Nourishing Hair Oil", price: "Rp1.100", rating: 4.8, amountSold: 15, description: "Deeply nourishes hair for a smooth finish.", image: Product16 },
    { id: 17, name: "Strengthening Serum", price: "Rp1.500", rating: 5, amountSold: 18, description: "Improves hair strength and reduces breakage.", image: Product17 },
    { id: 18, name: "Hair Repair Mask", price: "Rp1.400", rating: 4.8, amountSold: 12, description: "Repairs damaged hair for improved health.", image: Product18 },
    { id: 19, name: "Moisturizing Conditioner", price: "Rp1.000", rating: 4.7, amountSold: 8, description: "Provides intense hydration for dry hair.", image: Product19 },
    { id: 20, name: "Styling Hair Gel", price: "Rp800", rating: 4.6, amountSold: 5, description: "Gives structure and hold for all-day styling.", image: Product20 },
  ]);  

  const [showModal, setShowModal] = useState(false);

  const getStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.3 && rating - fullStars <= 0.7;
    return (
      <span style={{ color: "#FF7272" }}>
        {"★".repeat(fullStars)}
        {hasHalfStar && "½"}
        {"☆".repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
      </span>
    );
  };

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
        {/* Background Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${BarberBanner.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5,
          }}
        ></div>

        {/* Content */}
        <div
          className="absolute max-w-[80%] text-white mx-auto px-8 flex flex-col md:flex-row items-center md:items-start gap-4"
          style={{
            top: "50%",
            left: "10%",
            transform: "translateY(-50%)",
          }}
        >
          {/* Logo */}
          <div>
            <img
              src={Trichlogo.src}
              alt="Trich Logo"
              className="w-40 h-40 object-contain sm:w-32 sm:h-32 md:w-60 md:h-60"
            />
          </div>

          {/* Text Content */}
          <div
            style={{
              maxWidth: "75%",
            }}
            className="text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-wider mb-4">
              YOUR HAIR DESERVES THE BEST
            </h1>
            <p className="text-base sm:text-lg md:text-xl">
              Start by purchasing TRICH’s products!
            </p>
          </div>
        </div>
      </section>

      
      {/* Page Content Wrapper */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        
        {/* Products Grid Section */}
        <section className="mb-8">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 overflow-y-scroll scrollbar-hide"
            style={{
              maxHeight: "calc(2 * 24rem + 2 * 2rem)",
              scrollSnapType: "y mandatory",
            }}
          >
          {products.map((product) => (
            <div
              key={product.id}
              className="p-3 hover:shadow-lg transition-shadow w-full"
              style={{ scrollSnapAlign: "start" }} 
            >
              {/* Image container with white background */}
              <div className="w-full h-72 mb-4 relative flex items-center justify-center overflow-hidden bg-white border border-gray-200">
                <div className="relative w-3/5 h-3/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              {/* Product information with description */}
              <div className="text-center space-y-2">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-black font-extrabold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        </section>

        {/* Contact Us Button Section */}
        <section className="text-center mb-8">
          <Button 
            variant="default"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            Contact Us
          </Button>

          {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[500px] text-center relative mx-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-1 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>

                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <img 
                    src={WhatsApp.src} 
                    alt="WhatsApp Logo" 
                    className="w-20 h-20"
                  />
                </div>

                {/* Title */}
                <h2 
                  className="font-extrabold mb-6"
                  style={{
                    fontSize: "clamp(1.5rem, 5vw, 2.5rem)", // Responsive font size
                    textAlign: "center", // Ensures proper alignment
                    lineHeight: "1.2", // Adjusts spacing between lines for better readability
                  }}
                >
                  Contact Us <br /> On WhatsApp!
                </h2>


                {/* Clickable Number */}
                <div className="flex items-center justify-center mb-6">
                  <a 
                    href="https://wa.me/08992310069" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-green-600 hover:text-green-700 font-bold"
                    style={{
                      fontSize: "clamp(1rem, 4vw, 2rem)", // Responsive font size
                      wordWrap: "break-word", // Ensure it wraps if needed
                      overflowWrap: "break-word",
                    }}
                  >
                    +62 899-2310-069
                  </a>
                </div>

              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Products;