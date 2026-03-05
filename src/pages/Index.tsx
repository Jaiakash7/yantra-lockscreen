import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVG Gear component
const Gear = ({ size = 80, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
    <path
      d="M50 15 L55 5 L60 15 L70 10 L68 22 L78 20 L73 30 L85 32 L78 40 L90 45 L80 50 L90 55 L78 60 L85 68 L73 70 L78 80 L68 78 L70 90 L60 85 L55 95 L50 85 L45 95 L40 85 L30 90 L32 78 L22 80 L27 70 L15 68 L22 60 L10 55 L20 50 L10 45 L22 40 L15 32 L27 30 L22 20 L32 22 L30 10 L40 15 L45 5 L50 15Z"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      fill="hsl(var(--primary) / 0.08)"
    />
    <circle cx="50" cy="50" r="18" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="hsl(var(--navy-deep))" />
    <circle cx="50" cy="50" r="8" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" fill="none" />
  </svg>
);

// Countdown target - set to a future date for YANTRA 2K26
const TARGET_DATE = new Date("2026-04-15T09:00:00");

const useCountdown = (targetDate: Date) => {
  const calculate = useCallback(() => {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [time, setTime] = useState(calculate);
  useEffect(() => {
    const id = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(id);
  }, [calculate]);
  return time;
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    <div className="relative w-20 h-24 sm:w-28 sm:h-32 md:w-32 md:h-36 rounded-lg border border-primary/30 bg-secondary/80 backdrop-blur-sm flex items-center justify-center overflow-hidden">
      {/* Metallic shine */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      {/* Center line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-primary/10" />
      <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary tabular-nums relative z-10 drop-shadow-[0_0_15px_hsl(var(--gold-glow)/0.4)]">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="mt-2 font-display text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground">
      {label}
    </span>
  </motion.div>
);

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const countdown = useCountdown(TARGET_DATE);

  const handleUnlock = () => {
    if (unlocked || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setUnlocked(true);
      setTransitioning(false);
    }, 900);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background select-none">
      {/* Background Video — always present */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/lg.mp4"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/70" />

      {/* ====== LOCK SCREEN ====== */}
      <AnimatePresence>
        {!unlocked && (
          <>
            {/* Split door transition */}
            {transitioning && (
              <>
                <div className="absolute inset-y-0 left-0 w-1/2 bg-background/90 z-50 animate-door-left border-r border-primary/20" />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-background/90 z-50 animate-door-right border-l border-primary/20" />
              </>
            )}

            <motion.div
              key="lockscreen"
              className="absolute inset-0 z-40 flex flex-col items-center justify-center cursor-pointer"
              onClick={handleUnlock}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Corner gears */}
              <div className="absolute top-4 left-4 opacity-20">
                <Gear size={100} className="animate-gear" />
              </div>
              <div className="absolute top-4 right-4 opacity-15">
                <Gear size={70} className="animate-gear-reverse" />
              </div>
              <div className="absolute bottom-4 left-4 opacity-15">
                <Gear size={70} className="animate-gear-reverse" />
              </div>
              <div className="absolute bottom-4 right-4 opacity-20">
                <Gear size={100} className="animate-gear" />
              </div>

              {/* Logo */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-full blur-3xl bg-primary/20 scale-150" />
                <img
                  src="/yantra-logo.jpeg"
                  alt="YANTRA 2K26 Logo"
                  className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-cover border-2 border-primary/40 shadow-[0_0_40px_hsl(var(--gold-glow)/0.3)] relative z-10"
                />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-8 font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-[0.15em] text-primary drop-shadow-[0_0_30px_hsl(var(--gold-glow)/0.5)]"
              >
                YANTRA 2K26
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-3 font-body text-lg sm:text-xl tracking-[0.4em] uppercase text-muted-foreground"
              >
                A Mechanical Symposium
              </motion.p>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-6 w-48 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
              />

              {/* Click prompt */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-12 font-display text-sm tracking-[0.5em] uppercase text-primary/60 animate-pulse-glow animate-float"
              >
                Click anywhere to enter
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ====== COUNTDOWN PAGE ====== */}
      {unlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4"
        >
          {/* Background gears */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]">
            <Gear size={300} className="animate-gear" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-[0.04]">
            <Gear size={400} className="animate-gear-reverse" />
          </div>

          {/* Logo small */}
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            src="/yantra-logo.jpeg"
            alt="YANTRA 2K26"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-primary/30 shadow-[0_0_20px_hsl(var(--gold-glow)/0.2)] mb-4"
          />

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.15em] text-primary mb-2"
          >
            YANTRA 2K26
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-body text-sm tracking-[0.4em] uppercase text-muted-foreground mb-12"
          >
            Launching Soon
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-3 sm:gap-5 md:gap-8"
          >
            <TimeUnit value={countdown.days} label="Days" />
            <TimeUnit value={countdown.hours} label="Hours" />
            <TimeUnit value={countdown.minutes} label="Minutes" />
            <TimeUnit value={countdown.seconds} label="Seconds" />
          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 w-64 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-4 font-body text-xs tracking-[0.3em] uppercase text-muted-foreground/60"
          >
            A Mechanical Symposium
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
