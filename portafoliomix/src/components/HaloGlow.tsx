"use client";

import { useEffect } from "react";
import "@/components/css/halo-glow.css";

const HaloGlow = () => {
  useEffect(() => {
    const glow = document.getElementById("halo-glow");
    if (!glow || window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const onMouseMove = (e: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.style.setProperty("--glow-x", `${e.clientX}px`);
        glow.style.setProperty("--glow-y", `${e.clientY}px`);
      });
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div id="halo-glow"></div>;
};

export default HaloGlow;
