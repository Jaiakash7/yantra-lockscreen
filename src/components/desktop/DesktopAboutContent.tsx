import { Cpu, Users, Award, Building } from "lucide-react";
import yantraLogo from "@/assets/yantra-logo.jpeg";

const DesktopAboutContent = () => (
  <div className="p-6 overflow-y-auto scrollbar-hide h-full">
    <div className="max-w-lg mx-auto">
      <div className="flex justify-center mb-6">
        <img src={yantraLogo} alt="Yantra 2K26" className="w-28 h-28 rounded-full border-2 border-primary/30 object-cover" />
      </div>
      <div className="space-y-4">
        {[
          { icon: Cpu, title: "THE SYMPOSIUM", text: "Yantra 2K26 — flagship national-level technical symposium by MSEC Dept. of Mechanical Engineering." },
          { icon: Users, title: "PARTICIPATION", text: "Open to all engineering students across India. 9 curated events spanning technical and creative domains." },
          { icon: Building, title: "VENUE", text: "Meenakshi Sundararajan Engineering College, No.363, Arcot Road, Kodambakkam, Chennai - 600024." },
          { icon: Award, title: "LEGACY", text: "A tradition of engineering excellence, bringing together the brightest minds to compete and innovate." },
        ].map((item, i) => (
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
  </div>
);

export default DesktopAboutContent;
