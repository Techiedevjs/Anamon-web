"use client";

import { useState, useCallback } from "react";
import { useLoginWithEmail } from "@privy-io/react-auth";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";

interface EmailAuthFormProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

type Step = "email" | "otp";

export default function EmailAuthForm({
  onSuccess,
  onError,
}: EmailAuthFormProps) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<Step>("email");

  const { sendCode, loginWithCode, state } = useLoginWithEmail({
    onComplete: ({ user, isNewUser }) => {
      console.log("Email login successful", { user, isNewUser });
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Email login failed", error);
      onError?.(error);
    },
  });

  const isSendingCode = state.status === "sending-code";
  const isSubmittingCode = state.status === "submitting-code";
  const hasError = state.status === "error";
  const isLoading = isSendingCode || isSubmittingCode;

  const handleSendCode = useCallback(async () => {
    if (!email.trim()) return;

    try {
      await sendCode({ email: email.trim() });
      setStep("otp");
    } catch (err) {
      console.error("Send code error:", err);
    }
  }, [email, sendCode]);

  const handleVerifyCode = useCallback(async () => {
    if (!code.trim()) return;

    try {
      await loginWithCode({ code: code.trim() });
    } catch (err) {
      console.error("Verify code error:", err);
    }
  }, [code, loginWithCode]);

  const handleBackToEmail = useCallback(() => {
    setStep("email");
    setCode("");
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, action: () => void) => {
      if (e.key === "Enter") {
        e.preventDefault();
        action();
      }
    },
    []
  );

  // Email Input Step
  if (step === "email") {
    return (
      <div className="flex flex-col gap-4 w-full">
        {/* Error Message */}
        {hasError && state.error && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm text-center">
            {state.error.message || "An error occurred"}
          </div>
        )}

        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-foreground text-sm font-medium">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleSendCode)}
              placeholder="Enter your email"
              disabled={isLoading}
              className="w-full h-14 pl-12 pr-4 bg-transparent rounded-[14px] border-2 border-border text-foreground text-base placeholder:text-muted-foreground focus:border-[#E04548] focus:outline-none transition-colors disabled:opacity-60"
            />
          </div>
        </div>

        {/* Send Code Button */}
        <button
          type="button"
          onClick={handleSendCode}
          disabled={isLoading || !email.trim()}
          className="w-full h-14 rounded-[14px] bg-linear-to-r from-[#B71959] to-[#E04548] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
        >
          {isSendingCode ? (
            <>
              <Loader2 className="w-5 h-5 text-foreground animate-spin" />
              <span className="text-foreground text-base font-medium">
                Sending code...
              </span>
            </>
          ) : (
            <span className="text-foreground text-base font-medium">
              Send Code
            </span>
          )}
        </button>
      </div>
    );
  }

  // OTP Verification Step
  return (
    <div className="flex flex-col gap-4 w-full animate-fade-slide-in">
      {/* Back Button */}
      <button
        type="button"
        onClick={handleBackToEmail}
        disabled={isLoading}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors self-start touch-manipulation"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back</span>
      </button>

      {/* Instructions */}
      <div className="flex flex-col gap-1">
        <h3 className="text-foreground text-lg font-medium">
          Check your email
        </h3>
        <p className="text-muted-foreground text-sm">
          We sent a verification code to{" "}
          <span className="text-foreground font-medium">{email}</span>
        </p>
      </div>

      {/* Error Message */}
      {hasError && state.error && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm text-center">
          {state.error.message || "Invalid code. Please try again."}
        </div>
      )}

      {/* OTP Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="otp" className="text-foreground text-sm font-medium">
          Verification code
        </label>
        <input
          id="otp"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          onKeyDown={(e) => handleKeyDown(e, handleVerifyCode)}
          placeholder="Enter 6-digit code"
          maxLength={6}
          disabled={isLoading}
          autoFocus
          className="w-full h-14 px-4 bg-transparent rounded-[14px] border-2 border-border text-foreground text-center text-xl tracking-[0.3em] font-medium placeholder:text-muted-foreground placeholder:tracking-normal placeholder:text-base focus:border-[#E04548] focus:outline-none transition-colors disabled:opacity-60"
        />
      </div>

      {/* Verify Button */}
      <button
        type="button"
        onClick={handleVerifyCode}
        disabled={isLoading || code.length < 6}
        className="w-full h-14 rounded-[14px] bg-linear-to-r from-[#B71959] to-[#E04548] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
      >
        {isSubmittingCode ? (
          <>
            <Loader2 className="w-5 h-5 text-foreground animate-spin" />
            <span className="text-foreground text-base font-medium">
              Verifying...
            </span>
          </>
        ) : (
          <span className="text-foreground text-base font-medium">
            Verify & Login
          </span>
        )}
      </button>

      {/* Resend Code */}
      <button
        type="button"
        onClick={handleSendCode}
        disabled={isSendingCode}
        className="text-muted-foreground text-sm hover:text-foreground transition-colors self-center touch-manipulation disabled:opacity-60"
      >
        {isSendingCode ? "Sending..." : "Didn't receive the code? Resend"}
      </button>
    </div>
  );
}
