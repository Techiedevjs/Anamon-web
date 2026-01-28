import Image from "next/image";

export interface RecentPullCardProps {
  id: number;
  name: string;
  image: string;
  leftBadgeNumber: number;
  rightBadgeNumber: number;
  timeAgo: string;
  type: string; // e.g., "Aqua"
  rarity: "Common" | "Uncommon" | "Rare" | "Elite";
  packName: string;
  packImage: string;
}

// Rarity badge color mapping
const rarityBadgeColors: Record<string, string> = {
  Common: "bg-[#4A4A4A]",
  Uncommon: "bg-[#22C55E]",
  Rare: "bg-[#3B82F6]",
  Elite: "bg-[#A855F7]",
};

// Frame images based on rarity
const frameImages: Record<string, string> = {
  Common: "/card-frames/frame-1.png",
  Rare: "/card-frames/frame-2.png",
  Uncommon: "/card-frames/frame-3.png",
  Elite: "/card-frames/frame-4.png",
};

export default function RecentPullCard({
  name,
  leftBadgeNumber,
  rightBadgeNumber,
  timeAgo,
  type,
  rarity,
  packName,
  packImage,
}: RecentPullCardProps) {
  const frameImage = frameImages[rarity] || frameImages.Common;

  return (
    <div className="w-45 sm:w-50 md:w-55 lg:w-60 h-60 sm:h-67.5 md:h-75 lg:h-80 shrink-0 rounded-[10px] sm:rounded-2xl md:rounded-[14px] border border-[#2A2A2A] bg-[#3E474C] overflow-hidden flex flex-col">
      {/* Top Section - Frame Area */}
      <div className="flex-1 flex items-center justify-center relative px-3 sm:px-4 md:px-5 lg:px-6 pt-4 sm:pt-5 lg:pt-6">

        {/* Frame Image Container */}
        <div className="relative">
          {/* Time tag - positioned above right badge */}
          <span className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 translate-x-3/4 -translate-y-1 bg-[#3E474C] text-white text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap z-40 border border-[#2A2A2A]/30">
            {timeAgo}
          </span>

          <Image
            src={frameImage}
            alt={name}
            width={138}
            height={181}
            quality={90}
            className="object-contain rounded-md sm:rounded-lg w-[100px] h-[131px] sm:w-[115px] sm:h-[151px] md:w-[130px] md:h-[170px] lg:w-[138px] lg:h-[181px]"
            style={{
              boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}
          />

          {/* Left Badge - Blue gradient - positioned at top-left edge of frame */}
          <div 
            className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] sm:text-xs md:text-sm shadow-lg z-30"
            style={{
              background: "linear-gradient(180deg, #7091FF 0%, #1436A9 100%)"
            }}
          >
            {leftBadgeNumber}
          </div>

          {/* Right Badge - positioned at top-right edge of frame */}
          <div 
            className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] sm:text-xs md:text-sm shadow-lg z-30"
            style={{
              background: "linear-gradient(180deg, #E04548 0%, #B71959 100%)"
            }}
          >
            {rightBadgeNumber}
          </div>

          {/* Sparkle effects - positioned around the frame */}
          {/* Left side sparkle */}
          <Image
            src="/sparkles.svg"
            alt=""
            width={36}
            height={36}
            className="absolute top-1/4 -left-3 sm:-left-4 md:-left-5 z-20 w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
          />
          {/* Bottom-right edge sparkle */}
          <Image
            src="/sparkles.svg"
            alt=""
            width={36}
            height={36}
            className="absolute -bottom-2 -right-3 sm:-bottom-3 sm:-right-4 z-20 w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
          />
        </div>
      </div>

      {/* Bottom Section - Info */}
      <div className="w-full h-[85px] sm:h-[90px] md:h-[95px] lg:h-[100px] bg-[#1D1D1D] border-t border-[#2A2A2A] px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col justify-center gap-2 sm:gap-2.5">
        {/* Name and Tags */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <h3 className="text-white font-semibold text-sm sm:text-base">{name}</h3>
          
          {/* Type Tag - Aqua colored */}
          <span className="bg-[#06B6D4] text-white text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full">
            {type}
          </span>
          
          {/* Rarity Tag */}
          <span className={`${rarityBadgeColors[rarity]} text-white text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full`}>
            {rarity}
          </span>
        </div>

        {/* Pack Info - rounded border container */}
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-[#2A2A2A] w-fit">
          <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded overflow-hidden flex-shrink-0">
            <Image
              src={packImage}
              alt={packName}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <span className="text-[#939BAA] text-[10px] sm:text-xs">{packName}</span>
        </div>
      </div>
    </div>
  );
}
