import { useEffect, useState } from "react";

const PressureGauge = ({ size = 100, label = "PSI", className = "" }: { size?: number; label?: string; className?: string }) => {
  const [angle, setAngle] = useState(-40);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(-40 + Math.random() * 100 + Math.sin(Date.now() / 2000) * 20);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className}>
      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" fill="hsl(var(--navy-deep))" stroke="hsl(var(--gold-dim))" strokeWidth="3" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" />
      {/* Tick marks */}
      {Array.from({ length: 11 }).map((_, i) => {
        const a = -130 + i * 26;
        const rad = (a * Math.PI) / 180;
        const x1 = 60 + 42 * Math.cos(rad);
        const y1 = 60 + 42 * Math.sin(rad);
        const x2 = 60 + 48 * Math.cos(rad);
        const y2 = 60 + 48 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--primary) / 0.6)" strokeWidth={i % 5 === 0 ? 2 : 1} />;
      })}
      {/* Danger zone arc */}
      <path d="M 60 60" fill="none" />
      <circle cx="60" cy="60" r="35" fill="none" stroke="hsl(0 70% 40% / 0.3)" strokeWidth="6" strokeDasharray="30 200" strokeDashoffset="-95" />
      {/* Needle */}
      <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "60px 60px", transition: "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }}>
        <line x1="60" y1="60" x2="60" y2="18" stroke="hsl(0 80% 50%)" strokeWidth="2" />
        <circle cx="60" cy="60" r="4" fill="hsl(var(--primary))" />
      </g>
      {/* Center screw */}
      <circle cx="60" cy="60" r="3" fill="hsl(var(--gold-dim))" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
      {/* Label */}
      <text x="60" y="85" textAnchor="middle" fill="hsl(var(--primary) / 0.5)" fontSize="8" fontFamily="Orbitron">{label}</text>
      {/* Glass reflection */}
      <ellipse cx="48" cy="40" rx="18" ry="12" fill="hsl(var(--primary) / 0.04)" transform="rotate(-20 48 40)" />
    </svg>
  );
};

export default PressureGauge;
