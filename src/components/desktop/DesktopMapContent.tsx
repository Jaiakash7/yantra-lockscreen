import { motion } from "framer-motion";
import { Radio, MapPin } from "lucide-react";

const DesktopMapContent = () => (
  <div className="h-full flex flex-col">
    <div className="flex items-center gap-2 p-4 border-b border-border/50">
      <Radio className="w-4 h-4 text-primary animate-pulse" />
      <span className="font-display text-[10px] tracking-widest text-primary">TRACKING TARGET</span>
      <span className="font-mono text-[8px] text-muted-foreground ml-auto">13.0285°N, 80.2210°E</span>
    </div>
    <div className="flex-1 relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8!2d80.221!3d13.0285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526787b6a60457%3A0xbcfae41bdd520e15!2sMeenakshi%20Sundararajan%20Engineering%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        className="w-full h-full border-none"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {/* Radar overlay */}
      <div className="absolute inset-0 pointer-events-none border-2 border-primary/10 rounded-sm">
        <div className="absolute top-2 left-2 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-primary" />
          <span className="text-[7px] font-mono text-primary bg-background/80 px-1 rounded">MSEC CAMPUS</span>
        </div>
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40" />
      </div>
    </div>
  </div>
);

export default DesktopMapContent;
