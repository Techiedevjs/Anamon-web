"use client";

import { useState, useCallback, useEffect } from "react";
import { useLoginWithOAuth, useLoginWithEmail, useLoginWithSms } from "@privy-io/react-auth";
import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { useAuthModal } from "@/contexts/AuthModalContext";

type AuthStep = "initial" | "email-otp" | "sms-otp";

export default function LoginModal() {
  const { isOpen, closeAuthModal } = useAuthModal();
  const [authStep, setAuthStep] = useState<AuthStep>("initial");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  // OAuth hook
  const { initOAuth, state: oauthState } = useLoginWithOAuth({
    onComplete: () => {
      closeAuthModal();
      resetForm();
    },
    onError: (error) => {
      console.error("OAuth error:", error);
    },
  });

  // Email hook
  const { sendCode: sendEmailCode, loginWithCode: loginWithEmailCode, state: emailState } = useLoginWithEmail({
    onComplete: () => {
      closeAuthModal();
      resetForm();
    },
    onError: (error) => {
      console.error("Email error:", error);
    },
  });

  // SMS hook
  const { sendCode: sendSmsCode, loginWithCode: loginWithSmsCode, state: smsState } = useLoginWithSms({
    onComplete: () => {
      closeAuthModal();
      resetForm();
    },
    onError: (error) => {
      console.error("SMS error:", error);
    },
  });

  const resetForm = useCallback(() => {
    setAuthStep("initial");
    setEmail("");
    setPhone("");
    setCode("");
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAuthModal();
        resetForm();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeAuthModal, resetForm]);

  if (!isOpen) return null;

  const isOAuthLoading = oauthState.status === "loading";
  const isEmailSending = emailState.status === "sending-code";
  const isEmailSubmitting = emailState.status === "submitting-code";
  const isSmsSending = smsState.status === "sending-code";
  const isSmsSubmitting = smsState.status === "submitting-code";
  const isLoading = isOAuthLoading || isEmailSending || isEmailSubmitting || isSmsSending || isSmsSubmitting;

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

  const handleEmailSubmit = async () => {
    if (!email.trim()) return;
    try {
      await sendEmailCode({ email: email.trim() });
      setAuthStep("email-otp");
    } catch (err) {
      console.error("Email send code error:", err);
    }
  };

  const handleEmailVerify = async () => {
    if (!code.trim()) return;
    try {
      await loginWithEmailCode({ code: code.trim() });
    } catch (err) {
      console.error("Email verify error:", err);
    }
  };

  const handleSmsClick = async () => {
    setAuthStep("sms-otp");
  };

  const handleSmsSend = async () => {
    if (!phone.trim()) return;
    try {
      await sendSmsCode({ phone: phone.trim() });
    } catch (err) {
      console.error("SMS send code error:", err);
    }
  };

  const handleSmsVerify = async () => {
    if (!code.trim()) return;
    try {
      await loginWithSmsCode({ code: code.trim() });
    } catch (err) {
      console.error("SMS verify error:", err);
    }
  };

  const handleBackToInitial = () => {
    setAuthStep("initial");
    setCode("");
  };

  // OTP verification view for Email
  if (authStep === "email-otp") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-[2.5px]"
          onClick={() => { closeAuthModal(); resetForm(); }}
        />

        {/* Modal */}
        <div className="relative w-full max-w-[448px] bg-[#1D1D1D] rounded-3xl border border-[#2A2A2A] shadow-[0px_4px_12px_rgba(0,0,0,0.10),0px_20px_60px_rgba(0,0,0,0.15)] animate-fade-slide-in">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => { closeAuthModal(); resetForm(); }}
            className="absolute top-6 right-6 w-7 h-7 rounded-[10px] flex items-center justify-center text-[#939BAA] hover:text-white hover:bg-[#2A2A2A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center px-8 pt-10 pb-8 gap-6">
            {/* Logo */}
            <Image
              src="/Anamon Logo-login.png"
              alt="Anamon"
              width={178}
              height={49}
              className="h-12 w-auto"
            />

            {/* Heading */}
            <h2 className="text-white text-2xl font-semibold leading-9">
              Check your email
            </h2>

            {/* Subtitle */}
            <p className="text-[#939BAA] text-[15px] text-center">
              We sent a verification code to{" "}
              <span className="text-white font-medium">{email}</span>
            </p>

            {/* Error Message */}
            {emailState.status === "error" && emailState.error && (
              <div className="w-full p-3 bg-red-500/10 border border-red-500/30 rounded-[14px] text-red-400 text-sm text-center">
                {emailState.error.message || "Invalid code. Please try again."}
              </div>
            )}

            {/* OTP Input */}
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              onKeyDown={(e) => e.key === "Enter" && handleEmailVerify()}
              placeholder="Enter 6-digit code"
              maxLength={6}
              autoFocus
              className="w-full h-14 px-5 bg-[#1D1D1D] rounded-[14px] border border-[#2A2A2A] text-white text-center text-xl tracking-[0.3em] font-medium placeholder:text-[#939BAA] placeholder:tracking-normal placeholder:text-[15px] focus:border-[#E04548] focus:outline-none transition-colors"
            />

            {/* Verify Button */}
            <button
              type="button"
              onClick={handleEmailVerify}
              disabled={isEmailSubmitting || code.length < 6}
              className="w-full h-14 rounded-[14px] bg-gradient-to-r from-[#B71959] to-[#E04548] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isEmailSubmitting ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <span className="text-white text-[15px] font-medium">Verify & Login</span>
              )}
            </button>

            {/* Back & Resend */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleBackToInitial}
                className="text-[#939BAA] text-sm hover:text-white transition-colors"
              >
                ← Back
              </button>
              <span className="text-[#2A2A2A]">|</span>
              <button
                type="button"
                onClick={handleEmailSubmit}
                disabled={isEmailSending}
                className="text-[#939BAA] text-sm hover:text-white transition-colors disabled:opacity-60"
              >
                {isEmailSending ? "Sending..." : "Resend code"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SMS view
  if (authStep === "sms-otp") {
    const isSmsAwaitingCode = smsState.status === "awaiting-code-input";
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-[2.5px]"
          onClick={() => { closeAuthModal(); resetForm(); }}
        />

        {/* Modal */}
        <div className="relative w-full max-w-[448px] bg-[#1D1D1D] rounded-3xl border border-[#2A2A2A] shadow-[0px_4px_12px_rgba(0,0,0,0.10),0px_20px_60px_rgba(0,0,0,0.15)] animate-fade-slide-in">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => { closeAuthModal(); resetForm(); }}
            className="absolute top-6 right-6 w-7 h-7 rounded-[10px] flex items-center justify-center text-[#939BAA] hover:text-white hover:bg-[#2A2A2A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center px-8 pt-10 pb-8 gap-6">
            {/* Logo */}
            <Image
              src="/Anamon Logo-login.png"
              alt="Anamon"
              width={178}
              height={49}
              className="h-12 w-auto"
            />

            {/* Heading */}
            <h2 className="text-white text-2xl font-semibold leading-9">
              {isSmsAwaitingCode ? "Enter verification code" : "Enter your phone number"}
            </h2>

            {/* Error Message */}
            {smsState.status === "error" && smsState.error && (
              <div className="w-full p-3 bg-red-500/10 border border-red-500/30 rounded-[14px] text-red-400 text-sm text-center">
                {smsState.error.message || "An error occurred. Please try again."}
              </div>
            )}

            {!isSmsAwaitingCode ? (
              <>
                {/* Phone Input */}
                <div className="w-full flex items-center h-14 px-5 bg-[#1D1D1D] rounded-[14px] border border-[#2A2A2A] gap-3">
                  <Image src="/mobile.svg" alt="Phone" width={20} height={20} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSmsSend()}
                    placeholder="+1 (555) 000-0000"
                    className="flex-1 bg-transparent text-white text-[15px] placeholder:text-[#939BAA] focus:outline-none"
                  />
                </div>

                {/* Send Code Button */}
                <button
                  type="button"
                  onClick={handleSmsSend}
                  disabled={isSmsSending || !phone.trim()}
                  className="w-full h-14 rounded-[14px] bg-gradient-to-r from-[#B71959] to-[#E04548] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSmsSending ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <span className="text-white text-[15px] font-medium">Send Code</span>
                  )}
                </button>
              </>
            ) : (
              <>
                {/* OTP Input */}
                <p className="text-[#939BAA] text-[15px] text-center -mt-2">
                  We sent a code to <span className="text-white font-medium">{phone}</span>
                </p>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  onKeyDown={(e) => e.key === "Enter" && handleSmsVerify()}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  autoFocus
                  className="w-full h-14 px-5 bg-[#1D1D1D] rounded-[14px] border border-[#2A2A2A] text-white text-center text-xl tracking-[0.3em] font-medium placeholder:text-[#939BAA] placeholder:tracking-normal placeholder:text-[15px] focus:border-[#E04548] focus:outline-none transition-colors"
                />

                {/* Verify Button */}
                <button
                  type="button"
                  onClick={handleSmsVerify}
                  disabled={isSmsSubmitting || code.length < 6}
                  className="w-full h-14 rounded-[14px] bg-gradient-to-r from-[#B71959] to-[#E04548] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSmsSubmitting ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <span className="text-white text-[15px] font-medium">Verify & Login</span>
                  )}
                </button>
              </>
            )}

            {/* Back Button */}
            <button
              type="button"
              onClick={handleBackToInitial}
              className="text-[#939BAA] text-sm hover:text-white transition-colors"
            >
              ← Back to login options
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Initial login view
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2.5px]"
        onClick={closeAuthModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[448px] bg-[#1D1D1D] rounded-3xl border border-[#2A2A2A] shadow-[0px_4px_12px_rgba(0,0,0,0.10),0px_20px_60px_rgba(0,0,0,0.15)] animate-fade-slide-in">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-6 right-6 w-7 h-7 rounded-[10px] flex items-center justify-center text-[#939BAA] hover:text-white hover:bg-[#2A2A2A] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center px-8 pt-10 pb-8 gap-8">
          {/* Logo */}
          <Image
            src="/Anamon Logo-login.png"
            alt="Anamon"
            width={178}
            height={49}
            className="h-12 w-auto"
          />

          {/* Heading */}
          <h2 className="text-white text-2xl font-semibold leading-9">
            Log in or sign up
          </h2>

          {/* Auth Buttons */}
          <div className="w-full flex flex-col gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-14 px-5 bg-[#1D1D1D] rounded-[14px] border border-[#2A2A2A] flex items-center gap-3 hover:border-[#3A3A3A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Image src="/google-Icon.svg" alt="Google" width={18} height={18} />
              <span className="text-white text-[15px] font-medium">Google</span>
              {isOAuthLoading && <Loader2 className="w-4 h-4 text-white animate-spin ml-auto" />}
            </button>

            {/* Email Input Row */}
            <div className="w-full h-14 px-5 bg-[#1D1D1D] rounded-[14px] border border-[#2A2A2A] flex items-center gap-3">
              <Image src="/mail.svg" alt="Email" width={20} height={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                placeholder="your@email.com"
                disabled={isLoading}
                className="flex-1 bg-transparent text-white text-[15px] placeholder:text-[#939BAA] focus:outline-none disabled:opacity-60"
              />
              <button
                type="button"
                onClick={handleEmailSubmit}
                disabled={isEmailSending || !email.trim()}
                className="text-[#939BAA] text-sm font-medium hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isEmailSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>

            {/* Continue with SMS */}
            <button
              type="button"
              onClick={handleSmsClick}
              disabled={isLoading}
              className="w-full h-14 px-5 bg-[#1D1D1D] rounded-[14px] border border-[#2A2A2A] flex items-center gap-3 hover:border-[#3A3A3A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Image src="/mobile.svg" alt="SMS" width={20} height={20} />
              <span className="text-[#939BAA] text-[15px] font-medium">Continue with SMS</span>
            </button>

            {/* Apple Button */}
            <button
              type="button"
              onClick={handleAppleLogin}
              disabled={isLoading}
              className="w-full h-14 px-5 bg-[#1D1D1D] rounded-[14px] border border-[#2A2A2A] flex items-center gap-3 hover:border-[#3A3A3A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Image src="/Applce-Icon.svg" alt="Apple" width={24} height={24} />
              <span className="text-white text-[15px] font-medium">Apple</span>
            </button>
          </div>

          {/* Footer */}
          <div className="w-full flex flex-col items-center gap-4">
            {/* Passkey Link */}
            <button
              type="button"
              className="text-white text-sm font-medium hover:text-[#E04548] transition-colors"
            >
              I have a passkey
            </button>

            {/* Terms & Privacy */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-[#939BAA]">By logging in I agree to the</span>
              <a href="/terms" className="text-white font-medium hover:text-[#E04548] transition-colors">
                Terms
              </a>
              <span className="text-[#939BAA]">&</span>
              <a href="/privacy" className="text-white font-medium hover:text-[#E04548] transition-colors">
                Privacy Policy
              </a>
            </div>

            {/* Protected by Privy */}
            <div className="flex items-center gap-2 text-xs text-[#939BAA]">
              <span>Protected by</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#939BAA]" />
                <span className="font-medium">privy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
