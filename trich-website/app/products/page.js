'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import BarberBanner from "@/public/productAssets/product_banner.png";
import Product1 from "@/public/productAssets/product1.png";
import Product2 from "@/public/productAssets/product2.png";
import Product3 from "@/public/productAssets/product3.png";
import Product4 from "@/public/productAssets/product4.png";
import Product5 from "@/public/productAssets/product5.png";
import DescBg from "@/public/homeAssets/DescBg.png";
import Trichlogo from "@/public/productAssets/trich_logo.png";
import Cart from "@/public/productAssets/cart_icon.png";
import Heart from "@/public/productAssets/heart_icon.png";
import List from "@/public/productAssets/list_icon.png";
import Search from "@/public/productAssets/search_icon.png";

const Products = () => {
  const [products] = useState([
    { id: 1, name: "Product Name", price: "Rp1.000", rating: 4.8, amountSold: 5, image: Product1 },
    { id: 2, name: "Product Name", price: "Rp1.000", rating: 5, amountSold: 7, image: Product2 },
    { id: 3, name: "Product Name", price: "Rp1.000", rating: 4.8, amountSold: 5, image: Product3 },
    { id: 4, name: "Product Name", price: "Rp1.000", rating: 4.8, amountSold: 5, image: Product4 },
    { id: 5, name: "Product Name", price: "Rp1.000", rating: 4.8, amountSold: 5, image: Product5 },
    { id: 6, name: "Product Name", price: "Rp1.000", rating: 4.8, amountSold: 5, image: Product1 },
    { id: 7, name: "Product Name", price: "Rp1.000", rating: 4.8, amountSold: 5, image: Product2 },
    { id: 8, name: "Product Name", price: "Rp1.000", rating: 4.8, amountSold: 5, image: Product3 },
    { id: 9, name: "Product Name", price: "Rp1.000", rating: 4.8, amountSold: 5, image: Product4 },
    { id: 10, name: "Product Name", price: "Rp1.000", rating: 4.8, amountSold: 5, image: Product5 },
  ]);

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
          className="absolute text-left text-white max-w-[80%] mx-auto px-8 flex items-center gap-0"
          style={{
            top: "50%",
            left: "10%",
            transform: "translateY(-50%)",
          }}
        >
          <div>
            <img
              src={Trichlogo.src}
              alt="Trich Logo"
              className="w-60 h-60 object-contain"
            />
          </div>
          <div
            style={{
              maxWidth: "75%", // Adjust the maximum width as needed
            }}
          >
            <h1 className="text-4xl sm:text-4xl md:text-6xl font-extrabold tracking-wider mb-5 text-center md:text-left">
              YOUR HAIR DESERVES THE BEST
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-center md:text-left">
              Start by purchasing TRICH’s products!
            </p>
            <div className="w-full text-center md:text-left">
            </div>
          </div>
        </div>
      </section>
      
      {/* Page Content Wrapper */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center gap-2">

            {/* Left Section: List Icon and Browse Categories */}
            <div className="flex items-center pl-10">
              <img src={List} alt="List Icon" className="w-6 h-6" />
              <Button variant="outline" className="bg-transparent rounded-none flex items-center gap-1">
                Browse Categories
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            {/* Center Section: Search Bar */}
            <div className="flex-1 mx-4">
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="w-full px-4 py-2 rounded-none border-gray-300"
              />
            </div>

            {/* Right Section: Wishlist and Cart */}
            <div className="flex items-center gap-6 pr-10">
              <div className="flex flex-col items-center text-center">
                <img src={Heart} alt="Heart Icon" className="w-6 h-6" />
                <span className="text-sm">Wishlist</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <img src={Cart} alt="Cart Icon" className="w-6 h-6" />
                <span className="text-sm">Cart</span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <div key={product.id} className="p-3 hover:shadow-lg transition-shadow">
                {/* Image container with white background */}
                <div className="w-full h-48 mb-2 relative flex items-center justify-center overflow-hidden bg-white border border-gray-200">
                  <div className="relative w-3/5 h-3/5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
                {/* Product information with stars and amount sold */}
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  {/* Stars and Amount Sold */}
                  <div className="flex justify-center items-center gap-2">
                    <div>{getStars(product.rating)}</div>
                    <div className="text-sm text-gray-300">({product.amountSold} sold)</div>
                  </div>
                  {/* Price */}
                  <p className="text-black font-extrabold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Load More Button Section */}
        <section className="text-center mb-8">
          <Button 
            variant="default"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
          >
            Load more products
          </Button>
        </section>
      </div>
    </main>
  );
};

export default Products;