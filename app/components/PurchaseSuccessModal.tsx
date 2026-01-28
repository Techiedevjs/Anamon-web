"use client";

import Image from "next/image";

interface PurchaseSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  pack: {
    name: string;
    image: string;
    quantity: number;
  };
  amountPaid: number;
  pointsEarned: number;
  onOpenPack: () => void;
  onViewInventory: () => void;
}

export default function PurchaseSuccessModal({
  isOpen,
  onClose,
  pack,
  amountPaid,
  pointsEarned,
  onOpenPack,
  onViewInventory,
}: PurchaseSuccessModalProps) {
  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatPoints = (points: number) => {
    return `+${points.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2.5px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div 
        className="relative w-full sm:max-w-md h-auto max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-background rounded-t-3xl sm:rounded-3xl border border-border shadow-[0px_4px_12px_rgba(0,0,0,0.10),0px_20px_60px_rgba(0,0,0,0.15)] animate-fade-slide-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
      >
        <div className="flex flex-col items-center px-6 sm:px-12 py-10 sm:py-12 gap-6">
          {/* Success Icon */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#10B981]/8 rounded-3xl shadow-[0px_8px_24px_#42DE80] flex items-center justify-center">
            <Image
              src="/purchase-success.svg"
              alt="Success"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </div>

          {/* Title */}
          <h2 
            id="success-modal-title" 
            className="text-foreground text-2xl sm:text-[28px] font-semibold leading-tight text-center"
          >
            Purchase Successful!
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground text-base leading-6 text-center -mt-2">
            Your <span className="font-medium">{pack.name.replace(" Anamons Pack", " Pack")}</span> has been added to your inventory.
          </p>

          {/* Pack Image */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white/0 shadow-[0px_8px_24px_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden flex items-center justify-center">
            <Image
              src={pack.image}
              alt={pack.name}
              width={75}
              height={102}
              className="w-16 h-22 sm:w-18.75 sm:h-25.5 object-contain"
            />
          </div>

          {/* Summary Card */}
          <div className="w-full bg-background rounded-2xl border border-border p-5 sm:p-6 flex flex-col gap-3">
            {/* Amount Paid */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-base leading-6">
                Amount Paid
              </span>
              <span className="text-foreground text-lg font-medium leading-6.75">
                {formatPrice(amountPaid)}
              </span>
            </div>

            {/* Points Earned */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-base leading-6">
                Points Earned
              </span>
              <span className="text-[#10B981] text-lg font-medium leading-6.75">
                {formatPoints(pointsEarned)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-3">
            {/* Open Pack Now - Primary Button */}
            <button
              type="button"
              onClick={onOpenPack}
              className="w-full h-14 rounded-[14px] bg-linear-to-r from-[#B71959] to-[#E04548] flex items-center justify-center hover:opacity-90 transition-opacity touch-manipulation"
            >
              <span className="text-foreground text-base font-medium leading-6 tracking-[2px]">
                OPEN PACK NOW
              </span>
            </button>

            {/* View Inventory - Secondary Button */}
            <button
              type="button"
              onClick={onViewInventory}
              className="w-full h-15 rounded-[14px] bg-background border-2 border-border flex items-center justify-center hover:border-[#3A3A3A] transition-colors touch-manipulation"
            >
              <span className="text-muted-foreground text-base font-medium leading-6">
                View Inventory
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
