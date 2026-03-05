const Gear = ({ size = 80, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
    <path
      d="M50 15 L55 5 L60 15 L70 10 L68 22 L78 20 L73 30 L85 32 L78 40 L90 45 L80 50 L90 55 L78 60 L85 68 L73 70 L78 80 L68 78 L70 90 L60 85 L55 95 L50 85 L45 95 L40 85 L30 90 L32 78 L22 80 L27 70 L15 68 L22 60 L10 55 L20 50 L10 45 L22 40 L15 32 L27 30 L22 20 L32 22 L30 10 L40 15 L45 5 L50 15Z"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      fill="hsl(var(--primary) / 0.08)"
    />
    <circle cx="50" cy="50" r="18" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="hsl(var(--navy-deep))" />
    <circle cx="50" cy="50" r="8" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" fill="none" />
  </svg>
);

export default Gear;
