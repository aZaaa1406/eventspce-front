import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NavBarHome from "@/components/nav-bar-home";
import { Toaster } from "sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "EventSpace",
  description: "Landing page for EventSpace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable}  antialiased`}
      >
        <NavBarHome />
        {children}
        <Toaster position="top-center" richColors/>
      </body>
    </html>
  );
}
