"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Circle, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

type ElegantShapeProps = {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
};

function ElegantShape({
  className,
  delay = 0,
  width = 420,
  height = 120,
  rotate = 0,
  gradient = "from-sky-400/20",
}: ElegantShapeProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -80,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate,
      }}
      transition={{
        duration: 1.8,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 0.9 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-linear-to-r to-transparent",
            gradient,
            "border border-white/35 backdrop-blur-[2px] dark:border-slate-400/20",
            "shadow-[0_20px_50px_-32px_rgba(40,60,120,0.55)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_45%_48%,rgba(255,255,255,0.45),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

type HeroGeometricProps = {
  badge?: string;
  title1?: string;
  title2?: string;
};

function HeroGeometric({
  badge = "Diseno con sistema",
  title1 = "Interfaces",
  title2 = "que se recuerdan",
}: HeroGeometricProps) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-[calc(100vh-5.5rem)] w-full overflow-hidden rounded-[2rem] border border-white/40 bg-linear-to-br from-amber-50/85 via-white/75 to-sky-100/75 p-6 shadow-[0_30px_90px_-55px_rgba(20,40,90,0.65)] dark:border-slate-500/30 dark:from-slate-900/95 dark:via-slate-900/85 dark:to-slate-800/75 sm:p-8 lg:p-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,173,94,0.22),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(72,168,255,0.2),transparent_34%)]" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.2}
          width={520}
          height={128}
          rotate={11}
          gradient="from-sky-500/30"
          className="left-[-18%] top-[8%] md:left-[-8%]"
        />

        <ElegantShape
          delay={0.35}
          width={460}
          height={108}
          rotate={-13}
          gradient="from-amber-500/30"
          className="right-[-20%] top-[70%] md:right-[-5%]"
        />

        <ElegantShape
          delay={0.4}
          width={280}
          height={76}
          rotate={-18}
          gradient="from-emerald-500/20"
          className="bottom-[8%] left-[8%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={26}
          gradient="from-orange-500/30"
          className="right-[8%] top-[10%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-24}
          gradient="from-cyan-500/25"
          className="left-[28%] top-[14%]"
        />
      </div>

      <div className="relative z-10 mx-auto grid h-full max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="text-left">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/70 px-4 py-2 text-slate-800 shadow-sm dark:border-slate-500/45 dark:bg-slate-900/55 dark:text-slate-100"
          >
            <Circle className="h-2.5 w-2.5 fill-amber-500/90 text-amber-500/90" />
            <span className="text-xs font-bold uppercase tracking-[0.14em]">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="mb-6 text-6xl leading-[0.9] sm:text-7xl lg:text-8xl xl:text-9xl">
              <span className="bg-linear-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-200">
                {title1}
              </span>
              <span className="mx-2 inline-flex translate-y-[-0.12em] rounded-2xl border border-slate-900/10 bg-amber-300/60 p-2 text-slate-900 shadow-[0_12px_30px_-18px_rgba(180,95,10,0.5)] dark:border-amber-200/30 dark:bg-amber-300/20 dark:text-amber-100">
                <Sparkle className="h-7 w-7 sm:h-9 sm:w-9" />
              </span>
              <span className={cn("block bg-linear-to-r from-sky-700 via-slate-800 to-orange-600 bg-clip-text text-transparent dark:from-sky-300 dark:via-slate-100 dark:to-amber-300")}>
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="mb-8 max-w-xl text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
              Construyo experiencias digitales con sistemas visuales consistentes,
              microdetalles expresivos y una ejecucion frontend limpia de punta a punta.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-amber-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-amber-200 dark:text-slate-900 dark:hover:bg-amber-100"
              >
                Ver proyectos
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-slate-500/40 dark:bg-slate-900/75 dark:text-slate-100 dark:hover:bg-slate-900"
              >
                Hablemos
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="rounded-[1.8rem] border border-white/55 bg-white/80 p-5 shadow-[0_28px_70px_-45px_rgba(20,40,90,0.8)] dark:border-slate-500/35 dark:bg-slate-900/75">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-sky-800 dark:bg-sky-500/20 dark:text-sky-200">
                Focus Board
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-300">2026</span>
            </div>

            <div className="space-y-3">
              {["Direccion visual", "Motion significativo", "Arquitectura escalable"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-slate-200/75 bg-white/85 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-500/35 dark:bg-slate-900/65 dark:text-slate-100"
                >
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-white/50 via-transparent to-transparent dark:from-slate-950/30" />
    </div>
  );
}

export { HeroGeometric };
