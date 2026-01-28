import type { Metadata } from "next";
import "./globals.css";
import PrivyAuthProvider from "@/components/providers/privy-provider";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import LoginModal from "@/app/components/LoginModal";

export const metadata: Metadata = {
  // Required for proper URL resolution
  metadataBase: new URL("https://anamon.io"),
  
  // Basic metadata
  title: "Anamon",
  description: "Collect, trade, and explore unique Anamons in the ultimate digital card marketplace.",
  
  openGraph: {
    title: "Anamon",
    description: "Collect, trade, and explore unique Anamons in the ultimate digital card marketplace.",
    url: "https://anamon.io",
    siteName: "Anamon",
    images: [
      {
        url: "/thumbnail-image.png",
        width: 1889,
        height: 878,
        alt: "Anamon - Digital Card Marketplace",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Anamon",
    description: "Collect, trade, and explore unique Anamons in the ultimate digital card marketplace.",
    images: ["/thumbnail-image.png"],
  },
  
  keywords: ["Anamon", "digital cards", "collectibles", "marketplace", "trading"],
  authors: [{ name: "Anamon Team" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=Switzer@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <PrivyAuthProvider>
          <AuthModalProvider>
            {children}
            <LoginModal />
          </AuthModalProvider>
        </PrivyAuthProvider>
      </body>
    </html>
  );
}
