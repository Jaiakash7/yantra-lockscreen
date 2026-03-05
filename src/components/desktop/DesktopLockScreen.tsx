import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import yantraLogo from "@/assets/yantra-logo.jpeg";
import desktopVideo1 from "@/assets/lg.mp4";

// Updated to use your .mpeg audio file!
import customIgnitionSound from "@/assets/ignition.mpeg"; 

interface Props {
  onBoot: () => void;
}

// Reusable Telemetry Line
const TelemetryLine = ({ label, value, status, delay }: { label: string, value: string, status: "ok" | "warn" | "active", delay: number }) => {
  const statusColors = { ok: "text-emerald-400", warn: "text-amber-500", active: "text-yellow-300" };

  return (
    <motion.div 
      initial={{ opacity: 0, scaleX: 0 }} 
      animate={{ opacity: 1, scaleX: 1 }} 
      transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="flex justify-between items-center py-2 border-b border-white/5 group origin-left"
    >
      <span className="font-display text-[9px] tracking-[0.2em] text-zinc-500 uppercase group-hover:text-amber-200/50 transition-colors">{label}</span>
      <span className={`font-mono text-xs tracking-tighter font-bold ${statusColors[status]}`}>{value}</span>
    </motion.div>
  );
};

// CSS-based Carbon Fiber Pattern
const carbonPattern = "bg-[linear-gradient(45deg,#111_25%,transparent_25%),linear-gradient(-45deg,#111_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#111_75%),linear-gradient(-45deg,transparent_75%,#111_75%)] bg-[length:4px_4px] bg-zinc-900/90";

