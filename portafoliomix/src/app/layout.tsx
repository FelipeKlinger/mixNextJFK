"use client"
import { ThemeProvider } from "next-themes"
import "./globals.css";
import Navbar from "@/components/Navbar"
import HaloGlow from "@/components/HaloGlow";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable)}>
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