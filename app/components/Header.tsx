"use client";

import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";
import { useAuthModal } from "@/contexts/AuthModalContext";

export default function Header() {
  const { authenticated, logout } = usePrivy();
  const { openAuthModal } = useAuthModal();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1D1D1D] border-b border-[#333333]
                       h-14 sm:h-14 md:h-16 lg:h-17.5 xl:h-18.5
                       flex items-center justify-end px-4 lg:px-6 xl:px-8">
      {authenticated ? (
        /* Logout Button - when authenticated */
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5
                     bg-[#2A2A2A] hover:bg-[#3A3A3A]
                     rounded-[14px]
                     text-white font-medium text-sm lg:text-base
                     transition-colors duration-200"
        >
          <div className="relative w-5 h-5">
            <Image
              src="/Sidebar-icons/log-in 1.svg"
              alt="Logout"
              fill
              sizes="20px"
              className="object-contain"
            />
          </div>
          <span>Logout</span>
        </button>
      ) : (
        /* Login Button - Gradient */
        <button
          onClick={openAuthModal}
          className="flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5
                     bg-linear-to-r from-[#B71959] to-[#E04548]
                     rounded-[14px]
                     text-white font-medium text-sm lg:text-base
                     hover:opacity-90 transition-opacity duration-200"
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
          <span>Login</span>
        </button>
      )}
    </header>
  );
}
