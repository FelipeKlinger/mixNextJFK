"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCw, StepBack, StepForward } from "lucide-react";

type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type Board = CellValue[][];
type PieceType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

type Piece = {
  type: PieceType;
  rotation: number;
  x: number;
  y: number;
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const START_X = 3;
const START_Y = 0;

const PIECE_ORDER: PieceType[] = ["I", "O", "T", "S", "Z", "J", "L"];

const PIECE_ID: Record<PieceType, CellValue> = {
  I: 1,
  O: 2,
  T: 3,
  S: 4,
  Z: 5,
  J: 6,
  L: 7,
};

const PIECES: Record<PieceType, Array<Array<[number, number]>>> = {
  I: [
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
  ],
  O: [
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
  ],
  T: [
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
  ],
  S: [
    [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [2, 1],
      [2, 2],
    ],
    [
      [1, 1],
      [2, 1],
      [0, 2],
      [1, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
  ],
  Z: [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [2, 0],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 2],
      [2, 2],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ],
  ],
  J: [
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 2],
      [1, 2],
    ],
  ],
  L: [
    [
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
  ],
};

function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => 0 as CellValue)
  );
}

function randomPieceType(): PieceType {
  return PIECE_ORDER[Math.floor(Math.random() * PIECE_ORDER.length)];
}

function createPiece(type: PieceType): Piece {
  return {
    type,
    rotation: 0,
    x: START_X,
    y: START_Y,
  };
}

function pieceCells(piece: Piece) {
  return PIECES[piece.type][piece.rotation].map(([x, y]) => ({
    x: x + piece.x,
    y: y + piece.y,
  }));
}

function isValidPosition(board: Board, piece: Piece) {
  return pieceCells(piece).every((cell) => {
    if (cell.x < 0 || cell.x >= BOARD_WIDTH || cell.y >= BOARD_HEIGHT) {
      return false;
    }
    if (cell.y < 0) {
      return true;
    }
    return board[cell.y][cell.x] === 0;
  });
}

function mergePiece(board: Board, piece: Piece): Board {
  const next = board.map((row) => [...row]) as Board;
  for (const cell of pieceCells(piece)) {
    if (cell.y >= 0 && cell.y < BOARD_HEIGHT && cell.x >= 0 && cell.x < BOARD_WIDTH) {
      next[cell.y][cell.x] = PIECE_ID[piece.type];
    }
  }
  return next;
}

function clearBoardLines(board: Board) {
  const remaining = board.filter((row) => row.some((cell) => cell === 0));
  const cleared = BOARD_HEIGHT - remaining.length;

  while (remaining.length < BOARD_HEIGHT) {
    remaining.unshift(Array.from({ length: BOARD_WIDTH }, () => 0 as CellValue));
  }

  return {
    board: remaining as Board,
    cleared,
  };
}

function scoreForLines(cleared: number, level: number) {
  const table = [0, 100, 300, 500, 800];
  return (table[cleared] ?? 0) * level;
}

function speedForLevel(level: number) {
  return Math.max(90, 700 - (level - 1) * 55);
}

function cellClass(value: CellValue) {
  if (value === 0) {
    return "bg-white/65 dark:bg-zinc-900/70";
  }

  const map: Record<Exclude<CellValue, 0>, string> = {
    1: "bg-blue-600",
    2: "bg-zinc-900 dark:bg-zinc-100",
    3: "bg-zinc-700 dark:bg-zinc-300",
    4: "bg-slate-700 dark:bg-slate-300",
    5: "bg-zinc-600 dark:bg-zinc-400",
    6: "bg-slate-500 dark:bg-slate-400",
    7: "bg-zinc-500 dark:bg-zinc-500",
  };

  return map[value as Exclude<CellValue, 0>];
}

