import { Building2 } from "lucide-react";

const sponsors = [
  { name: "ACME INDUSTRIES", tier: "PLATINUM" },
  { name: "MECHWORKS LTD", tier: "GOLD" },
  { name: "STEELFORGE CO", tier: "GOLD" },
  { name: "AUTOBOT SYSTEMS", tier: "SILVER" },
  { name: "ENGITECH SOLUTIONS", tier: "SILVER" },
];

const tierColors: Record<string, string> = {
  PLATINUM: "text-primary",
  GOLD: "text-primary/80",
  SILVER: "text-muted-foreground",
};

const SponsorsContent = () => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <Building2 className="w-4 h-4 text-primary" />
      <span className="font-display text-xs tracking-[0.2em] text-primary font-bold">SPONSORS REGISTRY</span>
    </div>
    <div className="space-y-3">
      {sponsors.map((s) => (
        <div key={s.name} className="flex items-center justify-between p-3 mechanical-border rounded-lg">
          <span className="text-[11px] font-mono text-secondary-foreground">{s.name}</span>
          <span className={`text-[9px] font-display tracking-wider ${tierColors[s.tier]}`}>{s.tier}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SponsorsContent;
