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
    <nav className="sticky top-0 z-50 w-full px-2 py-2 sm:px-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/35 bg-white/70 px-3 py-2 shadow-[0_15px_50px_-35px_rgba(25,50,95,0.6)] backdrop-blur-lg dark:border-slate-500/25 dark:bg-slate-900/65 sm:px-4">

        <a
          href="#"
          className="rounded-full bg-slate-900 px-4 py-2 text-xl uppercase tracking-[0.2em] text-amber-100 transition-transform duration-300 hover:-translate-y-0.5 dark:bg-amber-200 dark:text-slate-900"
        >
          MIX
        </a>

        <div className="hidden items-center gap-3 md:flex md:gap-5">
          <ul className="flex gap-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-800 dark:text-slate-100">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex rounded-full border border-transparent px-3 py-2 transition-all duration-200 hover:border-sky-700/20 hover:bg-sky-600/10 dark:hover:border-amber-300/40 dark:hover:bg-amber-200/20"
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
            className="rounded-full border border-slate-300/70 bg-white/70 p-2 text-slate-800 transition-all duration-200 hover:bg-white dark:border-slate-500/50 dark:bg-slate-900/70 dark:text-slate-100"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mx-auto mt-2 w-full max-w-7xl rounded-2xl border border-white/35 bg-white/90 p-3 shadow-[0_20px_60px_-38px_rgba(25,50,95,0.6)] backdrop-blur-md dark:border-slate-500/25 dark:bg-slate-900/90 md:hidden">
          <ul className="flex flex-col gap-2 text-sm font-bold uppercase tracking-[0.12em] text-slate-800 dark:text-slate-100">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-full border border-transparent px-4 py-3 transition-all duration-200 hover:border-sky-700/20 hover:bg-sky-600/10 dark:hover:border-amber-300/40 dark:hover:bg-amber-200/20"
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