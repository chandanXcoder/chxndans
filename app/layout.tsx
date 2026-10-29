import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Suspense } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Chandan — Full-Stack Web & Mobile Developer",
    template: "%s — Chandan",
  },
  description:
    "Full-stack web and mobile app developer and freelancer. I build production-ready products with React, Next.js, Node.js and Flutter.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} antialiased`}
    >
      <body>
        <div id="top" />
        {/* usePathname can suspend on unknown dynamic routes (e.g. a 404 slug) */}
        <Suspense>
          <SmoothScroll />
          <Navbar />
        </Suspense>
        <div className="grain" aria-hidden />
        <div className="shell">
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
