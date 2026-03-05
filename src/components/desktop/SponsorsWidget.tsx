import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const sponsors = [
  { name: "ACME INDUSTRIES", tier: "PLATINUM" },
  { name: "MECHWORKS LTD", tier: "GOLD" },
  { name: "STEELFORGE CO", tier: "GOLD" },
];

const SponsorsWidget = () => (
  <motion.div
    className="w-56 mechanical-border rounded-lg p-3 bg-card/80 backdrop-blur-sm"
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8 }}
  >
    <div className="flex items-center gap-2 mb-3">
      <Building2 className="w-3 h-3 text-primary" />
      <span className="text-[8px] font-display tracking-[0.2em] text-primary/80">SPONSORS</span>
    </div>
    <div className="space-y-2">
      {sponsors.map((s) => (
        <div key={s.name} className="flex items-center justify-between">
          <span className="text-[9px] font-mono text-secondary-foreground/70">{s.name}</span>
          <span className="text-[7px] font-display tracking-wider text-primary/60">{s.tier}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default SponsorsWidget;
