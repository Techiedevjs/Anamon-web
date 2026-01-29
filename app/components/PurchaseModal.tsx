"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { X } from "lucide-react";
import PurchaseSuccessModal from "./PurchaseSuccessModal";

interface PackData {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  pack: PackData;
}

type Currency = "USDC";

interface WalletBalance {
  USDC: number;
}

const POINTS_PER_PURCHASE = 2500;

export default function PurchaseModal({ isOpen, onClose, pack }: PurchaseModalProps) {
  const [selectedCurrency] = useState<Currency>("USDC");
  // TODO: Replace with actual wallet balance from Solana wallet integration
  const [walletBalance] = useState<WalletBalance>({ USDC: 100 });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const subtotal = pack.price * pack.quantity;
  const total = subtotal;
  const selectedBalance = walletBalance[selectedCurrency];
  const amountNeeded = Math.max(0, subtotal - selectedBalance);
  const hasEnoughBalance = selectedBalance >= subtotal;

  const handlePromoCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  }, []);

  const handleConfirmPurchase = useCallback(() => {
    // In a real app, this would process the Solana payment
    // For now, just show the success modal
    setShowSuccessModal(true);
  }, []);

  const handleSuccessClose = useCallback(() => {
    setShowSuccessModal(false);
    onClose();
  }, [onClose]);

  const handleOpenPack = useCallback(() => {
    // Navigate to pack opening experience
    setShowSuccessModal(false);
    onClose();
    // TODO: Navigate to pack opening page
  }, [onClose]);

  const handleViewInventory = useCallback(() => {
    // Navigate to inventory
    setShowSuccessModal(false);
    onClose();
    // TODO: Navigate to inventory page
  }, [onClose]);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2.5px]"
        aria-hidden="true"
      />

      {/* Modal - Full screen on mobile, centered on larger screens */}
      <div 
        className="relative w-full sm:max-w-150 lg:max-w-214 h-[92vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto bg-[#1D1D1D] rounded-t-2xl sm:rounded-4xl border border-[#2A2A2A] shadow-[0px_3px_10px_rgba(0,0,0,0.10),0px_17px_50px_rgba(0,0,0,0.15)] animate-fade-slide-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-5 md:px-7 h-15 sm:h-18.5 bg-[#1D1D1D] border-b border-[#2A2A2A]">
          <h2 id="modal-title" className="text-white text-lg sm:text-xl font-medium">
            Buy a pack
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-[#4A5565] hover:text-white transition-colors touch-manipulation"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Stack on mobile, side by side on desktop */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-5 md:p-7">
          {/* Left Side - Wallet Payment Form */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-5">
            {/* Payment Method Header */}
            <div className="flex items-center gap-3">
              <Image src="/wallet.svg" alt="Wallet" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-white text-lg font-medium">Pay with Solana Wallet</span>
            </div>

            {/* Payment Currency */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <label className="text-white text-sm sm:text-base font-medium">
                Payment Currency
              </label>
              {/* USDC Option - Selected */}
              <div
                className="h-17 sm:h-19 px-3 sm:px-4 flex items-center justify-between rounded-[14px] bg-[#E04548]/5 border-2 border-[#E04548]"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* USDC Icon */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-[#2775CA]">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-white text-sm sm:text-base font-medium">USDC</span>
                    <span className="text-[#939BAA] text-[10px] sm:text-xs font-medium">on Solana</span>
                  </div>
                </div>
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#E04548] flex items-center justify-center">
                  <svg className="w-2.5 h-2 sm:w-3 sm:h-2.5" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1.5" stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Balance Info */}
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#252525] border border-[#2A2A2A]">
              <div className="flex justify-between">
                <span className="text-[#939BAA] text-sm">Your USDC Balance</span>
                <span className="text-white text-sm font-medium">{formatPrice(selectedBalance)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#939BAA] text-sm">Amount Required</span>
                <span className="text-white text-sm font-medium">{formatPrice(subtotal)}</span>
              </div>
              {amountNeeded > 0 && (
                <div className="flex justify-between pt-2 border-t border-[#2A2A2A]">
                  <span className="text-[#E04548] text-sm">Amount Needed</span>
                  <span className="text-[#E04548] text-sm font-medium">{formatPrice(amountNeeded)}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 sm:gap-3 pt-2">
              {hasEnoughBalance ? (
                /* Confirm Purchase Button */
                <button
                  type="button"
                  onClick={handleConfirmPurchase}
                  className="w-full h-13 sm:h-15 rounded-[14px] flex items-center justify-center bg-linear-to-r from-[#B71959] to-[#E04548] shadow-[0px_3px_13px_rgba(221,65,73,0.30)] hover:opacity-90 transition-opacity touch-manipulation"
                >
                  <span className="text-white text-sm sm:text-base font-medium">
                    Confirm Purchase of {formatPrice(total)}
                  </span>
                </button>
              ) : (
                /* Add Funds Button */
                <button
                  type="button"
                  className="w-full h-13 sm:h-15 rounded-[14px] flex items-center justify-center bg-linear-to-r from-[#B71959] to-[#E04548] border-2 border-[#2A2A2A] hover:opacity-90 transition-opacity touch-manipulation"
                >
                  <span className="text-white text-sm sm:text-base font-medium">Add Funds</span>
                </button>
              )}
              {amountNeeded > 0 && (
                <p className="text-center text-[#6A7282] text-xs sm:text-sm">
                  Need {formatPrice(amountNeeded)} more USDC to complete purchase
                </p>
              )}
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="w-full lg:w-75 flex flex-col gap-4 sm:gap-5 order-first lg:order-last">
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="text-[#939BAA] text-sm sm:text-base font-medium">Order summary</span>
              <span className="text-[#939BAA] text-xs">{pack.quantity} item{pack.quantity > 1 ? 's' : ''}</span>
            </div>

            {/* Pack Item */}
            <div className="flex items-center justify-between p-3 sm:p-3.5 bg-[#1D1D1D] rounded-xl border border-[#2A2A2A]">
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="w-12 h-12 sm:w-13.5 sm:h-13.5 rounded-xl overflow-hidden shadow-[0px_2px_7px_rgba(0,0,0,0.10)] flex items-center justify-center bg-[#3E474C]">
                  <Image
                    src={pack.image}
                    alt={pack.name}
                    width={37}
                    height={50}
                    className="object-contain w-8 h-10 sm:w-9.25 sm:h-12.5"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#939BAA] text-sm font-medium">{pack.name.replace(" Anamons Pack", " Pack")}</span>
                  <span className="text-[#939BAA] text-xs">Quantity: {pack.quantity}</span>
                </div>
              </div>
              <span className="text-[#939BAA] text-sm font-medium">{formatPrice(subtotal)}</span>
            </div>

            {/* Summary Totals */}
            <div className="flex flex-col gap-2 sm:gap-2.5 pt-3 sm:pt-3.5 border-t border-[#2A2A2A]">
              <div className="flex justify-between">
                <span className="text-[#939BAA] text-xs sm:text-[13px]">Subtotal</span>
                <span className="text-[#939BAA] text-xs sm:text-[13px]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#939BAA] text-xs sm:text-[13px]">Points</span>
                <span className="text-[#10B981] text-xs sm:text-[13px] font-medium">+{POINTS_PER_PURCHASE.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#2A2A2A]">
                <span className="text-white text-sm font-medium">Total</span>
                <span className="text-white text-sm font-medium">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex gap-1.5 pt-3 sm:pt-3.5 border-t border-[#2A2A2A]">
              <input
                type="text"
                value={promoCode}
                onChange={handlePromoCodeChange}
                placeholder="Enter promo code"
                className="flex-1 min-w-0 h-11 px-3 sm:px-3.5 bg-transparent rounded-xl border-2 border-[#2A2A2A] text-white text-xs sm:text-[13px] placeholder:text-[#939BAA] focus:border-[#E04548] focus:outline-none transition-colors"
              />
              <button
                type="button"
                className="shrink-0 w-17.5 sm:w-18.75 h-11 rounded-xl bg-linear-to-r from-[#B71959] to-[#E04548] text-white text-xs sm:text-[13px] font-medium hover:opacity-90 transition-opacity touch-manipulation"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Success Modal */}
      <PurchaseSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        pack={pack}
        amountPaid={total}
        pointsEarned={POINTS_PER_PURCHASE}
        onOpenPack={handleOpenPack}
        onViewInventory={handleViewInventory}
      />
    </div>
  );
}
