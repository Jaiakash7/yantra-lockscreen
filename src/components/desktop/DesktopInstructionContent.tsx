import { CheckCircle, Shield, AlertTriangle } from "lucide-react";

const instructions = [
  { icon: CheckCircle, title: "REGISTRATION", text: "All participants must register online. Spot registrations subject to availability." },
  { icon: Shield, title: "ID VERIFICATION", text: "Carry college ID at all times. No entry without valid identification." },
  { icon: AlertTriangle, title: "SAFETY PROTOCOL", text: "Follow safety guidelines in workshop areas. PPE provided where necessary." },
  { icon: CheckCircle, title: "TEAM FORMATION", text: "Teams per event specs. Cross-college teams allowed for select events." },
  { icon: Shield, title: "CODE OF CONDUCT", text: "Maintain decorum. Misconduct results in disqualification." },
];

const DesktopInstructionContent = () => (
  <div className="p-6 overflow-y-auto scrollbar-hide h-full">
    <div className="max-w-lg mx-auto space-y-4">
      {instructions.map((item, i) => (
        <div key={i} className="p-4 rounded-lg border border-border/50 bg-card/30">
          <div className="flex items-center gap-2 mb-2">
            <item.icon className="w-4 h-4 text-primary" />
            <span className="font-display text-[10px] tracking-widest text-primary">{item.title}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
);

export default DesktopInstructionContent;
