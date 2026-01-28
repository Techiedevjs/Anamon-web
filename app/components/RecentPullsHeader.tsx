import Link from "next/link";
import Image from "next/image";

export default function RecentPullsHeader() {
  return (
    <div className="w-full flex items-center justify-between">
      {/* Recent Pulls Title */}
      <h2 className="text-[#939BAA] font-semibold 
                     text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] 
                     leading-[100%]">
        Recent Pulls
      </h2>

      {/* Buy Packs Button - Outlined */}
      <Link
        href="/packs"
        className="flex items-center justify-center gap-2
                   h-[38px] sm:h-[40px] lg:h-[44px]
                   px-3 sm:px-4 lg:px-5
                   border border-[#2A2A2A] bg-transparent
                   rounded-[14px]
                   text-white font-medium text-xs sm:text-sm lg:text-base uppercase
                   hover:bg-[#2A2A2A] transition-colors duration-200"
      >
        <span>Buy Packs</span>
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
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </Link>
    </div>
  );
}
