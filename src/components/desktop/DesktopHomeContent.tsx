import { motion } from "framer-motion";
import { BookOpen, Info, ImageIcon, Trophy, Rocket } from "lucide-react";
import CountdownCard from "@/components/CountdownCard";
import { type DesktopApp } from "./DesktopShelf";

interface Props {
  onOpenEvents?: () => void;
  onOpenApp?: (app: DesktopApp) => void;
}

const gridButtons: { icon: typeof BookOpen; label: string; id: DesktopApp }[] = [
  { icon: BookOpen, label: "INSTRUCTION", id: "instruction" },
  { icon: Info, label: "ABOUT", id: "about" },
  { icon: ImageIcon, label: "GALLERY", id: "gallery" },
  { icon: Trophy, label: "PRIZE", id: "prize" },
];

const DesktopHomeContent = ({ onOpenEvents, onOpenApp }: Props) => (
  <div className="p-6 space-y-6 max-w-lg mx-auto">
    <CountdownCard />

    <div className="grid grid-cols-2 gap-4">
      {gridButtons.map(({ icon: Icon, label, id }) => (
        <motion.button
          key={label}
          onClick={() => onOpenApp?.(id)}
          className="aspect-square rounded-xl border-2 border-border bg-card/50 flex flex-col items-center justify-center gap-3 relative overflow-hidden group"
          whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
          whileTap={{ scale: 0.95 }}
          style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.4)" }}
        >
          <div className="w-12 h-12 rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center group-hover:border-primary/50 transition-colors">
            <Icon className="w-9 h-9 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <span className="text-[9px] font-display tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
            {label}
          </span>
        </motion.button>
      ))}
    </div>

    <motion.button
      onClick={onOpenEvents}
      className="w-full py-5 rounded-xl border-2 border-primary/50 bg-primary/5 flex items-center justify-center gap-3"
      whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary))" }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
      <Rocket className="w-5 h-5 text-primary" />
      <span className="font-display text-sm tracking-[0.3em] text-primary font-bold">EXPLORE EVENTS</span>
    </motion.button>
  </div>
);

export default DesktopHomeContent;
