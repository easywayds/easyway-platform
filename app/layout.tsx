import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
