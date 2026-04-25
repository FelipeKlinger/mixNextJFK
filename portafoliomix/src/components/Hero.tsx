"use client";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

const Hero = () => {
  return (
    <section id="portafolio" className="mx-auto w-full max-w-7xl">
      <HeroGeometric
        badge="Portfolio de Producto & Frontend"
        title1="Diseño con"
        title2="Sabor y Dirección"
      />
    </section>
  );
};

export default Hero;
