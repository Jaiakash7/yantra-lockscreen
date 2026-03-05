import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Gear from "@/components/steampunk/Gear";
import PressureGauge from "@/components/steampunk/PressureGauge";
import VacuumTube from "@/components/steampunk/VacuumTube";
import SlidingBolt from "@/components/steampunk/SlidingBolt";

// Countdown target
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
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-primary/10" />
      {/* Corner rivets */}
      <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-primary/20 border border-primary/30" />
      <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary/20 border border-primary/30" />
      <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-primary/20 border border-primary/30" />
      <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary/20 border border-primary/30" />
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
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" src="/lg.mp4" />
      <div className="absolute inset-0 bg-background/75" />

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
              className="absolute inset-0 z-40 flex flex-col items-center justify-center"
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

              {/* Interlocking gears - mid positions */}
              <div className="absolute top-20 left-20 opacity-10 hidden md:block">
                <Gear size={50} className="animate-gear" />
              </div>
              <div className="absolute bottom-20 right-20 opacity-10 hidden md:block">
                <Gear size={50} className="animate-gear" />
              </div>

              {/* Vacuum tubes - flanking sides */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-60 hidden lg:flex">
                <VacuumTube size={70} />
                <VacuumTube size={55} />
                <VacuumTube size={70} />
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-60 hidden lg:flex">
                <VacuumTube size={55} />
                <VacuumTube size={70} />
                <VacuumTube size={55} />
              </div>

              {/* Pressure gauges - top corners */}
              <div className="absolute top-6 left-1/2 -translate-x-[180px] opacity-50 hidden md:block">
                <PressureGauge size={70} label="BAR" />
              </div>
              <div className="absolute top-6 left-1/2 translate-x-[110px] opacity-50 hidden md:block">
                <PressureGauge size={70} label="PSI" />
              </div>

              {/* ACCESS RESTRICTED header */}
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-display text-xs sm:text-sm tracking-[0.6em] uppercase text-destructive/70 mb-6 relative"
              >
                <span className="relative z-10">⚙ Access Restricted ⚙</span>
                <span className="absolute inset-0 blur-sm bg-destructive/10 rounded" />
              </motion.p>

              {/* Logo */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-full blur-3xl bg-primary/20 scale-150" />
                {/* Outer ring decoration */}
                <div className="absolute -inset-3 rounded-full border border-primary/20 animate-gear" style={{ animationDuration: "30s" }} />
                <div className="absolute -inset-5 rounded-full border border-primary/10 border-dashed animate-gear-reverse" style={{ animationDuration: "40s" }} />
                <img
                  src="/yantra-logo.jpeg"
                  alt="YANTRA 2K26 Logo"
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-2 border-primary/40 shadow-[0_0_40px_hsl(var(--gold-glow)/0.3)] relative z-10"
                />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 font-display text-3xl sm:text-5xl md:text-7xl font-black tracking-[0.15em] text-primary drop-shadow-[0_0_30px_hsl(var(--gold-glow)/0.5)]"
              >
                YANTRA 2K26
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-2 font-body text-base sm:text-lg tracking-[0.4em] uppercase text-muted-foreground"
              >
                A Mechanical Symposium
              </motion.p>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="mt-6 w-48 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
              />

              {/* Sliding Bolt */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="mt-10"
              >
                <SlidingBolt onUnlock={handleUnlock} />
              </motion.div>

              {/* Bottom pipe decoration */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
              >
                <div className="w-20 h-2 rounded-full bg-primary/30 border border-primary/20" />
                <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary/30" />
                <div className="w-32 h-2 rounded-full bg-primary/30 border border-primary/20" />
                <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary/30" />
                <div className="w-20 h-2 rounded-full bg-primary/30 border border-primary/20" />
              </motion.div>
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
