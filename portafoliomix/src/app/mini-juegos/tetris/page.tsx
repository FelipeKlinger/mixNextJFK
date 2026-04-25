import Link from "next/link";
import TetrisGame from "@/components/TetrisGame";
import { ArrowLeft, Blocks, Gamepad2 } from "lucide-react";

export default function TetrisPage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-7xl px-3 pb-10 pt-2 sm:px-4">
      <section className="relative mb-6 overflow-hidden rounded-[2rem] border border-white/45 bg-linear-to-br from-slate-50/85 via-white/75 to-blue-100/70 p-5 shadow-[0_28px_80px_-50px_rgba(18,34,80,0.65)] dark:border-slate-500/35 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-800/70 sm:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_8%,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_92%_16%,rgba(2,132,199,0.16),transparent_38%)]" />

        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:border-blue-400/30 dark:bg-slate-900/70 dark:text-blue-300">
            <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
            Mini Juegos
          </p>
          <h1 className="mt-3 text-5xl uppercase tracking-[0.08em] text-zinc-950 dark:text-zinc-100 sm:text-6xl">
          Tetris
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-700 dark:text-zinc-300 sm:text-base">
            Una seccion arcade dentro del portafolio para mostrar interaccion en tiempo real,
            manejo de estado y gameplay responsivo en teclado y touch.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200">
              <Blocks className="h-3.5 w-3.5" aria-hidden="true" />
              Puzzle + velocidad
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/mini-juegos"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-900 transition-all duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Volver al hub
            </Link>
            <Link
              href="/mini-juegos/snake"
              className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-zinc-300 bg-white px-4 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-900 transition-all duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-900"
            >
              Ir a Snake
            </Link>
          </div>
        </div>
      </section>

      <TetrisGame />
    </main>
  );
}
