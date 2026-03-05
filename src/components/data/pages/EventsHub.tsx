import { motion } from "framer-motion";
import { ArrowLeft, Wrench, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { icons } from "lucide-react";
import BottomDock from "@/components/BottomDock";
import { techEvents, nonTechEvents, type EventData } from "@/data/eventsData";

const IconCard = ({ event, className = "" }: { event: EventData; className?: string }) => {
  const navigate = useNavigate();
  const LucideIcon = icons[event.icon as keyof typeof icons];

  const accentColor = event.type === "technical"
    ? "text-primary drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]"
    : "text-orange-400 drop-shadow-[0_0_12px_rgba(255,87,34,0.5)]";

  return (
    <motion.button
      onClick={() => navigate(`/events/${event.id}`)}
      className={`relative bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-3 p-4 hover:border-primary/40 transition-colors ${className}`}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {event.category === "flagship" && (
        <span className="absolute top-2 right-2 text-[7px] font-mono tracking-wider text-primary bg-primary/10 border border-primary/20 rounded px-1.5 py-0.5">
          FLAGSHIP
        </span>
      )}
      {LucideIcon && <LucideIcon className={`w-10 h-10 lg:w-12 lg:h-12 ${accentColor}`} strokeWidth={1.5} />}
      <span className="font-mono text-[9px] lg:text-[10px] tracking-wider text-foreground/90 text-center leading-tight">
        {event.title}
      </span>
    </motion.button>
  );
};

const EventsHub = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-[80px]">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border/50">
          <motion.button
            onClick={() => navigate("/home")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-primary" />
          </motion.button>
          <div>
            <h1 className="font-display text-xs tracking-[0.2em] text-primary font-bold">EVENT MODULES</h1>
            <span className="text-[8px] font-mono text-muted-foreground">9 MODULES LOADED</span>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Technical Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-3.5 h-3.5 text-primary" />
              <span className="text-[9px] font-display tracking-[0.3em] text-primary">TECHNICAL EVENTS</span>
              <div className="h-px flex-1 bg-border" />
              <span className="text-[8px] font-mono text-muted-foreground">5 MODULES</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {techEvents.slice(0, 4).map((e) => (
                <IconCard key={e.id} event={e} className="aspect-square" />
              ))}
              {techEvents[4] && (
                <IconCard
                  key={techEvents[4].id}
                  event={techEvents[4]}
                  className="col-span-2 lg:col-span-1 aspect-[2/1] lg:aspect-square"
                />
              )}
            </div>
          </div>

          {/* Non-Technical Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gamepad2 className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[9px] font-display tracking-[0.3em] text-orange-400">NON-TECHNICAL EVENTS</span>
              <div className="h-px flex-1 bg-border" />
              <span className="text-[8px] font-mono text-muted-foreground">4 MODULES</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {nonTechEvents.map((e) => (
                <IconCard key={e.id} event={e} className="aspect-square" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomDock />
    </div>
  );
};

export default EventsHub;
