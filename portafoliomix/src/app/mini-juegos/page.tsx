import Link from "next/link";
import { ArrowUpRight, Gamepad2, Timer } from "lucide-react";

const games = [
  {
    title: "Tetris",
    href: "/mini-juegos/tetris",
    description: "Piezas, line clear, nivel y velocidad progresiva.",
    tag: "Puzzle",
    tempo: "Ritmo alto",
  },
  {
    title: "Snake",
    href: "/mini-juegos/snake",
    description: "Arcade clasico de reflejos, score y control tactil.",
    tag: "Arcade",
    tempo: "Reflejos",
  },
];

export default function MiniGamesPage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-7xl px-3 pb-10 pt-2 sm:px-4">
      <section className="relative mb-6 overflow-hidden rounded-[2rem] border border-white/45 bg-linear-to-br from-slate-50/85 via-white/75 to-blue-100/70 p-5 shadow-[0_28px_80px_-50px_rgba(18,34,80,0.65)] dark:border-slate-500/35 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-800/70 sm:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_8%,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_92%_12%,rgba(2,132,199,0.16),transparent_36%)]" />

        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:border-blue-400/30 dark:bg-slate-900/70 dark:text-blue-300">
            <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
            Seccion Arcade
          </p>
          <h1 className="mt-3 text-5xl uppercase tracking-[0.08em] text-zinc-950 dark:text-zinc-100 sm:text-6xl">
            Mini Juegos
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-700 dark:text-zinc-300 sm:text-base">
            Juegos clasicos livianos integrados al portafolio como demostracion de UI interactiva, manejo de estado en tiempo real y feedback visual fluido.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {games.map((game) => (
          <article
            key={game.title}
            className="group relative overflow-hidden rounded-[1.35rem] border border-zinc-200/80 bg-white/85 p-5 shadow-[0_16px_40px_-35px_rgba(9,9,11,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white dark:border-zinc-700/85 dark:bg-zinc-900/75 dark:hover:border-blue-400/40 dark:hover:bg-zinc-900"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-r from-blue-600/10 via-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative mb-4 flex items-center justify-between">
              <span className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200">
                {game.tag}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-300">
                <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                {game.tempo}
              </span>
            </div>

            <h2 className="text-4xl uppercase tracking-widest text-zinc-950 dark:text-zinc-100">
              {game.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{game.description}</p>
            <Link
              href={game.href}
              className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-blue-600 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
            >
              Jugar ahora
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
