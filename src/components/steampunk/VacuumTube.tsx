import { useEffect, useState } from "react";

const VacuumTube = ({ size = 60, className = "" }: { size?: number; className?: string }) => {
  const [flicker, setFlicker] = useState(0.6);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(0.4 + Math.random() * 0.6);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const h = size;
  const w = size * 0.45;

  return (
    <svg width={w} height={h} viewBox="0 0 36 80" className={className}>
      {/* Tube glass */}
      <path d="M8 15 Q8 5 18 5 Q28 5 28 15 L28 55 Q28 60 24 62 L12 62 Q8 60 8 55 Z" fill="hsl(var(--navy-deep))" stroke="hsl(var(--gold-dim))" strokeWidth="1" />
      {/* Inner glow */}
      <ellipse cx="18" cy="35" rx="7" ry="18" fill={`hsl(30 90% 50% / ${flicker * 0.3})`} />
      <ellipse cx="18" cy="35" rx="4" ry="12" fill={`hsl(35 100% 60% / ${flicker * 0.5})`} />
      <ellipse cx="18" cy="32" rx="2" ry="6" fill={`hsl(40 100% 70% / ${flicker * 0.8})`} />
      {/* Filament */}
      <path d="M14 50 L14 22 Q18 18 22 22 L22 50" fill="none" stroke={`hsl(var(--primary) / ${flicker * 0.6})`} strokeWidth="0.8" />
      {/* Base */}
      <rect x="10" y="62" width="16" height="8" rx="1" fill="hsl(var(--gold-dim))" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.5" />
      <rect x="12" y="70" width="12" height="6" rx="1" fill="hsl(220 20% 15%)" stroke="hsl(var(--gold-dim))" strokeWidth="0.5" />
      {/* Pins */}
      <line x1="14" y1="76" x2="14" y2="80" stroke="hsl(var(--gold-dim))" strokeWidth="1.5" />
      <line x1="18" y1="76" x2="18" y2="80" stroke="hsl(var(--gold-dim))" strokeWidth="1.5" />
      <line x1="22" y1="76" x2="22" y2="80" stroke="hsl(var(--gold-dim))" strokeWidth="1.5" />
    </svg>
  );
};

export default VacuumTube;
