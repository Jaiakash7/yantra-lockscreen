import { useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import LockScreen from "@/components/LockScreen";
import DesktopLockScreen from "@/components/desktop/DesktopLockScreen";
import DesktopOS from "@/components/desktop/DesktopOS";
import { useNavigate } from "react-router-dom";
import { useIsDesktop } from "@/hooks/use-desktop";

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const handleMobileUnlock = () => {
    setUnlocked(true);
    setTimeout(() => navigate("/home"), 400);
  };

  // Desktop path
  if (isDesktop) {
    if (!unlocked) {
      return <DesktopLockScreen onBoot={() => setUnlocked(true)} />;
    }
    return <DesktopOS />;
  }

  // Mobile path
  if (unlocked) {
    return (
      <PhoneFrame>
        <div className="flex items-center justify-center h-full">
          <span className="font-display text-xs tracking-widest text-primary animate-pulse">
            INITIALIZING...
          </span>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <LockScreen onUnlock={handleMobileUnlock} />
    </PhoneFrame>
  );
};

export default Index;
