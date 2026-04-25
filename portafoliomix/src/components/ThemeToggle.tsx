"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group flex items-center gap-2 rounded-full border border-white/25 bg-white/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-800 shadow-[0_10px_30px_-20px_rgba(20,40,90,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-slate-400/25 dark:bg-slate-900/75 dark:text-slate-100 dark:hover:bg-slate-900"
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
    >
      {isDark ? (
        <Sun size={16} className="text-amber-300" />
      ) : (
        <Moon size={16} className="text-sky-700" />
      )}
      <span>{isDark ? "Claro" : "Oscuro"}</span>
    </button>
  );
};

export default ThemeToggle;
