"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { LogOut, Wallet, Mail, Copy, Check } from "lucide-react";
import { useState, useCallback } from "react";

export default function UserProfile() {
  const { user, logout, ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Get the embedded wallet
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === "privy");
  const walletAddress = embeddedWallet?.address;

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
  }, [logout]);

  // Loading state
  if (!ready) {
    return (
      <div className="w-full p-6 bg-background rounded-2xl border border-border animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-muted" />
          <div className="flex-1">
            <div className="h-4 w-32 bg-muted rounded mb-2" />
            <div className="h-3 w-24 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!authenticated || !user) {
    return null;
  }

  // Get user's email
  const userEmail = user.email?.address || user.google?.email || user.apple?.email;

  return (
    <div className="w-full flex flex-col gap-4 p-5 sm:p-6 bg-background rounded-2xl border border-border">
      {/* User Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#B71959] to-[#E04548] flex items-center justify-center">
            <span className="text-foreground text-lg font-semibold uppercase">
              {userEmail ? userEmail.charAt(0) : "U"}
            </span>
          </div>
          
          {/* User Info */}
          <div className="flex flex-col">
            <span className="text-foreground text-base font-medium">
              Welcome back!
            </span>
            <span className="text-muted-foreground text-sm">
              Logged in successfully
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors touch-manipulation"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Email Section */}
      {userEmail && (
        <div className="flex items-center gap-3 p-3.5 bg-muted/30 rounded-xl">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Mail className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-muted-foreground text-xs">Email</span>
            <span className="text-foreground text-sm font-medium truncate">
              {userEmail}
            </span>
          </div>
        </div>
      )}

      {/* Wallet Section */}
      {walletAddress && (
        <div className="flex items-center gap-3 p-3.5 bg-muted/30 rounded-xl">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Wallet className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-muted-foreground text-xs">Embedded Wallet</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground text-sm font-medium font-mono">
                {truncateAddress(walletAddress)}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(walletAddress)}
                className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
                aria-label="Copy wallet address"
              >
                {copiedAddress ? (
                  <Check className="w-4 h-4 text-[#10B981]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Wallet Warning */}
      {!walletAddress && (
        <div className="flex items-center gap-3 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <Wallet className="w-5 h-5 text-amber-500" />
          <span className="text-amber-500 text-sm">
            Creating your embedded wallet...
          </span>
        </div>
      )}
    </div>
  );
}
