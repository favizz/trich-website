"use client";
import React from "react";
import LoadingBg from "@/public/homeAssets/LoadingBg.jpg";

const Loading = ({ duration = 500, onLoadingComplete }) => {
  React.useEffect(() => {
    const start = Date.now();
    
    const timer = setTimeout(() => {
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${LoadingBg.src})` }}
    >
      <img
        src="/homeAssets/AnimatedLoading.gif"
        alt="Loading animation"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-40 md:w-60 lg:w-96 max-w-[80vw] h-auto object-contain"
      />
    </div>
  );
};

export default Loading;