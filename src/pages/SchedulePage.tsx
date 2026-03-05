import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomDock from "@/components/BottomDock";

const scheduleData = [
  { time: "09:00", title: "INAUGURATION CEREMONY", venue: "MAIN AUDITORIUM", type: "ceremony" },
  { time: "10:00", title: "TECHNICAL EVENTS BEGIN", venue: "LABS & HALLS", type: "tech" },
  { time: "11:30", title: "WORKSHOP SESSION I", venue: "LAB-C3", type: "workshop" },
  { time: "13:00", title: "LUNCH BREAK", venue: "CANTEEN", type: "break" },
  { time: "14:00", title: "NON-TECH EVENTS", venue: "OPEN GROUND", type: "nontech" },
  { time: "15:30", title: "WORKSHOP SESSION II", venue: "SMART-LAB", type: "workshop" },
  { time: "16:30", title: "PRIZE DISTRIBUTION", venue: "MAIN AUDITORIUM", type: "ceremony" },
  { time: "17:30", title: "VALEDICTORY & CLOSE", venue: "MAIN AUDITORIUM", type: "ceremony" },
];

const SchedulePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            onClick={() => navigate("/home")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-primary" />
          </motion.button>
          <h1 className="font-display text-xs tracking-[0.2em] text-primary font-bold">
            SYSTEM SCHEDULE
          </h1>
          <span className="text-[8px] font-mono text-muted-foreground">// TIMELINE</span>
        </div>

        <div className="relative">
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-1">
            {scheduleData.map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-3 items-start relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex flex-col items-center z-10 pt-1">
                  <div className={`w-3 h-3 rounded-full border-2 ${
                    item.type === "break" ? "border-muted-foreground bg-muted" : "border-primary bg-primary/20"
                  }`} />
                </div>
                <div className="flex-1 p-3 rounded-lg border border-border/50 bg-card/50 mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-primary font-bold">{item.time}</span>
                    <span className="text-[7px] font-display tracking-widest text-muted-foreground uppercase">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-display text-[11px] tracking-wider text-foreground mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-muted-foreground" />
                    <span className="text-[8px] font-mono text-muted-foreground">{item.venue}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <BottomDock />
    </div>
  );
};

export default SchedulePage;
