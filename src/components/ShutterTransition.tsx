import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

const ShutterTransition = ({
  children,
  keyProp,
}: {
  children: ReactNode;
  keyProp: string;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyProp}
        className="h-full relative"
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Left shutter */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 bg-secondary z-50"
          variants={{
            initial: { x: "-100%" },
            animate: { x: "-100%", transition: { delay: 0.3, duration: 0.3 } },
            exit: { x: "0%", transition: { duration: 0.2 } },
          }}
        >
          <div className="h-full border-r border-primary/30" />
        </motion.div>
        {/* Right shutter */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 bg-secondary z-50"
          variants={{
            initial: { x: "100%" },
            animate: { x: "100%", transition: { delay: 0.3, duration: 0.3 } },
            exit: { x: "0%", transition: { duration: 0.2 } },
          }}
        >
          <div className="h-full border-l border-primary/30" />
        </motion.div>
        {/* Content */}
        <motion.div
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { delay: 0.2, duration: 0.3 } },
            exit: { opacity: 0, transition: { duration: 0.15 } },
          }}
          className="h-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShutterTransition;
