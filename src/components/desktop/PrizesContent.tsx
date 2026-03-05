import { motion } from "framer-motion";
import { Trophy, Cpu, FileText, Wrench } from "lucide-react";

const categories = [
  {
    title: "CAD MODELING",
    subtitle: "FLAGSHIP EVENT",
    icon: Cpu,
    first: "₹1,500",
    second: "₹1,000",
    third: "₹750",
    glowBorder: "border-yellow-500/50 shadow-[0_0_20px_rgba(255,215,0,0.15)]",
  },
  {
    title: "PAPER PRESENTATION",
    subtitle: "SPECIALIZED EVENT",
    icon: FileText,
    first: "₹1,000",
    second: "₹750",
    third: "₹500",
    glowBorder: "border-blue-500/40",
  },
  {
    title: "STANDARD TECHNICAL",
    subtitle: "TRIVIA • ROCKETRY • MODEL MAKING",
    icon: Wrench,
    first: "₹750",
    second: "₹500",
    third: "₹250",
    glowBorder: "border-zinc-700",
  },
];

const DesktopPrizeContent = () => {
  return (
    <div className="h-full w-full overflow-y-auto scrollbar-hide p-8 lg:p-12 text-foreground">
      
      {/* Total Banner Header */}
      <motion.div 
        className="text-center mb-12 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(234,179,8,0.15)]">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <span className="font-mono text-5xl lg:text-7xl text-primary font-bold drop-shadow-[0_2px_10px_rgba(234,179,8,0.3)]">
          ₹13,000+
        </span>
        <p className="text-xs lg:text-sm font-mono tracking-[0.4em] text-muted-foreground mt-4">
          TOTAL PRIZE POOL // ALL EVENTS
        </p>
      </motion.div>

      {/* Cards Grid - Uses 3 columns on large desktop screens */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            className={`bg-zinc-900/60 backdrop-blur-xl rounded-2xl border p-8 flex flex-col h-full ${cat.glowBorder}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 100 }}
          >
            {/* Card header */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center shadow-inner">
                <cat.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <span className="font-display text-base tracking-widest text-foreground font-bold block mb-1">
                  {cat.title}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                  {cat.subtitle}
                </span>
              </div>
            </div>

            {/* 3-column podium */}
            <div className="grid grid-cols-3 gap-4 mt-auto">
              {[
                { emoji: "🥇", label: "GOLD", amount: cat.first, bg: "border-yellow-500/40 bg-yellow-500/10" },
                { emoji: "🥈", label: "SILVER", amount: cat.second, bg: "border-zinc-400/40 bg-zinc-400/10" },
                { emoji: "🥉", label: "BRONZE", amount: cat.third, bg: "border-orange-600/40 bg-orange-600/10" },
              ].map((p) => (
                <div key={p.label} className={`rounded-xl border p-4 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 ${p.bg}`}>
                  <span className="text-3xl block mb-2 drop-shadow-md">{p.emoji}</span>
                  <span className="text-[9px] font-mono tracking-widest text-muted-foreground block">
                    {p.label}
                  </span>
                  <span className="text-base lg:text-lg font-mono text-primary font-bold block mt-1">
                    {p.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional benefits */}
      <motion.div 
        className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-xs font-mono tracking-[0.3em] text-primary/80 font-semibold block mb-6 border-b border-zinc-800 pb-3">
          ADDITIONAL PERKS & BENEFITS //
        </span>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "Certificates for all participants", 
            "Merit certificates for top 3", 
            "Internship opportunities", 
            "Goodies & swag kits"
          ].map((t, i) => (
            <li key={i} className="text-xs font-mono text-muted-foreground flex items-center gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
              {t}
            </li>
          ))}
        </ul>
      </motion.div>

    </div>
  );
};

export default DesktopPrizeContent;