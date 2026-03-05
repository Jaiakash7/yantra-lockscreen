import { motion } from "framer-motion";
import { Home, Calendar, Map, Clock, Wifi } from "lucide-react";
import { useState, useEffect } from "react";

export type DesktopApp = "home" | "events" | "map" | "schedule" | "instruction" | "about" | "gallery" | "prize" | "sponsors";

const shelfItems: { id: DesktopApp; icon: typeof Home; label: string }[] = [
  { id: "home", icon: Home, label: "HOME" },
  { id: "events", icon: Calendar, label: "EVENTS" },
  { id: "map", icon: Map, label: "MAP" },
  { id: "schedule", icon: Clock, label: "SCHEDULE" },
];

interface Props {
  openApps: DesktopApp[];
  onOpen: (app: DesktopApp) => void;
}

const DesktopShelf = ({ openApps, onOpen }: Props) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex items-end justify-center px-8">
      <motion.div
        className="flex items-center gap-1 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      >
        {shelfItems.map(({ id, icon: Icon, label }) => {
          const active = openApps.includes(id);
          return (
            <motion.button
              key={id}
              onClick={() => onOpen(id)}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl hover:bg-white/10 transition-colors relative"
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`w-7 h-7 ${active ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-[10px] font-display tracking-wider text-muted-foreground">{label}</span>
              {active && (
                <motion.div
                  className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-primary"
                  layoutId={`led-${id}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              )}
            </motion.button>
          );
        })}

        <div className="w-px h-10 bg-white/10 mx-2" />

        <div className="flex flex-col items-end gap-1 px-3">
          <div className="flex items-center gap-1.5">
            <Wifi className="w-4 h-4 text-primary/60" />
            <span className="text-[10px] font-mono text-muted-foreground">MSEC_WIFI</span>
          </div>
          <span className="text-[12px] font-display text-primary/80 tracking-wider">
            {time.toLocaleTimeString("en-US", { hour12: false })}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default DesktopShelf;