export default function TetrisGame() {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [currentPiece, setCurrentPiece] = useState<Piece>(createPiece(randomPieceType()));
  const [nextPieceType, setNextPieceType] = useState<PieceType>(randomPieceType());
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPiece(createPiece(randomPieceType()));
    setNextPieceType(randomPieceType());
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setIsPaused(false);
    setIsRunning(true);
  }, []);

  const movePiece = useCallback((dx: number, dy: number) => {
    setCurrentPiece((prev) => {
      const moved = { ...prev, x: prev.x + dx, y: prev.y + dy };
      return isValidPosition(board, moved) ? moved : prev;
    });
  }, [board]);

  const rotatePiece = useCallback(() => {
    setCurrentPiece((prev) => {
      const rotated = {
        ...prev,
        rotation: (prev.rotation + 1) % 4,
      };

      if (isValidPosition(board, rotated)) return rotated;

      const kickRight = { ...rotated, x: rotated.x + 1 };
      if (isValidPosition(board, kickRight)) return kickRight;

      const kickLeft = { ...rotated, x: rotated.x - 1 };
      if (isValidPosition(board, kickLeft)) return kickLeft;

      return prev;
    });
  }, [board]);

  const lockAndSpawn = useCallback(() => {
    const merged = mergePiece(board, currentPiece);
    const { board: cleaned, cleared } = clearBoardLines(merged);

    const nextLines = lines + cleared;
    const nextLevel = Math.floor(nextLines / 10) + 1;

    setBoard(cleaned);
    setLines(nextLines);
    setLevel(nextLevel);
    setScore((prev) => prev + scoreForLines(cleared, level));

    const spawned = createPiece(nextPieceType);
    const following = randomPieceType();

    if (!isValidPosition(cleaned, spawned)) {
      setGameOver(true);
      setIsRunning(false);
      return;
    }

    setCurrentPiece(spawned);
    setNextPieceType(following);
  }, [board, currentPiece, lines, level, nextPieceType]);

  const tick = useCallback(() => {
    if (!isRunning || isPaused || gameOver) return;

    const moved = { ...currentPiece, y: currentPiece.y + 1 };
    if (isValidPosition(board, moved)) {
      setCurrentPiece(moved);
      return;
    }

    lockAndSpawn();
  }, [board, currentPiece, gameOver, isPaused, isRunning, lockAndSpawn]);

  const hardDrop = useCallback(() => {
    if (!isRunning || isPaused || gameOver) return;

    let dropped = currentPiece;
    while (true) {
      const candidate = { ...dropped, y: dropped.y + 1 };
      if (!isValidPosition(board, candidate)) break;
      dropped = candidate;
    }

    setCurrentPiece(dropped);
    setScore((prev) => prev + Math.max(0, dropped.y - currentPiece.y) * 2);

    const merged = mergePiece(board, dropped);
    const { board: cleaned, cleared } = clearBoardLines(merged);

    const nextLines = lines + cleared;
    const nextLevel = Math.floor(nextLines / 10) + 1;

    setBoard(cleaned);
    setLines(nextLines);
    setLevel(nextLevel);
    setScore((prev) => prev + scoreForLines(cleared, level));

    const spawned = createPiece(nextPieceType);
    const following = randomPieceType();

    if (!isValidPosition(cleaned, spawned)) {
      setGameOver(true);
      setIsRunning(false);
      return;
    }

    setCurrentPiece(spawned);
    setNextPieceType(following);
  }, [board, currentPiece, gameOver, isPaused, isRunning, level, lines, nextPieceType]);

  const ghostPiece = useMemo(() => {
    let ghost = { ...currentPiece };
    while (true) {
      const candidate = { ...ghost, y: ghost.y + 1 };
      if (!isValidPosition(board, candidate)) break;
      ghost = candidate;
    }
    return ghost;
  }, [board, currentPiece]);

  const displayBoard = useMemo(() => {
    const working = board.map((row) => [...row]) as Board;

    for (const cell of pieceCells(ghostPiece)) {
      if (cell.y >= 0 && working[cell.y][cell.x] === 0) {
        working[cell.y][cell.x] = 6;
      }
    }

    for (const cell of pieceCells(currentPiece)) {
      if (cell.y >= 0) {
        working[cell.y][cell.x] = PIECE_ID[currentPiece.type];
      }
    }

    return working;
  }, [board, currentPiece, ghostPiece]);

  useEffect(() => {
    const speed = speedForLevel(level);
    const id = setInterval(tick, speed);
    return () => clearInterval(id);
  }, [level, tick]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isRunning || gameOver) return;

      const key = event.code;
      const controls = [
        "ArrowLeft",
        "ArrowRight",
        "ArrowDown",
        "ArrowUp",
        "Space",
        "KeyP",
      ];
      if (controls.includes(key)) event.preventDefault();

      if (isPaused && key !== "KeyP") return;

      if (key === "ArrowLeft") movePiece(-1, 0);
      if (key === "ArrowRight") movePiece(1, 0);
      if (key === "ArrowDown") movePiece(0, 1);
      if (key === "ArrowUp") rotatePiece();
      if (key === "Space") hardDrop();
      if (key === "KeyP") setIsPaused((prev) => !prev);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameOver, hardDrop, isPaused, isRunning, movePiece, rotatePiece]);

  const nextPreview = useMemo(() => {
    const piece = createPiece(nextPieceType);
    return pieceCells(piece).map((cell) => ({ x: cell.x - START_X, y: cell.y }));
  }, [nextPieceType]);

  return (
    <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-zinc-200/80 bg-white/80 p-4 shadow-[0_20px_50px_-35px_rgba(9,9,11,0.35)] transition-colors duration-300 dark:border-zinc-700/65 dark:bg-zinc-950/70 sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-r from-blue-600/10 via-cyan-500/5 to-transparent" />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/90 pb-4 dark:border-zinc-700/70">
        <div>
          <h2 className="text-4xl uppercase tracking-widest text-zinc-950 dark:text-zinc-100 sm:text-5xl">
            Tetris Lab
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Flechas para mover, espacio para caida rapida y P para pausar.
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
            onClick={resetGame}
            className="min-h-11 cursor-pointer rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="rounded-2xl border border-zinc-300 bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-900 sm:p-4">
          <div className="mx-auto grid w-fit grid-cols-10 gap-1 rounded-xl bg-zinc-200 p-2 dark:bg-zinc-800">
            {displayBoard.flatMap((row, y) =>
              row.map((value, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`h-6 w-6 rounded-sm border border-zinc-300/75 transition-colors duration-150 dark:border-zinc-700/75 sm:h-7 sm:w-7 ${cellClass(value)}`}
                />
              ))
            )}
          </div>

          {(gameOver || isPaused) && (
            <div className="mt-4 rounded-xl border border-zinc-300 bg-white/90 px-4 py-3 text-center text-sm font-semibold text-zinc-800 dark:border-zinc-600 dark:bg-zinc-900/85 dark:text-zinc-200">
              {gameOver ? "Game over. Reinicia para jugar otra vez." : "Juego en pausa."}
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
              <p className="flex items-center justify-between"><span>Lineas</span><strong>{lines}</strong></p>
              <p className="flex items-center justify-between"><span>Nivel</span><strong>{level}</strong></p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-300 bg-white/80 p-4 dark:border-zinc-700 dark:bg-zinc-900/70">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-300">
              Siguiente
            </h3>
            <div className="grid w-fit grid-cols-4 gap-1 rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
              {Array.from({ length: 4 * 4 }).map((_, idx) => {
                const x = idx % 4;
                const y = Math.floor(idx / 4);
                const filled = nextPreview.some((cell) => cell.x === x && cell.y === y);
                return (
                  <div
                    key={`next-${idx}`}
                    className={`h-5 w-5 rounded-sm border border-zinc-300/75 dark:border-zinc-600/75 ${filled ? "bg-blue-600" : "bg-white/70 dark:bg-zinc-900/70"}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-300 bg-white/80 p-4 dark:border-zinc-700 dark:bg-zinc-900/70">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-300">
              Controles tactiles
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => movePiece(-1, 0)}
                className="min-h-11 cursor-pointer rounded-xl border border-zinc-300 bg-zinc-100 text-zinc-900 transition-all duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:ring-offset-zinc-900"
                aria-label="Mover izquierda"
              >
                <StepBack className="mx-auto" size={16} />
              </button>
              <button
                type="button"
                onClick={rotatePiece}
                className="min-h-11 cursor-pointer rounded-xl border border-zinc-300 bg-zinc-100 text-zinc-900 transition-all duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:ring-offset-zinc-900"
                aria-label="Rotar pieza"
              >
                <RotateCw className="mx-auto" size={16} />
              </button>
              <button
                type="button"
                onClick={() => movePiece(1, 0)}
                className="min-h-11 cursor-pointer rounded-xl border border-zinc-300 bg-zinc-100 text-zinc-900 transition-all duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:ring-offset-zinc-900"
                aria-label="Mover derecha"
              >
                <StepForward className="mx-auto" size={16} />
              </button>
              <button
                type="button"
                onClick={() => movePiece(0, 1)}
                className="col-span-2 min-h-11 cursor-pointer rounded-xl border border-zinc-300 bg-zinc-100 text-sm font-semibold text-zinc-900 transition-all duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:ring-offset-zinc-900"
              >
                Bajar
              </button>
              <button
                type="button"
                onClick={hardDrop}
                className="min-h-11 cursor-pointer rounded-xl bg-blue-600 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
              >
                Drop
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
