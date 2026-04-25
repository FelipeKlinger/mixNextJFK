"use client"
import { ThemeProvider } from "next-themes"
import "./globals.css";
import Navbar from "@/components/Navbar"
import HaloGlow from "@/components/HaloGlow";
import { Bebas_Neue, Manrope } from "next/font/google";
import { cn } from "@/lib/utils";

const headingFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={cn("font-sans", headingFont.variable, bodyFont.variable)}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          <HaloGlow />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}