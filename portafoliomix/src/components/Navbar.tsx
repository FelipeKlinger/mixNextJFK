"use client"
import ThemeToggle from "@/components/ThemeToggle"

const Navbar = () => {
  return (
    <nav className="w-full bg-white dark:bg-gray-900  border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          className="flex font-bold text-lg px-4 py-2 rounded-full border border-transparent transition-all duration-200
                     hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/10"
        >
          MIX
        </a>

        {/* Links + Dark toggle */}
        <div className="flex items-center gap-4 md:gap-6">

          <ul className="hidden md:flex gap-4 md:gap-6 text-sm font-medium text-gray-900 dark:text-gray-100">
            <li className="flex cursor-pointer font-semibold px-4 py-2 rounded-full border border-transparent transition-all duration-200
                           hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/10">
              Portafolio
            </li>
            <li className="flex cursor-pointer font-semibold px-4 py-2 rounded-full border border-transparent transition-all duration-200
                           hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/10">
              Sobre mí
            </li>
            <li className="flex cursor-pointer font-semibold px-4 py-2 rounded-full border border-transparent transition-all duration-200
                           hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/10">
              Proyectos
            </li>
            <li className="flex cursor-pointer font-semibold px-4 py-2 rounded-full border border-transparent transition-all duration-200
                           hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/10">
              Contacto
            </li>
          </ul>

          {/* Dark mode toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar