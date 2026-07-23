import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: { default: "Real E Bikes - Ride Real. Ride Electric.", template: "%s | Real E Bikes" },
  description: "Real E Bikes offers premium electric scooters with high performance, zero emission and maximum savings. Explore our range of RTO approved and non-RTO electric scooters.",
  keywords: ["electric scooter", "electric bike", "EV", "Real E Bikes", "electric vehicle India"],
  authors: [{ name: "Real E Bikes" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Real E Bikes",
    title: "Real E Bikes - Ride Real. Ride Electric.",
    description: "Premium electric scooters for every ride. Zero emission, high performance, maximum savings.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Real E Bikes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real E Bikes - Ride Real. Ride Electric.",
    description: "Premium electric scooters for every ride.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
