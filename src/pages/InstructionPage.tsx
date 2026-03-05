import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, CheckCircle, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomDock from "@/components/BottomDock";

const instructions = [
  { icon: CheckCircle, title: "REGISTRATION", text: "All participants must register online before the event. Spot registrations are subject to availability." },
  { icon: Shield, title: "ID VERIFICATION", text: "Carry your college ID card at all times. Entry will not be permitted without valid identification." },
  { icon: AlertTriangle, title: "SAFETY PROTOCOL", text: "Follow all safety guidelines in workshop areas. PPE will be provided where necessary." },
  { icon: CheckCircle, title: "TEAM FORMATION", text: "Teams must be formed as per event specifications. Cross-college teams are allowed for select events." },
  { icon: Shield, title: "CODE OF CONDUCT", text: "Maintain decorum throughout the event. Any misconduct will result in immediate disqualification." },
];

const InstructionPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
        <div className="flex items-center gap-3 mb-4">
          <motion.button onClick={() => navigate("/home")} whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-primary" />
          </motion.button>
          <h1 className="font-display text-xs tracking-[0.2em] text-primary font-bold">INSTRUCTIONS</h1>
        </div>

        <div className="space-y-3">
          {instructions.map((item, i) => (
            <motion.div key={i} className="p-3 rounded-lg border border-border/50 bg-card/50"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-4 h-4 text-primary" />
                <span className="font-display text-[10px] tracking-widest text-primary">{item.title}</span>
              </div>
              <p className="text-[10px] font-body text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <BottomDock />
    </div>
  );
};

export default InstructionPage;
