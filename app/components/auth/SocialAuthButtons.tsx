"use client";

import { useLoginWithOAuth } from "@privy-io/react-auth";
import Image from "next/image";

interface SocialAuthButtonsProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export default function SocialAuthButtons({
  onSuccess,
  onError,
}: SocialAuthButtonsProps) {
  const { initOAuth, state } = useLoginWithOAuth({
    onComplete: ({ user, isNewUser }) => {
      console.log("OAuth login successful", { user, isNewUser });
      onSuccess?.();
    },
    onError: (error) => {
      console.error("OAuth login failed", error);
      onError?.(error);
    },
  });

  const isLoading = state.status === "loading";
  const hasError = state.status === "error";

  const handleGoogleLogin = async () => {
    try {
      await initOAuth({ provider: "google" });
    } catch (err) {
      console.error("Google OAuth error:", err);
    }
  };

  const handleAppleLogin = async () => {
    try {
      await initOAuth({ provider: "apple" });
    } catch (err) {
      console.error("Apple OAuth error:", err);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Error Message */}
      {hasError && state.error && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm text-center">
          {state.error.message || "An error occurred during login"}
        </div>
      )}

      {/* Google Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full h-14 px-4 bg-white rounded-[14px] flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
      >
        <Image
          src="/google-Icon.svg"
          alt="Google"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <span className="text-gray-800 text-base font-medium">
          {isLoading ? "Connecting..." : "Continue with Google"}
        </span>
      </button>

      {/* Apple Button */}
      <button
        type="button"
        onClick={handleAppleLogin}
        disabled={isLoading}
        className="w-full h-14 px-4 bg-black rounded-[14px] flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
      >
        <Image
          src="/Applce-Icon.svg"
          alt="Apple"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <span className="text-white text-base font-medium">
          {isLoading ? "Connecting..." : "Continue with Apple"}
        </span>
      </button>
    </div>
  );
}
