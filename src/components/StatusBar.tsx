import { motion } from "framer-motion";

const BatteryIndicator = ({ level = 87 }: { level?: number }) => (
  <div className="flex items-center gap-1">
    <div className="relative w-6 h-3 border border-primary/60 rounded-sm overflow-hidden">
      <motion.div
        className="h-full gold-gradient"
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
    <span className="text-[8px] text-primary/70 font-display">{level}%</span>
  </div>
);

const SignalBars = () => (
  <div className="flex items-end gap-[2px] h-3">
    {[3, 5, 7, 9, 11].map((h, i) => (
      <div
        key={i}
        className="w-[2px] rounded-sm bg-primary/80"
        style={{ height: `${h}px` }}
      />
    ))}
    <span className="text-[8px] text-primary/60 ml-1 font-display">5G</span>
  </div>
);

const StatusBar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-1.5 text-primary/70">
      <span className="text-[9px] font-display tracking-widest">MSEC_NETWORK</span>
      <div className="flex items-center gap-3">
        <SignalBars />
        <BatteryIndicator />
      </div>
    </div>
  );
};

export default StatusBar;
