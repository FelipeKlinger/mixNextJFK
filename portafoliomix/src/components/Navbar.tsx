"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Portafolio", href: "#portafolio" },
    { label: "Sobre mí", href: "#sobre-mi" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">

        <a
          href="#"
          className="rounded-full border border-transparent px-4 py-2 text-lg font-bold transition-all duration-200 hover:border-black/10 hover:bg-black/5 dark:text-white dark:hover:border-white/10 dark:hover:bg-white/5"
        >
          MIX
        </a>

        <div className="hidden items-center gap-4 md:flex md:gap-6">
          <ul className="flex gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex rounded-full border border-transparent px-4 py-2 font-semibold transition-all duration-200 hover:border-black/10 hover:bg-black/5 dark:hover:border-white/10 dark:hover:bg-white/5"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="rounded-full border border-transparent p-2 transition-all duration-200 hover:border-black/10 hover:bg-black/5 dark:hover:border-white/10 dark:hover:bg-white/5"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-black/10 bg-white/95 px-4 py-3 dark:border-white/10 dark:bg-gray-900/95 md:hidden">
          <ul className="flex flex-col gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-full border border-transparent px-4 py-2 font-semibold transition-all duration-200 hover:border-black/10 hover:bg-black/5 dark:hover:border-white/10 dark:hover:bg-white/5"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;