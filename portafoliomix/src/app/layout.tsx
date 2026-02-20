"use client"
import { ThemeProvider } from "next-themes"
import "./globals.css";
import Navbar from "@/components/Navbar"
import HaloGlow from "@/components/HaloGlow";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
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