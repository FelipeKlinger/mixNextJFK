"use client";

import { useEffect } from "react";
import "@/components/css/halo-glow.css";

const HaloGlow = () => {

  useEffect(() => {
    const glow = document.getElementById("halo-glow");
    if (glow) {
      document.addEventListener("mousemove", (e) => {
        glow.style.left = e.pageX + "px";
        glow.style.top = e.pageY + "px";
      });
    }
  }, []);

  return <div id="halo-glow"></div>;
};

export default HaloGlow;
