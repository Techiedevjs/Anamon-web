"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Time period options
const timePeriods = ["Weekly", "Monthly"];

// Current user data (shown at top)
const currentUserData = {
  rank: 1212,
  name: "User",
  volume: 122202.94,
  totalPulls: 180,
  points: 23000,
  isCurrentUser: true,
};

// Mock data for the leaderboard (top collectors)
const topCollectorsData = [
  {
    rank: 1,
    name: "User",
    volume: 122202.94,
    totalPulls: 180,
    points: 23000,
    isCurrentUser: false,
  },
  {
    rank: 2,
    name: "User",
    volume: 122202.94,
    totalPulls: 180,
    points: 23000,
    isCurrentUser: false,
  },
  {
    rank: 3,
    name: "User",
    volume: 122202.94,
    totalPulls: 180,
    points: 23000,
    isCurrentUser: false,
  },
  {
    rank: 4,
    name: "User",
    volume: 122202.94,
    totalPulls: 180,
    points: 23000,
    isCurrentUser: false,
  },
  {
    rank: 5,
    name: "User",
    volume: 122202.94,
    totalPulls: 180,
    points: 23000,
    isCurrentUser: false,
  },
  {
    rank: 6,
    name: "User",
    volume: 122202.94,
    totalPulls: 180,
    points: 23000,
    isCurrentUser: false,
  },
  {
    rank: 7,
    name: "User",
    volume: 122202.94,
    totalPulls: 180,
    points: 23000,
    isCurrentUser: false,
  },
  {
    rank: 8,
    name: "User",
    volume: 122202.94,
    totalPulls: 180,
    points: 23000,
    isCurrentUser: false,
  },
  {
    rank: 9,
    name: "User",
    volume: 122202.94,
    totalPulls: 180,
    points: 23000,
    isCurrentUser: false,
  },
];

// Combined data: current user first, then top collectors
const collectorsData = [currentUserData, ...topCollectorsData];

export default function CollectorLeaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US");
  };

  // Format volume as USD with decimals
  const formatVolume = (num: number) => {
    return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="w-full">
      {/* Section Title */}
      <h2 className="text-[#939BAA] font-semibold text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] leading-[100%] mb-4 sm:mb-6">
        Collector Leaderboard
      </h2>

      {/* Main Container */}
      <div className="bg-[#1D1D1D] rounded-[14px] border border-[#2A2A2A] overflow-hidden">
        {/* Header with filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 border-b border-[#2A2A2A] bg-[#333333]">
          {/* Left side - Time period tabs */}
          <div className="flex items-center bg-[#2A2A2A] rounded-full p-1">
            {timePeriods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-colors ${
                  selectedPeriod === period
                    ? "bg-linear-to-r from-[#B71959] to-[#E04548] text-white"
                    : "text-[#939BAA] hover:text-white"
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Right side - See all button */}
          <Link
            href="/collectors"
            className="flex items-center gap-2 bg-linear-to-r from-[#B71959] to-[#E04548] text-white px-4 py-2 rounded-[14px] text-sm font-medium hover:opacity-90 transition-opacity w-fit"
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
                <th className="text-left py-4 px-4 font-medium">Name</th>
                <th className="text-center py-4 px-4 font-medium">Volume</th>
                <th className="text-center py-4 px-4 font-medium">Total Pulls</th>
                <th className="text-center py-4 px-4 font-medium">Points</th>
              </tr>
            </thead>
            <tbody>
              {collectorsData.map((item) => (
                <tr
                  key={item.rank}
                  className={`border-b border-[#2A2A2A] hover:bg-[#252525] transition-colors ${
                    item.isCurrentUser ? "bg-[#252525]" : ""
                  }`}
                >
                  {/* Rank */}
                  <td className="py-4 px-4 text-[#939BAA] text-sm">{item.rank}</td>
                  
                  {/* Name with Avatar */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#3E474C]">
                        <Image
                          src="/Container.png"
                          alt={item.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{item.name}</span>
                        {item.isCurrentUser && (
                          <span className="text-[#E04548] text-sm">(you)</span>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  {/* Volume */}
                  <td className="py-4 px-4 text-center text-white font-medium">
                    {formatVolume(item.volume)}
                  </td>
                  
                  {/* Total Pulls */}
                  <td className="py-4 px-4 text-center text-white font-medium">
                    {formatNumber(item.totalPulls)}
                  </td>
                  
                  {/* Points */}
                  <td className="py-4 px-4 text-center text-white font-medium">
                    {formatNumber(item.points)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden">
          {collectorsData.map((item) => (
            <div
              key={item.rank}
              className={`p-4 border-b border-[#2A2A2A] ${
                item.isCurrentUser ? "bg-[#252525]" : ""
              }`}
            >
              {/* Top row - Rank and Name */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#939BAA] text-sm font-medium w-6">
                  {item.rank}
                </span>
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#3E474C]">
                  <Image
                    src="/Container.png"
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{item.name}</span>
                  {item.isCurrentUser && (
                    <span className="text-[#E04548] text-sm">(you)</span>
                  )}
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-4 ml-9">
                <div>
                  <div className="text-[#939BAA] text-xs uppercase mb-1">Volume</div>
                  <div className="text-white text-sm font-medium">
                    {formatVolume(item.volume)}
                  </div>
                </div>
                <div>
                  <div className="text-[#939BAA] text-xs uppercase mb-1">Pulls</div>
                  <div className="text-white text-sm font-medium">
                    {formatNumber(item.totalPulls)}
                  </div>
                </div>
                <div>
                  <div className="text-[#939BAA] text-xs uppercase mb-1">Points</div>
                  <div className="text-white text-sm font-medium">
                    {formatNumber(item.points)}
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
