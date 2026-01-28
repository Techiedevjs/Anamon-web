"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Time period options
const timePeriods = ["10m", "1h", "6h", "1d", "7d", "30d"];

// Mock data for the table
const topAnamonsData = [
  {
    rank: 1,
    name: "Waspinik",
    floor: 4.88,
    topOffer: 4.80,
    floorChange: 15.0,
    isPositive: true,
    volume: 113.25,
    sales: 23,
    listed: 13,
    listedChange: -2,
    chartImage: "/Top-anamons-chart-icon/TrendChart.png",
  },
  {
    rank: 2,
    name: "Waspinik",
    floor: 0.13,
    topOffer: 0.13,
    floorChange: 9.4,
    isPositive: true,
    volume: 97.28,
    sales: 788,
    listed: 4.8,
    listedChange: 1.2,
    chartImage: "/Top-anamons-chart-icon/TrendChart (1).png",
  },
  {
    rank: 3,
    name: "Waspinik",
    floor: 0.75,
    topOffer: 0.71,
    floorChange: 171.0,
    isPositive: true,
    volume: 81.76,
    sales: 71,
    listed: 4.2,
    listedChange: -0.5,
    chartImage: "/Top-anamons-chart-icon/TrendChart (2).png",
  },
  {
    rank: 4,
    name: "Waspinik",
    floor: 0.38,
    topOffer: 0.38,
    floorChange: 11.6,
    isPositive: false,
    volume: 58.26,
    sales: 125,
    listed: 2.4,
    listedChange: -1.8,
    chartImage: "/Top-anamons-chart-icon/TrendChart (3).png",
  },
  {
    rank: 5,
    name: "Waspinik",
    floor: 2.08,
    topOffer: 1.99,
    floorChange: 3.8,
    isPositive: true,
    volume: 53.88,
    sales: 27,
    listed: 11,
    listedChange: 0.3,
    chartImage: "/Top-anamons-chart-icon/TrendChart (4).png",
  },
  {
    rank: 6,
    name: "CRIMSNIP",
    floor: 0.75,
    topOffer: 0.68,
    floorChange: 318.5,
    isPositive: true,
    volume: 32.31,
    sales: 47,
    listed: 2.5,
    listedChange: 0.8,
    chartImage: "/Top-anamons-chart-icon/TrendChart (5).png",
  },
  {
    rank: 7,
    name: "Waspinik",
    floor: 26.77,
    topOffer: 24.41,
    floorChange: 5.2,
    isPositive: false,
    volume: 550.72,
    sales: 21,
    listed: 3.2,
    listedChange: -0.9,
    chartImage: "/Top-anamons-chart-icon/TrendChart (6).png",
  },
  {
    rank: 8,
    name: "Waspinik",
    floor: 1.20,
    topOffer: 1.10,
    floorChange: 3.5,
    isPositive: true,
    volume: 24.55,
    sales: 10,
    listed: 2,
    listedChange: 0.5,
    chartImage: "/Top-anamons-chart-icon/TrendChart (7).png",
  },
  {
    rank: 9,
    name: "Waspinik",
    floor: 0.88,
    topOffer: 0.88,
    floorChange: 3.5,
    isPositive: true,
    volume: 520.05,
    sales: 608,
    listed: 22.1,
    listedChange: 1.4,
    chartImage: "/Top-anamons-chart-icon/TrendChart (8).png",
  },
  {
    rank: 10,
    name: "Waspinik",
    floor: 0.55,
    topOffer: 0.55,
    floorChange: 3.7,
    isPositive: true,
    volume: 22.19,
    sales: 41,
    listed: 1.8,
    listedChange: -0.2,
    chartImage: "/Top-anamons-chart-icon/TrendChart (9).png",
  },
];

