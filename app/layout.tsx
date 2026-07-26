import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bala Bhargav — Creative Developer & Technologist",
  description:
    "Portfolio of Bala Bhargav — Full-Stack Developer, Creative Technologist, and Digital Craftsman. Building immersive digital experiences with modern web technologies.",
  keywords: [
    "Bala Bhargav",
    "portfolio",
    "creative developer",
    "full-stack developer",
    "web developer",
    "frontend engineer",
  ],
  openGraph: {
    title: "Bala Bhargav — Creative Developer",
    description: "Building immersive digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
