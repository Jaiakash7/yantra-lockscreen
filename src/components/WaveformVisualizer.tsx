import { motion } from "framer-motion";

const WaveformVisualizer = () => {
  const bars = 24;
  return (
    <div className="flex items-center gap-[1px] h-4 px-4">
      <span className="text-[6px] font-display tracking-widest text-muted-foreground/40 mr-2">
        ACOUSTIC_FEEDBACK
      </span>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] bg-primary/30 rounded-full"
          animate={{
            height: [3, Math.random() * 12 + 3, 3],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default WaveformVisualizer;
