import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import yantraLogo from "@/assets/yantra-logo.jpeg";

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [systemStatus, setSystemStatus] = useState("AWAITING_IGNITION");
  const [eyesLit, setEyesLit] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const trackWidth = 260;
  const handleSize = 50;
  const maxDrag = trackWidth - handleSize;

  const fillWidth = useTransform(x, [0, maxDrag], ["0%", "100%"]);
  const progress = useTransform(x, [0, maxDrag], [0, 1]);
  const textOpacity = useTransform(x, [0, maxDrag * 0.5, maxDrag], [0.6, 0.3, 0]);
  const statusOpacity = useTransform(x, [maxDrag * 0.5, maxDrag * 0.8, maxDrag], [0, 0.5, 1]);

  const handleDrag = (_: any, info: { point: { x: number } }) => {
    const currentProgress = x.get() / maxDrag;
    if (currentProgress > 0.3) {
      setEyesLit(true);
    }
    if (currentProgress > 0.7) {
      setSystemStatus("SYSTEMS CHECK: OPTIMAL");
    }
  };

  const handleDragEnd = () => {
    const currentProgress = x.get() / maxDrag;
    if (currentProgress > 0.9) {
      setSystemStatus("IGNITION_ENGAGED");
      setTimeout(onUnlock, 600);
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
      setEyesLit(false);
      setSystemStatus("AWAITING_IGNITION");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 diamond-plate relative overflow-hidden">
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="w-full h-px bg-primary/10"
          animate={{ y: ["-10%", "1000%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Logo */}
      <motion.div
        className="relative mb-8"
        animate={eyesLit ? {} : {}}
      >
        <motion.img
          src={yantraLogo}
          alt="Yantra 2K26"
          className="w-48 h-48 rounded-full object-cover"
          animate={{
            filter: eyesLit
              ? "drop-shadow(0 0 40px hsl(43 100% 50% / 0.7))"
              : "drop-shadow(0 0 15px hsl(43 100% 50% / 0.3))",
          }}
          style={{
            animation: eyesLit ? undefined : "pulse-glow 3s ease-in-out infinite",
          }}
          transition={{ duration: 0.5 }}
        />
        {eyesLit && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: "radial-gradient(circle, hsl(43 100% 50% / 0.15) 0%, transparent 70%)",
            }}
          />
        )}
      </motion.div>

      {/* System Status */}
      <motion.p
        className="font-display text-xs tracking-[0.3em] text-primary/80 mb-2"
        style={{ opacity: statusOpacity }}
        animate={systemStatus === "SYSTEMS CHECK: OPTIMAL" ? { opacity: [0.5, 1, 0.5, 1] } : {}}
        transition={{ duration: 0.3, repeat: 2 }}
      >
        {systemStatus}
      </motion.p>

      <motion.p
        className="font-display text-[10px] tracking-widest text-muted-foreground mb-10"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        YANTRA 2K26 // MECHANICAL OS v1.0
      </motion.p>

      {/* Slide to Ignite Track */}
      <div className="relative">
        <div
          ref={trackRef}
          className="relative h-[50px] rounded-full border border-border bg-muted/50 overflow-hidden"
          style={{ width: trackWidth }}
        >
          {/* Track fill */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.9)]"
            style={{ width: fillWidth }}
          />

          {/* Track text */}
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-[10px] font-display tracking-[0.25em] text-primary/60 select-none"
            style={{ opacity: textOpacity }}
          >
            SLIDE TO IGNITE
          </motion.span>

          {/* Gear handle */}
          <motion.div
            className="absolute top-0 left-0 w-[50px] h-[50px] rounded-full gold-gradient flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
            drag="x"
            dragConstraints={{ left: 0, right: maxDrag }}
            dragElastic={0}
            dragMomentum={false}
            style={{ x }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            whileTap={{ scale: 1.05 }}
          >
            {/* Gear SVG */}
            <motion.svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="hsl(0 0% 4%)"
              style={{ rotate: useTransform(x, [0, maxDrag], [0, 360]) }}
            >
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
