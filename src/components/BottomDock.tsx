import { motion } from "framer-motion";
import { Home, Calendar, Map, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const dockItems = [
  { icon: Home, label: "HOME", path: "/home", appId: "home" },
  { icon: Calendar, label: "EVENTS", path: "/events", appId: "events" },
  { icon: Map, label: "MAP", path: "/map", appId: "map" },
  { icon: Clock, label: "SCHEDULE", path: "/schedule", appId: "schedule" },
];

const BottomDock = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string, appId: string) => {
    // If we are on the Desktop screen, tell the DesktopOS to open the window!
    if (location.pathname === "/home" || location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("open-desktop-app", { detail: appId }));
    } else {
      // If we are on mobile, route normally
      navigate(path);
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-[9999] flex items-center justify-around px-4 py-3 border-t border-border/50 bg-oil/80 backdrop-blur-sm">
      {dockItems.map(({ icon: Icon, label, path, appId }) => {
        const active = location.pathname.startsWith(path);
        return (
          <motion.button
            key={path}
            onClick={() => handleNav(path, appId)}
            className="flex flex-col items-center gap-1.5 relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
                active
                  ? "border-primary bg-primary/10 gold-glow"
                  : "border-border/50 bg-muted/30 hover:bg-muted/50"
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              />
            </div>
            <span
              className={`text-[10px] font-display tracking-widest transition-colors ${
                active ? "text-primary font-semibold" : "text-muted-foreground/80"
              }`}
            >
              {label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default BottomDock;