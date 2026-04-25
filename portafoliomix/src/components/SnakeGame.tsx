"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Pause, Play } from "lucide-react";

type Point = {
  x: number;
  y: number;
};

const GRID_SIZE = 18;

const INITIAL_SNAKE: Point[] = [
  { x: 4, y: 9 },
  { x: 3, y: 9 },
  { x: 2, y: 9 },
];

const INITIAL_DIRECTION: Point = { x: 1, y: 0 };

function randomFood(snake: Point[]): Point {
  while (true) {
    const point = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    const occupied = snake.some((segment) => segment.x === point.x && segment.y === point.y);
    if (!occupied) return point;
  }
}

function isOppositeDirection(a: Point, b: Point) {
  return a.x === -b.x && a.y === -b.y;
}

function keyForPoint(point: Point) {
  return `${point.x}-${point.y}`;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>(() => randomFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [queuedDirection, setQueuedDirection] = useState<Point>(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const moveSpeed = useMemo(() => Math.max(80, 190 - score * 3), [score]);

  useEffect(() => {
    const raw = window.localStorage.getItem("snake-best-score");
    const parsed = raw ? Number(raw) : 0;
    if (!Number.isNaN(parsed) && parsed > 0) {
      setBestScore(parsed);
    }
  }, []);

  const restart = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(randomFood(INITIAL_SNAKE));
    setDirection(INITIAL_DIRECTION);
    setQueuedDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setIsRunning(true);
  }, []);

  const requestDirection = useCallback((next: Point) => {
    setQueuedDirection((prevQueued) => {
      if (isOppositeDirection(next, prevQueued)) return prevQueued;
      return next;
    });
  }, []);

  const tick = useCallback(() => {
    if (!isRunning || isPaused || gameOver) return;

    setSnake((prev) => {
      const activeDirection = isOppositeDirection(queuedDirection, direction)
        ? direction
        : queuedDirection;

      setDirection(activeDirection);

      const head = prev[0];
      const nextHead = {
        x: head.x + activeDirection.x,
        y: head.y + activeDirection.y,
      };

      const hitWall =
        nextHead.x < 0 || nextHead.x >= GRID_SIZE || nextHead.y < 0 || nextHead.y >= GRID_SIZE;

      const hitBody = prev.some(
        (segment) => segment.x === nextHead.x && segment.y === nextHead.y
      );

      if (hitWall || hitBody) {
        setGameOver(true);
        setIsRunning(false);

        setBestScore((currentBest) => {
          if (score > currentBest) {
            window.localStorage.setItem("snake-best-score", String(score));
            return score;
          }
          return currentBest;
        });

        return prev;
      }

      const ateFood = nextHead.x === food.x && nextHead.y === food.y;
      const nextSnake = [nextHead, ...prev];

      if (ateFood) {
        setScore((prevScore) => prevScore + 10);
        setFood(randomFood(nextSnake));
        return nextSnake;
      }

      nextSnake.pop();
      return nextSnake;
    });
  }, [direction, food.x, food.y, gameOver, isPaused, isRunning, queuedDirection, score]);

  useEffect(() => {
    const id = setInterval(tick, moveSpeed);
    return () => clearInterval(id);
  }, [moveSpeed, tick]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.code;
      const controls = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "KeyW",
        "KeyA",
        "KeyS",
        "KeyD",
        "Space",
      ];
      if (controls.includes(key)) event.preventDefault();

      if (gameOver && key !== "Space") return;

      if (key === "ArrowUp" || key === "KeyW") requestDirection({ x: 0, y: -1 });
      if (key === "ArrowDown" || key === "KeyS") requestDirection({ x: 0, y: 1 });
      if (key === "ArrowLeft" || key === "KeyA") requestDirection({ x: -1, y: 0 });
      if (key === "ArrowRight" || key === "KeyD") requestDirection({ x: 1, y: 0 });

      if (key === "Space") {
        if (gameOver) {
          restart();
          return;
        }
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameOver, requestDirection, restart]);

  const snakeCells = useMemo(() => {
    const map = new Map<string, number>();
    snake.forEach((segment, idx) => {
      map.set(keyForPoint(segment), idx);
    });
    return map;
  }, [snake]);

  return (
    <section className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-zinc-200/80 bg-white/80 p-4 shadow-[0_20px_50px_-35px_rgba(9,9,11,0.35)] transition-colors duration-300 dark:border-zinc-700/65 dark:bg-zinc-950/70 sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-r from-blue-600/10 via-cyan-500/5 to-transparent" />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/90 pb-4 dark:border-zinc-700/70">
        <div>
          <h2 className="text-4xl uppercase tracking-widest text-zinc-950 dark:text-zinc-100 sm:text-5xl">
            Snake Core
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Flechas o WASD para mover. Espacio para pausar o reiniciar al perder.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="flex min-h-11 min-w-11 cursor-pointer items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition-all duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-900"
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
            {isPaused ? "Reanudar" : "Pausa"}
          </button>

          <button
            type="button"
            onClick={restart}
            className="min-h-11 cursor-pointer rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="rounded-2xl border border-zinc-300 bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-900 sm:p-4">
          <div
            className="mx-auto grid w-fit gap-1 rounded-xl bg-zinc-200 p-2 dark:bg-zinc-800"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
              const x = idx % GRID_SIZE;
              const y = Math.floor(idx / GRID_SIZE);
              const snakeIndex = snakeCells.get(`${x}-${y}`);
              const isFood = food.x === x && food.y === y;
              const isHead = snakeIndex === 0;

              let className = "bg-white/70 dark:bg-zinc-900/70";
              if (typeof snakeIndex === "number") {
                className = isHead
                  ? "bg-zinc-900 dark:bg-zinc-100"
                  : "bg-zinc-500 dark:bg-zinc-400";
              } else if (isFood) {
                className = "bg-blue-600";
              }

              return (
                <div
                  key={`${x}-${y}`}
                  className={`h-4 w-4 rounded-xs border border-zinc-300/75 transition-colors duration-100 dark:border-zinc-700/75 sm:h-5 sm:w-5 ${className}`}
                />
              );
            })}
          </div>

          {(gameOver || isPaused) && (
            <div className="mt-4 rounded-xl border border-zinc-300 bg-white/90 px-4 py-3 text-center text-sm font-semibold text-zinc-800 dark:border-zinc-600 dark:bg-zinc-900/85 dark:text-zinc-200">
              {gameOver ? "Perdiste. Pulsa espacio o reiniciar para otra partida." : "Juego en pausa."}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-zinc-300 bg-white/80 p-4 dark:border-zinc-700 dark:bg-zinc-900/70">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-300">
              Stats
            </h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center justify-between"><span>Score</span><strong>{score}</strong></p>
              <p className="flex items-center justify-between"><span>Best</span><strong>{bestScore}</strong></p>
              <p className="flex items-center justify-between"><span>Velocidad</span><strong>{Math.round(1000 / moveSpeed)} t/s</strong></p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-300 bg-white/80 p-4 dark:border-zinc-700 dark:bg-zinc-900/70">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-300">
              Controles tactiles
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <span />
              <button
                type="button"
                onClick={() => requestDirection({ x: 0, y: -1 })}
                className="min-h-11 cursor-pointer rounded-xl border border-zinc-300 bg-zinc-100 text-zinc-900 transition-all duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:ring-offset-zinc-900"
                aria-label="Arriba"
              >
                <ArrowUp className="mx-auto" size={16} />
              </button>
              <span />
              <button
                type="button"
                onClick={() => requestDirection({ x: -1, y: 0 })}
                className="min-h-11 cursor-pointer rounded-xl border border-zinc-300 bg-zinc-100 text-zinc-900 transition-all duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:ring-offset-zinc-900"
                aria-label="Izquierda"
              >
                <ArrowLeft className="mx-auto" size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="min-h-11 cursor-pointer rounded-xl bg-blue-600 text-white transition-all duration-200 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
                aria-label="Pausa"
              >
                {isPaused ? <Play className="mx-auto" size={16} /> : <Pause className="mx-auto" size={16} />}
              </button>
              <button
                type="button"
                onClick={() => requestDirection({ x: 1, y: 0 })}
                className="min-h-11 cursor-pointer rounded-xl border border-zinc-300 bg-zinc-100 text-zinc-900 transition-all duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:ring-offset-zinc-900"
                aria-label="Derecha"
              >
                <ArrowRight className="mx-auto" size={16} />
              </button>
              <span />
              <button
                type="button"
                onClick={() => requestDirection({ x: 0, y: 1 })}
                className="min-h-11 cursor-pointer rounded-xl border border-zinc-300 bg-zinc-100 text-zinc-900 transition-all duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:ring-offset-zinc-900"
                aria-label="Abajo"
              >
                <ArrowDown className="mx-auto" size={16} />
              </button>
              <span />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
