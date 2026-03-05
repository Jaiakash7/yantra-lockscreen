import { motion, AnimatePresence } from "framer-motion";
import { X, Building2 } from "lucide-react";

const sponsors = [
  { name: "ACME INDUSTRIES", tier: "PLATINUM" },
  { name: "MECHWORKS LTD", tier: "GOLD" },
  { name: "STEELFORGE CO", tier: "GOLD" },
  { name: "AUTOBOT SYSTEMS", tier: "SILVER" },
  { name: "ENGITECH SOLUTIONS", tier: "SILVER" },
];

const tierColors: Record<string, string> = {
  PLATINUM: "text-primary",
  GOLD: "text-primary/80",
  SILVER: "text-muted-foreground",
};

interface Props {
  open: boolean;
  onClose: () => void;
}

const SponsorsSheet = ({ open, onClose }: Props) => (
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
              <Building2 className="w-4 h-4 text-primary" />
              <span className="font-display text-xs tracking-[0.2em] text-primary font-bold">SPONSORS</span>
            </div>
            <button onClick={onClose}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="space-y-3">
            {sponsors.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 mechanical-border rounded-lg">
                <span className="text-[10px] font-mono text-secondary-foreground">{s.name}</span>
                <span className={`text-[8px] font-display tracking-wider ${tierColors[s.tier]}`}>{s.tier}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default SponsorsSheet;
