import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { BookOpen, Info, ImageIcon, Trophy, Rocket, Phone, Shield, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CountdownCard from "@/components/CountdownCard";
import DynamicIsland from "@/components/DynamicIsland";
import BottomDock from "@/components/BottomDock";

const gridButtons = [
  { icon: BookOpen, label: "INSTRUCTION", path: "/instruction" },
  { icon: Info, label: "ABOUT", path: "/about" },
  { icon: ImageIcon, label: "GALLERY", path: "/gallery" },
  { icon: Trophy, label: "PRIZES", path: "/prizes" },
];

const contacts = [
  { name: "SYED NAYEM", number: "9042818580", status: "ONLINE" },
  { name: "SENTHIL", number: "9080191348", status: "ONLINE" },
  { name: "MR. CHIDAMBARAM", number: "9751894475", status: "ONLINE" },
];

const HomePage = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use your old, reliable native scroll tracking
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activePage = Math.round(el.scrollLeft / el.clientWidth);
    if (page !== activePage) {
      setPage(activePage);
    }
  }, [page]);

  return (
    <div className="flex flex-col h-full relative">
      <div className="px-4 pt-2">
        <DynamicIsland />
      </div>

      {/* Page indicators */}
      <div className="flex justify-center gap-1.5 py-2">
        {[0, 1].map((i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${
            page === i ? "bg-primary w-4" : "bg-muted-foreground/30"
          }`} />
        ))}
      </div>

      {/* NATIVE SWIPEABLE AREA (Restored from your old code) */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide relative"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* PAGE 1 — Main Home */}
        <div className="w-full h-full flex-shrink-0 snap-center px-4 pb-[80px] space-y-4 overflow-y-auto scrollbar-hide">
          <CountdownCard />

          {/* 2x2 Mechanical Switch Grid */}
          <div className="grid grid-cols-2 gap-3">
            {gridButtons.map(({ icon: Icon, label, path }) => (
              <motion.button
                key={label}
                onClick={() => navigate(path)}
                className="aspect-square rounded-xl border-2 border-border bg-card/50 flex flex-col items-center justify-center gap-2 relative overflow-hidden group"
                whileHover={{ scale: 1.03, borderColor: "hsl(var(--primary))" }}
                whileTap={{ scale: 0.95 }}
                style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(255,255,255,0.05)" }}
              >
                <div className="w-10 h-10 rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[8px] font-display tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
                  {label}
                </span>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/20" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/20" />
              </motion.button>
            ))}
          </div>

          {/* Explore Events ignition button */}
          <motion.button
            onClick={() => navigate("/events")}
            className="w-full py-4 rounded-xl border-2 border-primary/50 bg-primary/5 flex items-center justify-center gap-3 relative overflow-hidden"
            whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary))" }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <Rocket className="w-5 h-5 text-primary" />
            <span className="font-display text-xs tracking-[0.3em] text-primary font-bold">
              EXPLORE EVENTS
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          </motion.button>
        </div>

        {/* PAGE 2 — Schedule + Sponsor + Comms */}
        <div className="w-full h-full flex-shrink-0 snap-center px-4 pb-[80px] space-y-4 overflow-y-auto scrollbar-hide">
          
          {/* Quick Schedule Widget */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-display text-[9px] tracking-[0.3em] text-primary">QUICK SCHEDULE</span>
            </div>
            <div className="space-y-2">
              {[
                { time: "09:00", label: "INAUGURATION" },
                { time: "10:00", label: "TECH EVENTS" },
                { time: "14:00", label: "NON-TECH EVENTS" },
              ].map((item) => (
                <div key={item.time} className="flex items-center gap-3 px-3 py-2 rounded-lg border border-border/20 bg-muted/10">
                  <span className="font-mono text-[11px] text-primary font-bold">{item.time}</span>
                  <span className="font-display text-[9px] tracking-widest text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
            <motion.button
              onClick={() => navigate("/schedule")}
              className="mt-3 w-full flex items-center justify-center gap-1 text-[9px] font-display tracking-widest text-primary/70 hover:text-primary transition-colors"
              whileTap={{ scale: 0.97 }}
            >
              TAP TO VIEW FULL
              <ChevronRight className="w-3 h-3" />
            </motion.button>
          </div>

          {/* Title Sponsor Datapad */}
          <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-card/80 via-muted/20 to-card/80 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(var(--primary)) 10px, hsl(var(--primary)) 11px)`
            }} />
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-display text-[9px] tracking-[0.3em] text-primary">TITLE SPONSOR // DATAPAD</span>
            </div>
            <div className="flex flex-col items-center justify-center py-8 border border-border/30 rounded-lg bg-muted/10">
              <div className="w-20 h-20 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center mb-4">
                <span className="text-[10px] font-mono text-muted-foreground">LOGO</span>
              </div>
              <span className="font-display text-sm tracking-[0.3em] text-primary font-bold mb-1">SPONSOR NAME</span>
              <span className="text-[8px] font-mono text-muted-foreground">PLATINUM PARTNER // YANTRA 2K26</span>
            </div>
            <div className="mt-3 flex justify-between text-[7px] font-mono text-muted-foreground/50">
              <span>CLEARANCE: LEVEL-5</span>
              <span>STATUS: CONFIRMED</span>
            </div>
          </div>

          {/* Comms Array — Emergency Contacts */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-4 h-4 text-primary" />
              <span className="font-display text-[9px] tracking-[0.3em] text-primary">COMMS ARRAY</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-auto" />
            </div>
            <div className="space-y-2">
              {contacts.map((c, i) => (
                <motion.a
                  key={i}
                  href={`tel:${c.number}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/30 bg-muted/10 hover:border-primary/30 transition-colors group"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 rounded-full border border-border/50 bg-muted/30 flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <span className="font-display text-[10px] tracking-widest text-foreground block">{c.name}</span>
                    <span className="text-[9px] font-mono text-muted-foreground">{c.number}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[7px] font-mono text-green-500/70">{c.status}</span>
                  </div>
                </motion.a>
              ))}
            </div>
            <div className="mt-3 text-[7px] font-mono text-muted-foreground/40 text-center">
              EMERGENCY SWITCHBOARD // YANTRA OPS
            </div>
          </div>
          
        </div>
      </div>

      <BottomDock />
    </div>
  );
};

export default HomePage;
