import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cog, FileText, Ruler, Zap } from "lucide-react";

const navItems = [
  { icon: Cog, label: "WORKSHOPS", path: "/events/workshops", delay: 0 },
  { icon: FileText, label: "PAPERS", path: "/events/papers", delay: 0.1 },
  { icon: Ruler, label: "TECH", path: "/events/tech", delay: 0.2 },
  { icon: Zap, label: "NON-TECH", path: "/events/non-tech", delay: 0.3 },
];

const GearGrid = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="grid grid-cols-4 gap-3 px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {navItems.map(({ icon: Icon, label, path, delay }) => (
        <motion.button
          key={label}
          onClick={() => navigate(path)}
          className="flex flex-col items-center gap-2 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + delay }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-14 h-14 rounded-full border-2 border-primary/40 bg-muted/50 flex items-center justify-center group-hover:border-primary group-hover:gold-glow transition-all duration-300">
            {/* Emergency stop ring */}
            <div className="absolute inset-0 rounded-full border border-destructive/20 group-hover:border-destructive/40 transition-colors" />
            <Icon className="w-5 h-5 text-primary/80 group-hover:text-primary transition-colors" />
          </div>
          <span className="text-[8px] font-display tracking-[0.2em] text-muted-foreground group-hover:text-primary/80 transition-colors">
            {label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default GearGrid;
