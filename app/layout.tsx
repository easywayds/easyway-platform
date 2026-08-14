import type { Metadata } from "next";
import { Oswald, IBM_Plex_Sans, IBM_Plex_Mono, Fraunces, Inter, Poppins } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
});

// Used only by the course-content stepper (app/dashboard/topic/[number]) to
// match the approved module{N}-student-preview.html design reference.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

// Used only by the new interactive lesson blocks (components/course/) —
// part of the Easy Way Interactive Lesson Standard v1.0 navy/yellow system,
// piloted in Topic 3 before the rest of the course adopts it.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Easy Way Driving School — 6-Hour Adult Course",
  description: "TDLR-approved 6-Hour Adult Driver Education course",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${plexSans.variable} ${plexMono.variable} ${fraunces.variable} ${inter.variable} ${poppins.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
