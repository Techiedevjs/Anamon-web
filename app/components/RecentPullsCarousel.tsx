"use client";

import { useRef } from "react";
import RecentPullCard, { RecentPullCardProps } from "./RecentPullCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Dummy data for 6 cards
const recentPulls: RecentPullCardProps[] = [
  {
    id: 1,
    name: "Crimsnip",
    image: "/Crimsnip 1.png",
    leftBadgeNumber: 1,
    rightBadgeNumber: 2,
    timeAgo: "1m ago",
    type: "Aqua",
    rarity: "Common",
    packName: "Standard Anamon Pack",
    packImage: "/Standard pack design2 4.png",
  },
  {
    id: 2,
    name: "Crimsnip",
    image: "/Crimsnip 1.png",
    leftBadgeNumber: 1,
    rightBadgeNumber: 2,
    timeAgo: "2m ago",
    type: "Aqua",
    rarity: "Uncommon",
    packName: "Standard Anamon Pack",
    packImage: "/Standard pack design2 4.png",
  },
  {
    id: 3,
    name: "Crimsnip",
    image: "/Crimsnip 1.png",
    leftBadgeNumber: 1,
    rightBadgeNumber: 2,
    timeAgo: "3m ago",
    type: "Aqua",
    rarity: "Rare",
    packName: "Standard Anamon Pack",
    packImage: "/Standard pack design2 4.png",
  },
  {
    id: 4,
    name: "Crimsnip",
    image: "/Crimsnip 1.png",
    leftBadgeNumber: 1,
    rightBadgeNumber: 2,
    timeAgo: "5m ago",
    type: "Aqua",
    rarity: "Elite",
    packName: "Standard Anamon Pack",
    packImage: "/Standard pack design2 4.png",
  },
  {
    id: 5,
    name: "Crimsnip",
    image: "/Crimsnip 1.png",
    leftBadgeNumber: 1,
    rightBadgeNumber: 2,
    timeAgo: "8m ago",
    type: "Aqua",
    rarity: "Common",
    packName: "Standard Anamon Pack",
    packImage: "/Standard pack design2 4.png",
  },
  {
    id: 6,
    name: "Crimsnip",
    image: "/Crimsnip 1.png",
    leftBadgeNumber: 1,
    rightBadgeNumber: 6,
    timeAgo: "10m ago",
    type: "Aqua",
    rarity: "Rare",
    packName: "Standard Anamon Pack",
    packImage: "/Standard pack design2 4.png",
  },
];

export default function RecentPullsCarousel() {
  const plugin = useRef(
    Autoplay({ 
      delay: 3000, 
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <div 
      className="w-full overflow-hidden rounded-[10px] sm:rounded-[12px] md:rounded-[14px] border border-[#2A2A2A] bg-[#1D1D1D] h-[280px] sm:h-[310px] md:h-[340px] lg:h-[360px] p-3 sm:p-4 md:p-[18px] lg:p-5"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full h-full"
      >
        <CarouselContent className="h-full -ml-2 sm:-ml-3">
          {recentPulls.map((card) => (
            <CarouselItem 
              key={card.id} 
              className="basis-auto pl-2 sm:pl-3"
            >
              <RecentPullCard {...card} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
