import { Trophy, Medal, Award } from "lucide-react";

const prizes = [
  { place: "1ST", amount: "₹10,000", icon: Trophy, accent: "border-primary/30 bg-primary/10 text-primary" },
  { place: "2ND", amount: "₹6,000", icon: Medal, accent: "border-border/50 bg-card/50 text-muted-foreground" },
  { place: "3RD", amount: "₹3,000", icon: Award, accent: "border-orange-400/30 bg-orange-400/10 text-orange-400" },
];

const DesktopPrizeContent = () => (
  <div className="p-6 overflow-y-auto scrollbar-hide h-full">
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <span className="font-mono text-4xl text-primary font-bold">₹50,000+</span>
        <p className="text-[9px] font-display tracking-widest text-muted-foreground mt-1">TOTAL PRIZE POOL</p>
      </div>
      <div className="space-y-4 mb-6">
        {prizes.map((p, i) => (
          <div key={i} className={`p-5 rounded-lg border ${p.accent} flex items-center gap-5`}>
            <p.icon className="w-10 h-10" />
            <div>
              <span className="font-display text-[10px] tracking-widest block">{p.place} PLACE</span>
              <span className="font-mono text-2xl font-bold">{p.amount}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-lg border border-border/50 bg-card/30">
        <span className="text-[8px] font-display tracking-widest text-muted-foreground block mb-2">ADDITIONAL BENEFITS</span>
        <ul className="space-y-1.5">
          {["Certificates for all participants", "Merit certificates for top 3", "Internship opportunities", "Goodies & swag kits"].map((t, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary" />{t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default DesktopPrizeContent;
