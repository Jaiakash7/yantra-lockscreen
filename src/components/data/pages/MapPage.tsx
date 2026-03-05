import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MapPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header with back arrow */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50">
        <motion.button
          onClick={() => navigate("/home")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
        </motion.button>
        <div>
          <h1 className="font-display text-xs tracking-[0.2em] text-primary font-bold">FACILITY MAP</h1>
          <span className="text-[8px] font-mono text-muted-foreground">MSEC CAMPUS // RADAR VIEW</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[7px] font-mono text-green-500/70">LIVE</span>
        </div>
      </div>

      {/* Google Maps iframe */}
      <div className="flex-1 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8252882765095!2d80.21847!3d13.0285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267100ff3e1d9%3A0x41d3e4c0e0f5dd47!2sMeenakshi%20Sundararajan%20Engineering%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.7)" }}
        />
        {/* Radar overlay */}
        <div className="absolute inset-0 pointer-events-none border border-primary/10">
          <div className="absolute top-2 left-2 text-[7px] font-mono text-primary/40">LAT: 13.0285°N</div>
          <div className="absolute top-2 right-2 text-[7px] font-mono text-primary/40">LON: 80.2210°E</div>
          <div className="absolute bottom-2 left-2 text-[7px] font-mono text-primary/40">ZOOM: 17x</div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
