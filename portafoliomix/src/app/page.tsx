"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    
     <div className=" w-full flex py-40 items-center justify-center">
      <Hero />
      </div>      
 
  );
}
