import { motion } from "framer-motion";
import { X, Minus } from "lucide-react";
import { ReactNode, useRef, useState } from "react";

interface Props {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  defaultPosition?: { x: number; y: number };
  width?: number | string;
  height?: number | string;
}

const AppWindow = ({ title, children, onClose, onFocus, zIndex, defaultPosition, width, height }: Props) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [minimized, setMinimized] = useState(false);
  const isMapWindow = title.includes("MAP");

  return (
    <>
      {/* Full-screen drag constraint */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: zIndex - 1 }} />
      <motion.div
        className="fixed pointer-events-auto"
        style={{ zIndex, top: defaultPosition?.y ?? 80, left: defaultPosition?.x ?? 200 }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: minimized ? 0.6 : 1, y: minimized ? 400 : 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        onPointerDown={onFocus}
      >
        <div
          // Added 'flex flex-col' so content stays strictly within the height limit
          className={`${isMapWindow ? "w-[70vw] h-[75vh]" : "flex flex-col"} rounded-xl overflow-hidden border border-border/50 bg-card/95 backdrop-blur-md shadow-2xl`}
          style={isMapWindow ? undefined : { 
            // Defaulting to 65% of screen width (65vw) and height (65vh)
            width: width ? (typeof width === 'number' ? `${width}px` : width) : "69vw",
            height: height ? (typeof height === 'number' ? `${height}px` : height) : "72vh" 
          }}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border/50 cursor-grab active:cursor-grabbing shrink-0">
            <span className="font-display text-[10px] tracking-[0.2em] text-primary/80">{title}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setMinimized(!minimized); }}
                className="w-5 h-5 rounded-full bg-muted flex items-center justify-center hover:bg-accent/50 transition-colors"
              >
                <Minus className="w-3 h-3 text-muted-foreground" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center hover:bg-destructive/40 transition-colors"
              >
                <X className="w-3 h-3 text-destructive" />
              </button>
            </div>
          </div>
          {/* Content */}
          {!minimized && (
            <div
              // Added 'flex-1' to take up remaining space and allow internal scrolling
              className={isMapWindow ? "overflow-hidden h-[560px]" : "overflow-y-auto scrollbar-hide flex-1"}
            >
              {children}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default AppWindow;