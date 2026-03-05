import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy } from "lucide-react";

const prizes = [
  { event: "CAD WARFARE", first: "₹10,000", second: "₹5,000" },
  { event: "ROBO CLASH", first: "₹15,000", second: "₹7,500" },
  { event: "BRIDGE BUILDER", first: "₹8,000", second: "₹4,000" },
  { event: "ANSYS SIM LAB", first: "₹12,000", second: "₹6,000" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const PrizePoolSheet = ({ open, onClose }: Props) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          className="absolute inset-0 bg-background/60 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-2xl p-5 max-h-[70%] overflow-y-auto scrollbar-hide"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={0.1}
          onDragEnd={(_, info) => { if (info.offset.y > 100) onClose(); }}
        >
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30 mx-auto mb-4" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="font-display text-xs tracking-[0.2em] text-primary font-bold">PRIZE POOL</span>
            </div>
            <button onClick={onClose}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="space-y-3">
            {prizes.map((p) => (
              <div key={p.event} className="mechanical-border rounded-lg p-3">
                <span className="text-[10px] font-display tracking-wider text-primary block mb-2">{p.event}</span>
                <div className="flex gap-4 text-[9px] font-mono">
                  <span className="text-primary">1ST: {p.first}</span>
                  <span className="text-secondary-foreground/70">2ND: {p.second}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <span className="text-[8px] font-mono text-muted-foreground">TOTAL POOL: ₹67,500+</span>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default PrizePoolSheet;
