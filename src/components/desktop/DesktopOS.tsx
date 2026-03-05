import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Info, ImageIcon, Trophy, Building2, Volume2, VolumeX } from "lucide-react";
import DesktopShelf, { type DesktopApp } from "./DesktopShelf";
import AppWindow from "./AppWindow";
import PrizePoolWidget from "./PrizePoolWidget";
import CommsWidget from "./CommsWidget";

import yantraLogo from "@/assets/yantra.mp4";

// ⚠️ CHANGE THIS IMPORT to your actual background music file if different
import bgMusic from "@/assets/bg.mpeg"; 

import DesktopHomeContent from "./DesktopHomeContent";
import DesktopEventsContent from "./DesktopEventsContent";
import DesktopMapContent from "./DesktopMapContent";
import DesktopScheduleContent from "./DesktopScheduleContent";
import DesktopInstructionContent from "./DesktopInstructionContent";
import DesktopAboutContent from "./DesktopAboutContent";
import DesktopGalleryContent from "./DesktopGalleryContent";
import DesktopPrizeContent from "./DesktopPrizeContent";
import SponsorsContent from "./SponsorsContent";

// === Golden Sparks Particle System ===
const GoldenSparks = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    {[...Array(40)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-yellow-200 shadow-[0_0_10px_2px_rgba(234,179,8,0.8)]"
        initial={{
          x: `${Math.random() * 100}vw`,
          y: "110vh",
          opacity: 0,
          scale: Math.random() * 1.5 + 0.5,
        }}
        animate={{
          y: "-10vh",
          x: `${Math.random() * 100}vw`,
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: Math.random() * 5 + 4,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

const appMeta: Record<DesktopApp, { title: string; pos: { x: number; y: number } }> = {
  home: { title: "YANTRA CONSOLE // HOME", pos: { x: 300, y: 80 } },
  events: { title: "EVENT MODULES // INDEX", pos: { x: 150, y: 60 } },
  map: { title: "FACILITY MAP // RADAR", pos: { x: 200, y: 70 } },
  schedule: { title: "SYSTEM SCHEDULE // TIMELINE", pos: { x: 250, y: 90 } },
  instruction: { title: "INSTRUCTIONS // PROTOCOL", pos: { x: 350, y: 100 } },
  about: { title: "ABOUT // MANIFEST", pos: { x: 320, y: 80 } },
  gallery: { title: "GALLERY // ARCHIVE", pos: { x: 180, y: 80 } },
  prize: { title: "PRIZE POOL // MANIFEST", pos: { x: 280, y: 70 } },
  sponsors: { title: "SPONSORS // REGISTRY", pos: { x: 340, y: 90 } },
};

const desktopShortcuts: { id: DesktopApp; icon: typeof BookOpen; label: string }[] = [
  { id: "instruction", icon: BookOpen, label: "Instruction" },
  { id: "about", icon: Info, label: "About" },
  { id: "gallery", icon: ImageIcon, label: "Gallery" },
  { id: "prize", icon: Trophy, label: "Prizes" },
  { id: "sponsors", icon: Building2, label: "Sponsors" },
];

const DesktopOS = () => {
  const [openApps, setOpenApps] = useState<DesktopApp[]>(["home"]);
  const [focusOrder, setFocusOrder] = useState<DesktopApp[]>(["home"]);
  
  // === Audio State & Ref ===
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play or pause audio based on state
  useEffect(() => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        // We catch the promise to prevent errors if the browser blocks autoplay initially
        audioRef.current.play().catch(e => console.warn("Autoplay blocked:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isAudioPlaying]);

  const handleOpen = useCallback((app: DesktopApp) => {
    setOpenApps((prev) => {
      if (prev.includes(app)) return prev;
      const newApps = [...prev, app];
      if (newApps.length > 3) return newApps.slice(newApps.length - 3);
      return newApps;
    });
    setFocusOrder((prev) => {
      const newFocus = [...prev.filter((a) => a !== app), app];
      if (newFocus.length > 3) return newFocus.slice(newFocus.length - 3);
      return newFocus;
    });
  }, []);

  const handleClose = useCallback((app: DesktopApp) => {
    setOpenApps((prev) => prev.filter((a) => a !== app));
    setFocusOrder((prev) => prev.filter((a) => a !== app));
  }, []);

  const handleFocus = useCallback((app: DesktopApp) => {
    setFocusOrder((prev) => [...prev.filter((a) => a !== app), app]);
  }, []);

  const getZIndex = (app: DesktopApp) => 100 + focusOrder.indexOf(app);

  const renderContent = (app: DesktopApp) => {
    switch (app) {
      case "home": return <DesktopHomeContent onOpenEvents={() => handleOpen("events")} onOpenApp={handleOpen} />;
      case "events": return <DesktopEventsContent />;
      case "map": return <DesktopMapContent />;
      case "schedule": return <DesktopScheduleContent />;
      case "instruction": return <DesktopInstructionContent />;
      case "about": return <DesktopAboutContent />;
      case "gallery": return <DesktopGalleryContent />;
      case "prize": return <DesktopPrizeContent />;
      case "sponsors": return <SponsorsContent />;
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 overflow-hidden">
      
      {/* Background Audio Element */}
      <audio ref={audioRef} src={bgMusic} loop />

      {/* === VIDEO BACKGROUND & SPARKS SYSTEM === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <motion.video 
          autoPlay 
          loop 
          muted 
          playsInline
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.4, scale: 1 }} 
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-[280vw] max-w-[1300px] object-contain mix-blend-screen rounded-xl"
        >
          <source src={yantraLogo} type="video/mp4" />
        </motion.video>
        <GoldenSparks />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.95)_100%)]" />
      </div>

      {/* Desktop shortcuts */}
      <div className="absolute top-6 left-6 flex flex-col gap-6 z-30">
        {desktopShortcuts.map(({ id, icon: Icon, label }) => (
          <motion.button
            key={id}
            onClick={() => handleOpen(id)}
            className="flex flex-col items-center gap-2 w-20 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-16 h-16 rounded-2xl border border-zinc-800/50 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <Icon className="w-7 h-7 text-zinc-400 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-[10px] font-display tracking-wider text-zinc-500 group-hover:text-primary transition-colors text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Desktop widgets (Top Right) */}
      <div className="absolute top-6 right-6 space-y-4 z-30 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
        <PrizePoolWidget />
        <CommsWidget />
      </div>

      {/* App windows */}
      <AnimatePresence>
        {openApps.map((app) => (
          <AppWindow
            key={app}
            title={appMeta[app].title}
            zIndex={getZIndex(app)}
            defaultPosition={appMeta[app].pos}
            onClose={() => handleClose(app)}
            onFocus={() => handleFocus(app)}
          >
            {renderContent(app)}
          </AppWindow>
        ))}
      </AnimatePresence>

      <DesktopShelf openApps={openApps} onOpen={handleOpen} />

      {/* BOTTOM RIGHT AUDIO CONTROL WIDGET */}
      <div className="absolute bottom-6 right-6 z-50 flex items-center justify-center">
        <motion.button
          onClick={() => setIsAudioPlaying(!isAudioPlaying)}
          className={`flex items-center justify-center w-14 h-14 rounded-xl border backdrop-blur-md transition-all shadow-lg ${
            isAudioPlaying 
              ? "bg-primary/10 border-primary/40 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-primary/20 hover:border-primary/80" 
              : "bg-black/40 border-zinc-800/50 hover:bg-white/5 hover:border-white/20"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isAudioPlaying ? (
            <Volume2 className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          ) : (
            <VolumeX className="w-6 h-6 text-zinc-500" />
          )}
          
          {/* Subtle live indicator dot when playing */}
          {isAudioPlaying && (
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          )}
        </motion.button>
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-0 left-4 pb-2 z-50 pointer-events-none">
        <p className="text-xs text-primary/60 font-mono tracking-widest uppercase font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          PROPERTY OF MEENAKSHI SUNDARARAJAN ENGG COLLEGE // DEPT. OF MECH.
        </p>
      </div>
    </div>
  );
};

export default DesktopOS;