export default function TopAnamons() {
  const [selectedPeriod, setSelectedPeriod] = useState("1d");
  const [badgedEnabled, setBadgedEnabled] = useState(false);
  const [usdEnabled, setUsdEnabled] = useState(false);

  return (
    <div className="w-full">
      {/* Section Title */}
      <h2 className="text-[#939BAA] font-semibold text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] leading-[100%] mb-4 sm:mb-6">
        Top Anamons
      </h2>

      {/* Main Container */}
      <div className="bg-[#1D1D1D] rounded-[14px] border border-[#2A2A2A] overflow-hidden">
        {/* Header with filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 border-b border-[#2A2A2A] bg-[#333333]">
          {/* Left side - Toggles and Time periods */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Badged Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-[#939BAA] text-xs sm:text-sm">Badged</span>
              <button
                onClick={() => setBadgedEnabled(!badgedEnabled)}
                className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors relative ${
                  badgedEnabled ? "bg-gradient-to-r from-[#B71959] to-[#E04548]" : "bg-[#3E474C]"
                }`}
              >
                <div
                  className={`absolute top-0.5 sm:top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    badgedEnabled ? "translate-x-5 sm:translate-x-6" : "translate-x-0.5 sm:translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* USD Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-[#939BAA] text-xs sm:text-sm">USD</span>
              <button
                onClick={() => setUsdEnabled(!usdEnabled)}
                className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors relative ${
                  usdEnabled ? "bg-gradient-to-r from-[#B71959] to-[#E04548]" : "bg-[#3E474C]"
                }`}
              >
                <div
                  className={`absolute top-0.5 sm:top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    usdEnabled ? "translate-x-5 sm:translate-x-6" : "translate-x-0.5 sm:translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Time Period Tabs */}
            <div className="flex items-center bg-[#2A2A2A] rounded-full p-1">
              {timePeriods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors ${
                    selectedPeriod === period
                      ? "bg-gradient-to-r from-[#B71959] to-[#E04548] text-white"
                      : "text-[#939BAA] hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - See all button */}
          <Link
            href="/Top-anamons"
            className="flex items-center gap-2 bg-gradient-to-r from-[#B71959] to-[#E04548] text-white px-4 py-2 rounded-[14px] text-sm font-medium hover:opacity-90 transition-opacity w-fit"
          >
            See all
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#333333] text-[#939BAA] text-xs uppercase">
                <th className="text-left py-4 px-4 font-medium">#</th>
                <th className="text-left py-4 px-4 font-medium">Collection</th>
                <th className="text-center py-4 px-4 font-medium">Floor</th>
                <th className="text-center py-4 px-4 font-medium">Top Offer</th>
                <th className="text-center py-4 px-4 font-medium">Floor 1D %</th>
                <th className="text-center py-4 px-4 font-medium">Volume</th>
                <th className="text-center py-4 px-4 font-medium">Sales</th>
                <th className="text-center py-4 px-4 font-medium">Listed</th>
                <th className="text-center py-4 px-4 font-medium">Last 1D</th>
              </tr>
            </thead>
            <tbody>
              {topAnamonsData.map((item) => (
                <tr
                  key={item.rank}
                  className="border-b border-[#2A2A2A] hover:bg-[#252525] transition-colors"
                >
                  {/* Rank */}
                  <td className="py-4 px-4 text-[#939BAA] text-sm">{item.rank}</td>
                  
                  {/* Collection */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#3E474C]">
                        <Image
                          src="/Container.png"
                          alt={item.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-white font-medium">{item.name}</span>
                    </div>
                  </td>
                  
                  {/* Floor */}
                  <td className="py-4 px-4 text-center">
                    <div className="text-white font-medium">{item.floor}</div>
                    <div className="text-[#939BAA] text-xs">USDC</div>
                  </td>
                  
                  {/* Top Offer */}
                  <td className="py-4 px-4 text-center">
                    <div className="text-white font-medium">{item.topOffer}</div>
                    <div className="text-[#939BAA] text-xs">USDC</div>
                  </td>
                  
                  {/* Floor 1D % */}
                  <td className="py-4 px-4 text-center">
                    <div className={`flex items-center justify-center gap-1 ${
                      item.isPositive ? "text-[#22C55E]" : "text-[#EF4444]"
                    }`}>
                      <Image
                        src={item.isPositive ? "/arrow-up.png" : "/arrow-down.png"}
                        alt={item.isPositive ? "up" : "down"}
                        width={12}
                        height={12}
                      />
                      <span className="font-medium">
                        {item.isPositive ? "+" : "-"}{item.floorChange}%
                      </span>
                    </div>
                  </td>
                  
                  {/* Volume */}
                  <td className="py-4 px-4 text-center">
                    <div className="text-white font-medium">{item.volume}</div>
                    <div className="text-[#939BAA] text-xs">USDC</div>
                  </td>
                  
                  {/* Sales */}
                  <td className="py-4 px-4 text-center text-white font-medium">
                    {item.sales}
                  </td>
                  
                  {/* Listed */}
                  <td className="py-4 px-4 text-center">
                    <div className="text-white font-medium">{item.listed}%</div>
                    <div className={`text-xs ${
                      item.listedChange >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"
                    }`}>
                      {item.listedChange >= 0 ? "+" : ""}{item.listedChange}%
                    </div>
                  </td>
                  
                  {/* Last 1D Chart */}
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <Image
                        src={item.chartImage}
                        alt="trend"
                        width={80}
                        height={32}
                        className="object-contain"
                        style={{ height: 'auto' }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden divide-y divide-[#2A2A2A]">
          {topAnamonsData.map((item) => (
            <div key={item.rank} className="p-4 hover:bg-[#252525] transition-colors">
              {/* Top row - Rank, Collection, Chart */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#939BAA] text-sm font-medium w-6">{item.rank}</span>
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#3E474C]">
                    <Image
                      src="/Container.png"
                      alt={item.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-white font-medium">{item.name}</span>
                </div>
                <Image
                  src={item.chartImage}
                  alt="trend"
                  width={60}
                  height={24}
                  className="object-contain"
                  style={{ height: 'auto' }}
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {/* Floor */}
                <div className="bg-[#252525] rounded-lg p-2">
                  <div className="text-[#939BAA] text-xs mb-1">Floor</div>
                  <div className="text-white font-medium">{item.floor} <span className="text-[#939BAA] text-xs">USDC</span></div>
                </div>

                {/* Floor Change */}
                <div className="bg-[#252525] rounded-lg p-2">
                  <div className="text-[#939BAA] text-xs mb-1">Floor 1D %</div>
                  <div className={`flex items-center gap-1 font-medium ${
                    item.isPositive ? "text-[#22C55E]" : "text-[#EF4444]"
                  }`}>
                    <Image
                      src={item.isPositive ? "/arrow-up.png" : "/arrow-down.png"}
                      alt={item.isPositive ? "up" : "down"}
                      width={10}
                      height={10}
                    />
                    {item.isPositive ? "+" : "-"}{item.floorChange}%
                  </div>
                </div>

                {/* Volume */}
                <div className="bg-[#252525] rounded-lg p-2">
                  <div className="text-[#939BAA] text-xs mb-1">Volume</div>
                  <div className="text-white font-medium">{item.volume} <span className="text-[#939BAA] text-xs">USDC</span></div>
                </div>

                {/* Sales */}
                <div className="bg-[#252525] rounded-lg p-2">
                  <div className="text-[#939BAA] text-xs mb-1">Sales</div>
                  <div className="text-white font-medium">{item.sales}</div>
                </div>
              </div>

              {/* Bottom row - Additional stats (hidden on very small screens) */}
              <div className="hidden sm:grid grid-cols-2 gap-3 mt-3 text-sm">
                {/* Top Offer */}
                <div className="bg-[#252525] rounded-lg p-2">
                  <div className="text-[#939BAA] text-xs mb-1">Top Offer</div>
                  <div className="text-white font-medium">{item.topOffer} <span className="text-[#939BAA] text-xs">USDC</span></div>
                </div>

                {/* Listed */}
                <div className="bg-[#252525] rounded-lg p-2">
                  <div className="text-[#939BAA] text-xs mb-1">Listed</div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{item.listed}%</span>
                    <span className={`text-xs ${
                      item.listedChange >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"
                    }`}>
                      {item.listedChange >= 0 ? "+" : ""}{item.listedChange}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
