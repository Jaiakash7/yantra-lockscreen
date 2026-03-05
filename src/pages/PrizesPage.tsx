import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Cpu, FileText, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomDock from "@/components/BottomDock";

const categories = [
  {
    title: "CAD MODELING",
    subtitle: "FLAGSHIP EVENT",
    icon: Cpu,
    first: "₹1,500",
    second: "₹1,000",
    third: "₹750",
    glowBorder: "border-yellow-500/50 shadow-[0_0_15px_rgba(255,215,0,0.15)]",
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

const PrizesPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center gap-3">
        <motion.button
          onClick={() => navigate(-1)}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
        </motion.button>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary" />
          <h1 className="font-mono text-xs tracking-[0.2em] text-primary font-bold">PRIZE_POOL.DWG</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 pb-[90px]">
        {/* Total banner */}
        <div className="text-center mb-6">
          <span className="font-mono text-3xl lg:text-4xl text-primary font-bold">₹13,000+</span>
          <p className="text-[8px] font-mono tracking-[0.3em] text-muted-foreground mt-1">TOTAL PRIZE POOL // ALL EVENTS</p>
        </div>

        {/* Cards */}
        <div className="flex flex-col space-y-4 lg:grid lg:grid-cols-2 lg:space-y-0 lg:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className={`bg-zinc-900/50 backdrop-blur-md rounded-2xl border p-6 ${cat.glowBorder}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800/60 border border-zinc-700 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-mono text-[11px] tracking-wider text-foreground font-bold block">{cat.title}</span>
                  <span className="font-mono text-[8px] tracking-widest text-muted-foreground">{cat.subtitle}</span>
                </div>
              </div>

              {/* 3-column podium */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { emoji: "🥇", label: "GOLD", amount: cat.first, bg: "border-yellow-500/30 bg-yellow-500/5" },
                  { emoji: "🥈", label: "SILVER", amount: cat.second, bg: "border-zinc-400/30 bg-zinc-400/5" },
                  { emoji: "🥉", label: "BRONZE", amount: cat.third, bg: "border-orange-600/30 bg-orange-600/5" },
                ].map((p) => (
                  <div key={p.label} className={`rounded-lg border p-3 text-center ${p.bg}`}>
                    <span className="text-lg block">{p.emoji}</span>
                    <span className="text-[7px] font-mono tracking-wider text-muted-foreground block mt-1">{p.label}</span>
                    <span className="text-sm font-mono text-primary font-bold block mt-1">{p.amount}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional benefits */}
        <div className="mt-6 p-4 rounded-xl border border-zinc-800 bg-zinc-900/30">
          <span className="text-[8px] font-mono tracking-[0.3em] text-muted-foreground block mb-3">ADDITIONAL BENEFITS</span>
          <ul className="space-y-2">
            {["Certificates for all participants", "Merit certificates for top 3", "Internship opportunities", "Goodies & swag kits"].map((t, i) => (
              <li key={i} className="text-[10px] font-mono text-muted-foreground flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <BottomDock />
    </motion.div>
  );
};

export default PrizesPage;
