"use client";

import Image from "next/image";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useRouter } from "next/navigation";

export default function HeroCard() {
  const { authenticated } = usePrivy();
  const { openAuthModal } = useAuthModal();
  const router = useRouter();

  const handlePlayForFree = () => {
    if (authenticated) {
      // User is logged in, navigate to game/packs
      router.push("/packs");
    } else {
      // User not logged in, show auth modal
      openAuthModal();
    }
  };

  return (
    <div className="w-full">
      {/* Hero Card Container */}
      <div 
        className="relative w-full overflow-hidden
                   rounded-[14px] border border-[#2A2A2A]
                   flex flex-col lg:flex-row"
        style={{
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 2px 8px 0px rgba(0, 0, 0, 0.08)"
        }}
      >
        {/* Left Content Side - 40% on desktop */}
        <div className="w-full lg:w-[40%] bg-[#1D1D1D] 
                        p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16
                        flex flex-col justify-center
                        min-h-70 sm:min-h-75 md:min-h-80 lg:min-h-0
                        order-2 lg:order-1">
          {/* Heading */}
          <h2 className="text-white font-semibold 
                         text-[24px] sm:text-[28px] md:text-[32px] lg:text-[38px] xl:text-[44px] 2xl:text-[48px]
                         leading-[95%] mb-3 sm:mb-4 lg:mb-5 xl:mb-6
                         wrap-break-word hyphens-auto">
            Anamon Playtest is now live!
          </h2>

          {/* Description */}
          <p className="text-[#939BAA] 
                        text-[13px] sm:text-[14px] 
                        leading-[150%] sm:leading-[140%] lg:leading-[130%]
                        mb-5 sm:mb-6 lg:mb-7 xl:mb-8 
                        max-w-full lg:max-w-[95%] xl:max-w-md
                        wrap-break-word">
            Anamon is a fast, competitive card game where players summon
            Anamon and battle for control using smart strategy and timing.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:gap-3 xl:gap-4">
            {/* Learn More Button - Outlined */}
            <Link
              href="/lore"
              className="flex items-center justify-center
                         w-full sm:w-37.5 lg:w-full xl:w-42 
                         h-11 lg:h-12 xl:h-12.5
                         border border-[#2A2A2A] bg-transparent
                         rounded-[14px] px-4 gap-2
                         text-white font-medium text-sm lg:text-base
                         hover:bg-[#2A2A2A] transition-colors duration-200"
            >
              Learn More
            </Link>

            {/* Play For Free Button - Gradient */}
            <button
              onClick={handlePlayForFree}
              className="flex items-center justify-center gap-2
                         w-full sm:w-37.5 lg:w-full xl:w-42 
                         h-11 lg:h-12 xl:h-12.5
                         bg-linear-to-r from-[#B71959] to-[#E04548]
                         rounded-[14px] px-4
                         text-white font-medium text-sm lg:text-base
                         hover:opacity-90 transition-opacity duration-200"
            >
              <span>Play For Free</span>
              <svg 
                className="w-4 h-4 lg:w-5 lg:h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Image Side - 60% on desktop */}
        <div className="relative w-full lg:w-[60%] 
                        h-50 sm:h-60 md:h-70 lg:h-95 xl:h-100 2xl:h-107.5
                        order-1 lg:order-2">
          <Image
            src="/Twitter Art 6 1.png"
            alt="Anamon Characters"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlay for mobile - blends image into content */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#1D1D1D] to-transparent lg:hidden" />
        </div>
      </div>
    </div>
  );
}
