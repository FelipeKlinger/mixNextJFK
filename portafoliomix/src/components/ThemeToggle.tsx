"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 cursor-pointer text-sm  rounded-full border border-transparent transition-all duration-200
                           hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/10"
    >
      {theme === "dark" ? (
        <Sun size={18} />
      ) : (
        <Moon className="text-gray-900 dark:text-white" size={18} />
      )}
    </button>
  );
};

export default ThemeToggle;
