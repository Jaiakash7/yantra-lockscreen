import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomDock from "@/components/BottomDock";

const prizes = [
  { place: "1ST", amount: "₹10,000", icon: Trophy, accent: "text-primary border-primary/30 bg-primary/10" },
  { place: "2ND", amount: "₹6,000", icon: Medal, accent: "text-muted-foreground border-border/50 bg-card/50" },
  { place: "3RD", amount: "₹3,000", icon: Award, accent: "text-orange-400 border-orange-400/30 bg-orange-400/10" },
];

const PrizePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
        <div className="flex items-center gap-3 mb-4">
          <motion.button onClick={() => navigate("/home")} whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-primary" />
          </motion.button>
          <h1 className="font-display text-xs tracking-[0.2em] text-primary font-bold">PRIZE POOL</h1>
        </div>

        <div className="text-center mb-6">
          <span className="font-mono text-3xl text-primary font-bold">₹50,000+</span>
          <p className="text-[8px] font-display tracking-widest text-muted-foreground mt-1">TOTAL PRIZE POOL</p>
        </div>

        <div className="space-y-3 mb-6">
          {prizes.map((p, i) => (
            <motion.div key={i} className={`p-4 rounded-lg border ${p.accent} flex items-center gap-4`}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}>
              <p.icon className="w-8 h-8" />
              <div>
                <span className="font-display text-[10px] tracking-widest block">{p.place} PLACE</span>
                <span className="font-mono text-lg font-bold">{p.amount}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-3 rounded-lg border border-border/50 bg-card/50">
          <span className="text-[8px] font-display tracking-widest text-muted-foreground block mb-2">ADDITIONAL BENEFITS</span>
          <ul className="space-y-1">
            {["Certificates for all participants", "Merit certificates for top 3", "Internship opportunities", "Goodies & swag kits"].map((t, i) => (
              <li key={i} className="text-[10px] text-muted-foreground flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BottomDock />
    </div>
  );
};

export default PrizePage;
