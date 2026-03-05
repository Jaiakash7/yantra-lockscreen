import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cog, FileText, Ruler, Zap, ChevronRight } from "lucide-react";
import BottomDock from "@/components/BottomDock";

const categories = [
  { icon: Cog, label: "WORKSHOPS", desc: "Hands-on skill modules", path: "/events/workshops", count: 3 },
  { icon: FileText, label: "PAPER PRESENTATION", desc: "Research & poster showcase", path: "/events/papers", count: 2 },
  { icon: Ruler, label: "TECHNICAL EVENTS", desc: "Competitive engineering challenges", path: "/events/tech", count: 3 },
  { icon: Zap, label: "NON-TECHNICAL EVENTS", desc: "Fun & creative competitions", path: "/events/non-tech", count: 3 },
];

const EventsIndex = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3">
        <div className="mb-4">
          <h1 className="font-display text-sm tracking-[0.2em] text-primary font-bold">EVENT MODULES</h1>
          <span className="text-[9px] font-mono text-muted-foreground">SELECT CATEGORY TO VIEW SPECS</span>
        </div>

        {categories.map(({ icon: Icon, label, desc, path, count }, i) => (
          <motion.button
            key={path}
            onClick={() => navigate(path)}
            className="w-full spec-sheet rounded-r-lg p-4 flex items-center gap-4 text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center bg-muted/30">
              <Icon className="w-5 h-5 text-primary/80" />
            </div>
            <div className="flex-1">
              <span className="font-display text-[10px] tracking-wider text-primary block">{label}</span>
              <span className="text-[9px] font-mono text-muted-foreground">{desc}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-display text-muted-foreground">{count}</span>
              <ChevronRight className="w-4 h-4 text-primary/40" />
            </div>
          </motion.button>
        ))}
      </div>
      <BottomDock />
    </div>
  );
};

export default EventsIndex;
