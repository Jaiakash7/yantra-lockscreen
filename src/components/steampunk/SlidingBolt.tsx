import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface SlidingBoltProps {
  onUnlock: () => void;
}

const SlidingBolt = ({ onUnlock }: SlidingBoltProps) => {
  const [dragX, setDragX] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const TRACK_WIDTH = 260;
  const HANDLE_WIDTH = 72;
  const UNLOCK_THRESHOLD = TRACK_WIDTH - HANDLE_WIDTH - 10;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-16 rounded-lg border-2 border-primary/30 bg-secondary/60 backdrop-blur-sm overflow-hidden"
        style={{ width: TRACK_WIDTH }}
      >
        {/* Track grooves */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 w-px bg-primary/30" style={{ left: `${(i + 1) * 8}%` }} />
          ))}
        </div>

        {/* Metallic track surface */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10" />
        
        {/* Arrow hints */}
        <div className="absolute inset-y-0 right-4 flex items-center gap-1 opacity-30">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="hsl(var(--primary))"><path d="M2 6 L8 2 L8 10 Z" /></svg>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="hsl(var(--primary))"><path d="M2 6 L8 2 L8 10 Z" /></svg>
        </div>

        {/* Unlock zone indicator */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary/10 to-transparent rounded-r-lg border-l border-primary/20" />

        {/* Sliding handle */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: UNLOCK_THRESHOLD }}
          dragElastic={0}
          dragMomentum={false}
          onDrag={(_, info) => {
            setDragX(info.offset.x);
          }}
          onDragEnd={(_, info) => {
            if (info.offset.x >= UNLOCK_THRESHOLD * 0.85) {
              setUnlocked(true);
              onUnlock();
            } else {
              setDragX(0);
            }
          }}
          animate={unlocked ? { x: UNLOCK_THRESHOLD } : dragX < UNLOCK_THRESHOLD * 0.85 ? {} : undefined}
          className="absolute top-1 left-1 bottom-1 cursor-grab active:cursor-grabbing rounded-md border border-primary/40 bg-gradient-to-b from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center shadow-[0_0_15px_hsl(var(--gold-glow)/0.2)]"
          style={{ width: HANDLE_WIDTH }}
        >
          {/* Handle texture */}
          <div className="flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-0.5 h-6 rounded-full bg-primary/40" />
            ))}
          </div>
          {/* Rivets */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-primary/20 border border-primary/30" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary/20 border border-primary/30" />
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-primary/20 border border-primary/30" />
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-primary/20 border border-primary/30" />
        </motion.div>
      </div>

      <span className="font-display text-[10px] tracking-[0.5em] uppercase text-primary/40">
        Slide to unlock
      </span>
    </div>
  );
};

export default SlidingBolt;
