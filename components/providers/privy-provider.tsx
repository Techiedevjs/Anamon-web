"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function PrivyAuthProvider({ children }: { children: React.ReactNode }) {
  // Direct injection is more reliable in Next.js client components
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#E04548",
          logo: "/Logo.png",
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        loginMethods: ["email", "google", "apple"],
      }}
    >
      {children}
    </PrivyProvider>
  );
}