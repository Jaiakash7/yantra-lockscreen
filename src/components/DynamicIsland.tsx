import { motion } from "framer-motion";
import yantraLogo from "@/assets/yantra-logo.jpeg";

const DynamicIsland = () => {
  return (
    <motion.div
      className="mx-auto flex items-center gap-3 bg-oil border border-border rounded-2xl px-4 py-2 max-w-[280px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <img
        src={yantraLogo}
        alt="MSEC Crest"
        className="w-8 h-8 rounded-full object-cover border border-primary/30"
      />
      <div className="flex flex-col">
        <span className="font-display text-[11px] tracking-[0.2em] gold-text font-bold">
          YANTRA 2K26
        </span>
        <span className="text-[7px] font-mono text-muted-foreground tracking-wider">
          INDUSTRIAL INTELLIGENCE
        </span>
      </div>
      <div className="ml-auto flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
      </div>
    </motion.div>
  );
};

export default DynamicIsland;
