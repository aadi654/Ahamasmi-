import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahamasmi Architect - I AM Architect",
  description:
    "Ahamasmi Architect creates thoughtful, people-centric spaces shaped around individual lives, contexts and stories across architecture, interiors and urban design.",
  alternates: {
    canonical: "https://ahamasmi.com/",
  },
  verification: {
    google: "W5piRFH6g6DRQOQRSXQggF5TzDoDcY7mu3KaJ1qUbjs",
  },
  openGraph: {
    title: "Ahamasmi Architect - I AM Architect",
    description:
      "Ahamasmi Architect creates thoughtful, people-centric spaces shaped around individual lives, contexts and stories across architecture, interiors and urban design.",
  },
  twitter: {
    title: "Ahamasmi Architect - I AM Architect",
    description:
      "Ahamasmi Architect creates thoughtful, people-centric spaces shaped around individual lives, contexts and stories across architecture, interiors and urban design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased selection:bg-saffron selection:text-white`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
