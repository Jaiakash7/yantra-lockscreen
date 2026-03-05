import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EVENTS = [
  "ANSYS_SPRINT",
  "CAD_WARFARE",
  "ROBO_CLASH",
  "THERMO_QUIZ",
  "MECH_DEBATE",
  "BRIDGE_BUILD",
  "PAPER_PRSNT",
  "PISTON_RACE",
];

const generateLog = (id: number) => {
  const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
  const userId = Math.floor(Math.random() * 900) + 100;
  return {
    id,
    text: `[USER_ID: ${userId}] REGISTERED FOR ${event}... SUCCESS`,
    timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
  };
};

const LiveFeed = () => {
  const [logs, setLogs] = useState(() =>
    Array.from({ length: 4 }, (_, i) => generateLog(i))
  );

  useEffect(() => {
    let counter = 4;
    const id = setInterval(() => {
      setLogs((prev) => {
        const next = [generateLog(counter++), ...prev];
        return next.slice(0, 8);
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="mechanical-border rounded-lg p-4 h-[140px] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[9px] font-display tracking-[0.3em] text-primary/70">
          LIVE REGISTRATION FEED
        </span>
      </div>
      <div className="space-y-1 font-mono text-[9px] text-secondary-foreground/80">
        <AnimatePresence mode="popLayout">
          {logs.slice(0, 5).map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-2"
            >
              <span className="text-muted-foreground/50">{log.timestamp}</span>
              <span className="text-primary/60">{">"}</span>
              <span className="truncate">{log.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <span className="inline-block w-2 h-3 bg-primary/70 animate-terminal-blink" />
      </div>
    </motion.div>
  );
};

export default LiveFeed;
