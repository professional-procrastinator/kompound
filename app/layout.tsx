import type { Metadata } from "next";
import { Inter_Tight, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { GameStateProvider } from "@/context/gameState";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kompound — a tiny daily German word game",
  description:
    "Guess a German compound word in six tries, then unpack its wonderfully literal meaning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${interTight.variable} ${geistMono.variable} ${dmSerifDisplay.variable}`}
    >
      <body>
        <GameStateProvider>{children}</GameStateProvider>
      </body>
    </html>
  );
}
