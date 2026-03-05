import { motion } from "framer-motion";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomDock from "@/components/BottomDock";

const galleryItems = [
  { label: "INAUGURATION 2K25", color: "from-primary/20 to-primary/5" },
  { label: "ROBO CLASH ARENA", color: "from-orange-500/20 to-orange-500/5" },
  { label: "CAD WARFARE LAB", color: "from-blue-500/20 to-blue-500/5" },
  { label: "WORKSHOP SESSIONS", color: "from-green-500/20 to-green-500/5" },
  { label: "PRIZE CEREMONY", color: "from-primary/20 to-primary/5" },
  { label: "CAMPUS AERIAL", color: "from-purple-500/20 to-purple-500/5" },
];

const GalleryPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
        <div className="flex items-center gap-3 mb-4">
          <motion.button onClick={() => navigate("/home")} whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-primary" />
          </motion.button>
          <h1 className="font-display text-xs tracking-[0.2em] text-primary font-bold">GALLERY</h1>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {galleryItems.map((item, i) => (
            <motion.div key={i}
              className={`aspect-square rounded-lg border border-border/50 bg-gradient-to-br ${item.color} flex flex-col items-center justify-center gap-2`}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
              <span className="text-[7px] font-display tracking-widest text-muted-foreground text-center px-2">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <BottomDock />
    </div>
  );
};

export default GalleryPage;
