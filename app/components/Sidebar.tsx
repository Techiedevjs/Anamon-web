"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: "/Sidebar-icons/house 1.svg" },
  { name: "Marketplace", href: "/marketplace", icon: "/Sidebar-icons/shopping-bag 1.svg" },
  { name: "Packs", href: "/packs", icon: "/Sidebar-icons/gift 1.svg" },
  { name: "Anamons", href: "/anamons", icon: "/Sidebar-icons/snail 1.svg" },
  { name: "Lore", href: "/lore", icon: "/Sidebar-icons/book-open-text 1.svg" },
];

const socialLinks = [
  { name: "YouTube", href: "https://youtube.com", icon: "/Sidebar-icons/YouTube_full-color_icon_(2017) 1.svg" },
  { name: "Discord", href: "https://discord.com", icon: "/Sidebar-icons/discord-icon-svgrepo-com 1.svg" },
  { name: "X", href: "https://x.com", icon: "/Sidebar-icons/x-2 1.svg" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen bg-[#1D1D1D] flex flex-col z-50
                      w-16 sm:w-16 md:w-20 lg:w-64 xl:w-70 2xl:w-87.5
                      transition-all duration-300 ease-in-out">
      {/* Logo */}
      <div className="flex items-center justify-center pt-8 pb-6 sm:pt-10 lg:pt-12 lg:pb-8">
        <Image
          src="/Logo.png"
          alt="Anamon Logo"
          width={180}
          height={60}
          className="w-10 h-auto sm:w-10 md:w-12 lg:w-36 xl:w-40 2xl:w-44 transition-all duration-300"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 lg:px-4 xl:px-5 2xl:px-6 space-y-3 lg:space-y-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                lg:px-4 xl:px-5 2xl:px-6
                ${isActive 
                  ? "bg-linear-to-r from-[#B71959] to-[#E04548] text-white" 
                  : "bg-[#333333] text-gray-400 hover:text-white hover:bg-[#404040]"
                }
              `}
            >
              {/* Icon container */}
              <div className="relative w-6 h-6 shrink-0">
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  sizes="24px"
                  className={`object-contain ${isActive ? "brightness-0 invert" : ""}`}
                />
              </div>
              
              {/* Label - hidden on small screens */}
              <span className="hidden lg:block text-sm font-medium xl:text-base 2xl:text-lg whitespace-nowrap">
                {item.name}
              </span>

              {/* Arrow indicator for active item */}
              {isActive && (
                <svg
                  className="hidden lg:block ml-auto w-4 h-4 xl:w-5 xl:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Social Links */}
      <div className="px-2 lg:px-4 xl:px-5 2xl:px-6 py-6 lg:py-8">
        <div className="flex items-center justify-center gap-3 lg:gap-4 xl:gap-5">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 lg:w-10 lg:h-10 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 
                         bg-[#4A4A4A] rounded-full flex items-center justify-center
                         hover:bg-[#5A5A5A] transition-colors duration-200"
              aria-label={social.name}
            >
              <div className="relative w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6">
                <Image
                  src={social.icon}
                  alt={social.name}
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
