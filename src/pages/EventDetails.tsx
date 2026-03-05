import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Users, Phone, Terminal } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { icons } from "lucide-react";
import { eventsData, contacts, prizeMap } from "@/data/eventsData";
import BottomDock from "@/components/BottomDock";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="font-mono text-muted-foreground">EVENT NOT FOUND</span>
      </div>
    );
  }

  const LucideIcon = icons[event.icon as keyof typeof icons];
  const prizes = event.type === "technical" && event.category !== "none" ? prizeMap[event.category] : null;
  const accentColor = event.type === "technical" ? "text-primary" : "text-orange-400";

  return (
    <motion.div
      className="flex flex-col h-full lg:flex-row"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Left / Main Pane */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-[80px] lg:pb-0 lg:border-r lg:border-border/50 lg:max-w-md">
        {/* Hero Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <motion.button
              onClick={() => navigate("/events")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-primary" />
            </motion.button>
            <span className="text-[8px] font-mono text-muted-foreground">← BACK TO HUB</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-zinc-900/60 backdrop-blur-md border border-zinc-800 flex items-center justify-center shrink-0">
              {LucideIcon && (
                <LucideIcon
                  className={`w-8 h-8 ${accentColor} drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]`}
                  strokeWidth={1.5}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-sm tracking-wider text-primary font-bold leading-tight mb-1">
                {event.title}
              </h1>
              <span className={`text-[8px] font-mono tracking-widest px-2 py-0.5 rounded border ${
                event.type === "technical"
                  ? "text-primary border-primary/30 bg-primary/10"
                  : "text-orange-400 border-orange-400/30 bg-orange-400/10"
              }`}>
                {event.type.toUpperCase()} {event.category !== "none" ? `// ${event.category.toUpperCase()}` : ""}
              </span>
            </div>
          </div>

          {/* Specs Row */}
          <div className="flex gap-4 mt-4 text-[9px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary/60" />{event.duration}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary/60" />{event.venue}</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3 text-primary/60" />{event.teamSize}</span>
          </div>
        </div>

        {/* Overview */}
        <div className="p-4 border-b border-border/50">
          <span className="text-[8px] font-display tracking-[0.3em] text-muted-foreground block mb-2">OVERVIEW</span>
          <p className="text-[11px] font-body text-foreground/80 leading-relaxed">{event.description}</p>
        </div>

        {/* Prize Podium — only for technical (mobile) */}
        {prizes && (
          <div className="p-4 border-b border-border/50 lg:hidden">
            <PrizePodium prizes={prizes} />
          </div>
        )}

        {/* Guidelines — mobile */}
        <div className="p-4 border-b border-border/50 lg:hidden">
          <GuidelinesSection guidelines={event.guidelines} />
        </div>

        {/* Contacts */}
        <div className="p-4 border-b border-border/50">
          <span className="text-[8px] font-display tracking-[0.3em] text-muted-foreground block mb-3">POINTS OF CONTACT</span>
          <div className="space-y-2">
            {contacts.map((c) => (
              <div key={c.phone} className="flex items-center justify-between bg-zinc-900/40 border border-zinc-800 rounded-lg px-3 py-2">
                <div>
                  <span className="text-[10px] font-mono text-foreground/90 block">{c.name}</span>
                  <span className="text-[9px] font-mono text-muted-foreground">{c.phone}</span>
                </div>
                <a
                  href={`tel:${c.phone}`}
                  className="w-8 h-8 rounded-full bg-green-600/20 border border-green-600/30 flex items-center justify-center hover:bg-green-600/30 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-green-400" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Registration CTA — mobile */}
        <div className="p-4 lg:hidden">
          <RegistrationCTA />
        </div>
      </div>

      {/* Right Pane — Desktop only */}
      <div className="hidden lg:flex flex-col flex-1 overflow-y-auto scrollbar-hide p-6 space-y-6">
        {prizes && <PrizePodium prizes={prizes} />}
        <GuidelinesSection guidelines={event.guidelines} />
        <RegistrationCTA />
      </div>

      <div className="lg:hidden">
        <BottomDock />
      </div>
    </motion.div>
  );
};

const RegistrationCTA = () => (
  <motion.button
    className="w-full py-4 bg-black border border-zinc-700 rounded-xl font-mono text-[11px] tracking-[0.2em] text-white font-bold flex items-center justify-center gap-3 hover:bg-zinc-900 transition-all active:scale-[0.98]"
    whileHover={{ boxShadow: "0 0 20px rgba(255,87,34,0.4)" }}
    whileTap={{ scale: 0.98 }}
  >
    <Terminal className="w-4 h-4" />
    INITIALIZE REGISTRATION SEQUENCE
  </motion.button>
);

const PrizePodium = ({ prizes }: { prizes: { first: string; second: string; third: string } }) => (
  <div>
    <span className="text-[8px] font-display tracking-[0.3em] text-muted-foreground block mb-3">PRIZE PODIUM</span>
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "🥇 GOLD", amount: prizes.first, glow: "border-yellow-500/40 bg-yellow-500/5" },
        { label: "🥈 SILVER", amount: prizes.second, glow: "border-zinc-400/40 bg-zinc-400/5" },
        { label: "🥉 BRONZE", amount: prizes.third, glow: "border-orange-600/40 bg-orange-600/5" },
      ].map((p) => (
        <div key={p.label} className={`rounded-lg border p-3 text-center ${p.glow}`}>
          <span className="text-lg block mb-1">{p.label.split(" ")[0]}</span>
          <span className="text-[7px] font-display tracking-wider text-muted-foreground block mb-1">
            {p.label.split(" ")[1]}
          </span>
          <span className="text-sm font-mono text-primary font-bold">{p.amount}</span>
        </div>
      ))}
    </div>
  </div>
);

const GuidelinesSection = ({ guidelines }: { guidelines: string[] }) => (
  <div>
    <span className="text-[8px] font-display tracking-[0.3em] text-muted-foreground block mb-3">OPERATIONAL GUIDELINES</span>
    <div className="space-y-2">
      {guidelines.map((g, i) => (
        <div key={i} className="flex gap-2 items-start">
          <span className="text-[8px] font-mono text-primary/60 mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
          <p className="text-[10px] font-body text-foreground/70 leading-relaxed">{g}</p>
        </div>
      ))}
    </div>
  </div>
);

export default EventDetails;
