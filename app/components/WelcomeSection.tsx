"use client";

import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";
import { useAuthModal } from "@/contexts/AuthModalContext";

export default function WelcomeSection() {
  const { authenticated, user } = usePrivy();
  const { openAuthModal } = useAuthModal();

  // Get user display name
  const displayName = authenticated 
    ? user?.email?.address?.split("@")[0] || 
      user?.google?.email?.split("@")[0] || 
      user?.apple?.email?.split("@")[0] || 
      "user"
    : "user";

  return (
    <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8 lg:mb-10">
      {/* Welcome Text */}
      <h1 className="text-white font-semibold 
                     text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[32px] 
                     leading-[100%]">
        Welcome, {displayName}!
      </h1>

      {/* Login Button - Outlined (only show if not authenticated) */}
      {!authenticated && (
        <button
          onClick={openAuthModal}
          className="flex items-center gap-2 
                     px-3 py-2 sm:px-4 sm:py-2.5
                     border border-[#2A2A2A] bg-transparent
                     rounded-[14px]
                     text-white font-medium text-sm
                     hover:bg-[#2A2A2A] transition-colors duration-200"
        >
          <div className="relative w-5 h-5">
            <Image
              src="/Sidebar-icons/log-in 1.svg"
              alt="Login"
              fill
              sizes="20px"
              className="object-contain"
            />
          </div>
          <span className="hidden sm:inline">Login</span>
        </button>
      )}
    </div>
  );
}
