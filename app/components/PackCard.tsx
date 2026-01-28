"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Minus, Plus } from "lucide-react";
import PurchaseModal from "./PurchaseModal";

interface PackCardProps {
  name: string;
  price: number;
  image: string;
}

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

export default function PackCard({ name, price, image }: PackCardProps) {
  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const increment = useCallback(() => {
    setQuantity((prev) => Math.min(prev + 1, MAX_QUANTITY));
  }, []);

  const decrement = useCallback(() => {
    setQuantity((prev) => Math.max(prev - 1, MIN_QUANTITY));
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <>
      <div className="w-full h-80 sm:h-90 md:h-100 lg:h-106 bg-[#3E474C] rounded-xl sm:rounded-[14px] border border-[#2A2A2A] overflow-hidden relative">
        {/* Pack Image - Clickable */}
        <button
          type="button"
          onClick={openModal}
          className="w-full flex justify-center pt-3 sm:pt-4 md:pt-5 cursor-pointer hover:opacity-90 transition-opacity touch-manipulation"
          aria-label={`View ${name} details`}
        >
          <Image
            src={image}
            alt={name}
            width={166}
            height={227}
            className="w-25 sm:w-30 md:w-35 lg:w-41.5 h-34.25 sm:h-41 md:h-48 lg:h-56.75 object-contain"
            priority
          />
        </button>

        {/* Pack Info Overlay */}
        <div className="absolute left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 top-35 sm:top-42.5 md:top-50 lg:top-56 bg-[#1D1D1D] rounded-xl sm:rounded-[14px] border border-[#2A2A2A] shadow-[0px_1px_2px_rgba(0,0,0,0.04),0px_2px_8px_rgba(0,0,0,0.08)] px-2.5 sm:px-3 md:px-4 lg:px-5 pt-2.5 sm:pt-3 md:pt-4 pb-2">
          <p className="text-[#939BAA] text-[10px] sm:text-xs font-medium truncate">{name}</p>
          <p className="text-white text-sm sm:text-base md:text-lg font-semibold">{formattedPrice}</p>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 h-22 sm:h-25 md:h-27 lg:h-28 bg-[#1D1D1D] border-t border-[#2A2A2A]">
          {/* Quantity Selector */}
          <div className="mx-2 sm:mx-3 md:mx-4 mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl sm:rounded-[14px] border border-[#2A2A2A] shadow-[0px_1px_2px_rgba(0,0,0,0.04),0px_2px_8px_rgba(0,0,0,0.08)]">
            <button
              type="button"
              onClick={decrement}
              disabled={quantity <= MIN_QUANTITY}
              aria-label="Decrease quantity"
              className="w-5 h-5 sm:w-4 sm:h-4 flex items-center justify-center text-[#939BAA] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
            >
              <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <span 
              className="flex-1 text-center text-[#939BAA] text-[10px] sm:text-xs font-medium tabular-nums"
              aria-live="polite"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={increment}
              disabled={quantity >= MAX_QUANTITY}
              aria-label="Increase quantity"
              className="w-5 h-5 sm:w-4 sm:h-4 flex items-center justify-center text-[#939BAA] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Buy Button */}
          <button
            type="button"
            onClick={openModal}
            className="mx-2 sm:mx-3 md:mx-4 mt-1.5 sm:mt-2 w-[calc(100%-16px)] sm:w-[calc(100%-24px)] md:w-[calc(100%-32px)] p-2 sm:p-2.5 rounded-xl sm:rounded-[14px] border border-[#2A2A2A] shadow-[0px_1px_2px_rgba(0,0,0,0.04),0px_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center bg-linear-to-r from-[#B71959] to-[#E04548] hover:opacity-90 transition-opacity touch-manipulation"
          >
            <span className="text-white text-[10px] sm:text-xs font-medium">Buy</span>
          </button>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pack={{
          name,
          price,
          quantity,
          image,
        }}
      />
    </>
  );
}
