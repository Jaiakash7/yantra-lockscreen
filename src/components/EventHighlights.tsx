import { motion } from "framer-motion";
import { Cog, Cpu, Flame, Trophy } from "lucide-react";

const highlights = [
  { icon: Cpu, label: "ANSYS SIMULATION LAB", tag: "WORKSHOP", color: "text-primary" },
  { icon: Cog, label: "CAD WARFARE", tag: "TECH", color: "text-primary" },
  { icon: Flame, label: "ROBO CLASH", tag: "TECH", color: "text-primary" },
  { icon: Trophy, label: "BRIDGE BUILDER", tag: "NON-TECH", color: "text-primary" },
];

const EventHighlights = () => (
  <motion.div
    className="mechanical-border rounded-lg p-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <div className="flex items-center gap-2 mb-3">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      <span className="text-[9px] font-display tracking-[0.3em] text-primary/70">
        EVENT HIGHLIGHTS
      </span>
    </div>
    <div className="space-y-2">
      {highlights.map(({ icon: Icon, label, tag }, i) => (
        <motion.div
          key={label}
          className="flex items-center gap-3 p-2 rounded-md bg-muted/20 border border-border/30"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.08 }}
        >
          <Icon className="w-4 h-4 text-primary/70 shrink-0" />
          <span className="text-[10px] font-mono text-secondary-foreground/80 flex-1 truncate">{label}</span>
          <span className="text-[7px] font-display tracking-wider text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">{tag}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default EventHighlights;