const DesktopLockScreen = ({ onBoot }: Props) => {
  const [isRevving, setIsRevving] = useState(false); 
  const [isBooting, setIsBooting] = useState(false); 
  
  const rpmCount = useMotionValue(0);
  const roundedRpm = useTransform(rpmCount, (v) => Math.round(v).toLocaleString());
  
  const circumference = 2 * Math.PI * 45; 
  const strokeDashoffset = useTransform(rpmCount, [0, 10000], [circumference, 0]);

  // Play custom MPEG audio instead of synthesized sound
  const playIgnitionSound = useCallback(() => {
    const audio = new Audio(customIgnitionSound);
    audio.play().catch((error) => console.error("Error playing ignition sound:", error));
  }, []);

  const handleIgnition = () => {
    if (isRevving || isBooting) return;
    
    setIsRevving(true);
    playIgnitionSound();
    
    animate(rpmCount, [0, 9200, 8500], { 
      times: [0, 0.4, 1],
      duration: 1.8, 
      ease: "easeOut" 
    });

    setTimeout(() => {
      setIsBooting(true);
    }, 2000);

    setTimeout(() => {
      onBoot();
    }, 6500); 
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden select-none font-sans">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={desktopVideo1} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-zinc-950" />
        <div className="absolute inset-0 bg-amber-900/10 mix-blend-color" />
      </div>

      {/* SCANNING LASER EFFECT */}
      <motion.div
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[1px] bg-amber-500/30 z-50 pointer-events-none shadow-[0_0_15px_rgba(245,158,11,0.5)]"
      />

      <AnimatePresence mode="wait">
        {!isBooting ? (
          <motion.div
            key="dashboard"
            className="absolute inset-0 z-40 w-full h-full flex items-center justify-between px-16"
            exit={{ opacity: 0, scale: 1.1, filter: "brightness(2) blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
          >
            {/* LEFT PANEL */}
            <motion.div 
              initial={{ x: -100, opacity: 0, rotateY: 20 }} 
              animate={{ x: 0, opacity: 1, rotateY: 0 }} 
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`w-80 ${carbonPattern} border border-white/10 rounded-xl p-6 shadow-[20px_0_50px_rgba(0,0,0,0.8)] backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-6 bg-amber-500 shadow-[0_0_10px_#f59e0b]" />
                <h3 className="font-display text-xs tracking-[0.4em] text-zinc-400">CHASSIS_TELEMETRY</h3>
              </div>
              <div className="space-y-2">
                <TelemetryLine label="Torsion Rigidity" value="MAXIMUM" status="ok" delay={0.4} />
                <TelemetryLine label="Aero Balance" value="48% FRONT" status="active" delay={0.5} />
                <TelemetryLine label="Active Diff" value="ENGAGED" status="ok" delay={0.6} />
                <TelemetryLine label="Energy Recovery" value="98%" status="active" delay={0.7} />
              </div>
            </motion.div>

            {/* CENTER CLUSTER */}
            <motion.div 
              className="flex flex-col items-center justify-center"
              animate={isRevving ? { y: [-2, 2, -2, 2, 0], x: [-1, 1, -1, 1, 0] } : {}}
              transition={{ repeat: isRevving ? Infinity : 0, duration: 0.1 }}
            >
              <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(245,158,11,0.1)" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#18181b" strokeWidth="4" strokeDasharray="1 2" />
                  <motion.circle 
                    cx="50" cy="50" r="45" fill="none" stroke="url(#goldGradient)" strokeWidth="5" strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset, filter: "drop-shadow(0 0 8px rgba(251,191,36,0.5))" }}
                  />
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#b45309" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#fef3c7" />
                    </linearGradient>
                  </defs>
                </svg>

                <motion.div 
                  className="relative z-10 w-44 h-44 md:w-56 md:h-56 rounded-full p-1 bg-zinc-900 shadow-2xl overflow-hidden border border-amber-500/20"
                  animate={{ boxShadow: isRevving ? "0 0 60px rgba(251,191,36,0.6)" : "0 0 20px rgba(0,0,0,0.5)" }}
                >
                  <motion.img 
                    src={yantraLogo} 
                    alt="Logo" 
                    className="w-full h-full object-cover"
                    style={{ filter: "sepia(1) saturate(300%) brightness(0.8) hue-rotate(5deg) contrast(1.1)" }}
                    animate={isRevving ? { 
                      filter: "sepia(1) saturate(500%) brightness(1.3) hue-rotate(5deg) contrast(1.3)",
                      scale: 1.05 
                    } : { scale: 1 }}
                  />
                </motion.div>
              </div>

              <div className="mt-6 text-center">
                <motion.h1 
                  initial={{ letterSpacing: "0.2em", opacity: 0 }}
                  animate={{ letterSpacing: "0.5em", opacity: 1 }}
                  className="text-5xl md:text-6xl font-black text-white italic"
                >
                  YANTRA <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">2K26</span>
                </motion.h1>
                
                <div className="mt-8 flex justify-center">
                  <div className={`relative flex items-center gap-4 px-4 py-2 border border-amber-500/20 rounded-lg ${carbonPattern} shadow-[0_0_20px_rgba(0,0,0,0.8)]`}>
                    <div className="flex flex-col items-center justify-center border-r border-white/10 pr-3">
                      <motion.div 
                        animate={{ 
                          backgroundColor: isRevving ? "#fbbf24" : "#b45309",
                          boxShadow: isRevving ? "0 0 10px #fbbf24" : "0 0 0px #000"
                        }}
                        className="w-2 h-2 rounded-full"
                      />
                      <span className="text-[6px] text-zinc-500 mt-1 font-bold">LIVE</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-display text-[8px] tracking-[0.2em] text-amber-500/70 leading-none">ENGINE_SPD</span>
                      <div className="flex items-baseline gap-1">
                        <motion.span className="font-mono text-3xl font-black text-white tabular-nums drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                          {roundedRpm}
                        </motion.span>
                        <span className="font-display text-[8px] text-zinc-500 font-bold uppercase">rpm</span>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      <span className="text-[10px] font-mono font-bold text-amber-500 italic">x1k</span>
                    </div>

                    <div className="absolute -top-[1px] -right-[1px] w-4 h-4 overflow-hidden">
                      <div className="absolute top-0 right-0 w-full h-[1px] bg-amber-500" />
                      <div className="absolute top-0 right-0 h-full w-[1px] bg-amber-500" />
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleIgnition}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mt-12 group relative w-28 h-28 rounded-full bg-zinc-900 border-2 border-amber-900/50 p-1 shadow-2xl"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-700 via-amber-400 to-yellow-200 flex flex-col items-center justify-center text-amber-950 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                  <span className="text-[9px] font-bold tracking-tighter opacity-70 relative z-10">IGNITION</span>
                  <span className="text-lg font-black tracking-widest relative z-10">START</span>
                </div>
              </motion.button>
            </motion.div>

            {/* RIGHT PANEL */}
            <motion.div 
              initial={{ x: 100, opacity: 0, rotateY: -20 }} 
              animate={{ x: 0, opacity: 1, rotateY: 0 }} 
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className={`w-80 ${carbonPattern} border border-white/10 rounded-xl p-6 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] backdrop-blur-sm`}
            >
              <div className="flex items-center justify-end gap-3 mb-8">
                <h3 className="font-display text-xs tracking-[0.4em] text-zinc-400 text-right">POWERTRAIN_V12</h3>
                <div className="w-1 h-6 bg-amber-500 shadow-[0_0_10px_#f59e0b]" />
              </div>
              <div className="space-y-2">
                <TelemetryLine label="Injection Map" value="RACE+" status="active" delay={0.5} />
                <TelemetryLine label="Oil Flow" value="6.8 L/m" status="ok" delay={0.6} />
                <TelemetryLine label="Gear Mesh" value="OPTIMIZED" status="ok" delay={0.7} />
                <TelemetryLine label="Turbo Spool" value="PRE-HEAT" status="warn" delay={0.8} />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* =========================================
             3D COIN SPIN BOOTING SEQUENCE
             ========================================= */
          <motion.div
            key="ignition-booting"
            className="flex flex-col items-center z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            exit={{ opacity: 0 }}
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="relative w-40 h-40 shadow-[0_0_80px_rgba(245,158,11,0.4)] rounded-full"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            >
              <div 
                className="absolute inset-0 rounded-full border-2 border-amber-500 bg-black overflow-hidden"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <img 
                  src={yantraLogo} 
                  alt="Booting Front" 
                  className="w-full h-full object-cover scale-110"
                  style={{ filter: "sepia(1) saturate(300%) hue-rotate(5deg)" }} 
                />
              </div>
              <div 
                className="absolute inset-0 rounded-full border-2 border-amber-500 bg-black overflow-hidden"
                style={{ 
                  backfaceVisibility: "hidden", 
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)" 
                }}
              >
                <img 
                  src={yantraLogo} 
                  alt="Booting Back" 
                  className="w-full h-full object-cover scale-110"
                  style={{ filter: "sepia(1) saturate(300%) hue-rotate(5deg)" }} 
                />
              </div>
            </motion.div>
            
            <motion.div className="mt-12 text-center">
              <motion.span 
                className="text-3xl font-black tracking-[0.8em] text-amber-500"
                animate={{ opacity: [1, 0.4, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              >
                INITIALIZING
              </motion.span>
              <div className="w-96 h-1 bg-zinc-900 mt-6 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-800 via-amber-400 to-amber-800"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 3, ease: [0.65, 0, 0.35, 1] }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesktopLockScreen;