import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const prizes = [
  { event: "CAD WARFARE", amount: "₹10K" },
  { event: "ROBO CLASH", amount: "₹15K" },
  { event: "BRIDGE BUILD", amount: "₹8K" },
];

const PrizePoolWidget = () => (
  <motion.div
    className="w-56 mechanical-border rounded-lg p-3 bg-card/80 backdrop-blur-sm"
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.6 }}
  >
    <div className="flex items-center gap-2 mb-3">
      <Trophy className="w-3 h-3 text-primary" />
      <span className="text-[8px] font-display tracking-[0.2em] text-primary/80">PRIZE POOL</span>
    </div>
    <div className="space-y-2">
      {prizes.map((p) => (
        <div key={p.event} className="flex items-center justify-between">
          <span className="text-[9px] font-mono text-secondary-foreground/70">{p.event}</span>
          <span className="text-[9px] font-display text-primary">{p.amount}</span>
        </div>
      ))}
    </div>
    <div className="mt-2 pt-2 border-t border-border/30 text-center">
      <span className="text-[8px] font-mono text-muted-foreground">TOTAL: ₹67,500+</span>
    </div>
  </motion.div>
);

export default PrizePoolWidget;
