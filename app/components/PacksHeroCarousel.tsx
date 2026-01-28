"use client";

import Image from "next/image";
import { useState } from "react";

// Mock data for carousel slides
const packsData = [
  {
    id: 1,
    title: "STANDARD PACK",
    description: "Contains 5 Digital Standard Anamon Play Cards",
    price: "$20",
    buttonText: "RIP PACK",
  },
  {
    id: 2,
    title: "STANDARD PACK",
    description: "Contains 5 Digital Standard Anamon Play Cards",
    price: "$20",
    buttonText: "RIP PACK",
  },
  {
    id: 3,
    title: "STANDARD PACK",
    description: "Contains 5 Digital Standard Anamon Play Cards",
    price: "$20",
    buttonText: "RIP PACK",
  },
];

export default function PacksHeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="w-full">
      {/* Section Title */}
      <h1 className="text-white font-semibold text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">
        Packs
      </h1>

      {/* Main Carousel Container */}
      <div 
        className="relative w-full h-40 sm:h-50 md:h-65 lg:h-75.25 xl:h-85 2xl:h-95 rounded-xl sm:rounded-[14px] border border-[#2A2A2A] overflow-hidden"
        style={{ 
          background: "#242424",
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.04), 0px 2px 8px rgba(0, 0, 0, 0.08)"
        }}
      >
        {/* Content wrapper - 35/65 split */}
        <div className="flex h-full">
          {/* Left Side - Text Content */}
          <div className="w-[55%] sm:w-[45%] md:w-[40%] lg:w-[38%] xl:w-[40%] 2xl:w-[42%] h-full flex flex-col justify-center px-3 sm:px-4 md:px-6 lg:px-10 xl:px-10 2xl:px-12 z-10">
            {/* Title */}
            <h2 className="text-white font-semibold text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-[48px] leading-tight mb-1 sm:mb-2 md:mb-4">
              {packsData[activeSlide].title}
            </h2>
            
            {/* Description - Hidden on very small screens */}
            <p className="hidden xs:block text-[#939BAA] text-[10px] sm:text-xs md:text-sm lg:text-base font-normal leading-relaxed mb-2 sm:mb-4 md:mb-6 lg:mb-8 line-clamp-2 sm:line-clamp-none">
              {packsData[activeSlide].description}
            </p>
            
            {/* Price and Button Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 md:gap-4">
              {/* Price */}
              <span className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[32px]">
                {packsData[activeSlide].price}
              </span>
              
              {/* RIP PACK Button */}
              <button 
                className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl md:rounded-[14px] text-white font-semibold text-xs sm:text-sm md:text-base transition-opacity hover:opacity-90 touch-manipulation"
                style={{ background: "linear-gradient(90deg, #B71959 0%, #E04548 100%)" }}
              >
                <span className="whitespace-nowrap">{packsData[activeSlide].buttonText}</span>
                <Image
                  src="/move-right 1.svg"
                  alt="Arrow"
                  width={24}
                  height={24}
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                />
              </button>
            </div>
          </div>
          
          {/* Right Side - Art Image with diagonal edge */}
          <div className="absolute right-0 top-0 w-[50%] sm:w-[58%] md:w-[62%] lg:w-[65%] xl:w-[68%] h-full">
            <Image
              src="/Art.svg"
              alt="Pack Art"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 62vw, 68vw"
              className="object-cover object-left"
              priority
            />
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-1.5">
          {packsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-1.25 sm:h-1.5 md:h-1.75 rounded-full transition-all duration-300 ${
                index === activeSlide 
                  ? "w-10 sm:w-12 md:w-13.25" 
                  : "w-4.5 sm:w-5.5 md:w-6.25 bg-[#9CA3AF]"
              }`}
              style={index === activeSlide ? { background: "linear-gradient(90deg, #B71959 0%, #E04548 100%)" } : {}}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
