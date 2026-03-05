import { ImageIcon } from "lucide-react";

const galleryItems = [
  { label: "INAUGURATION 2K25" },
  { label: "ROBO CLASH ARENA" },
  { label: "CAD WARFARE LAB" },
  { label: "WORKSHOP SESSIONS" },
  { label: "PRIZE CEREMONY" },
  { label: "CAMPUS AERIAL" },
  { label: "TEAM PHOTOS" },
  { label: "BEHIND THE SCENES" },
];

const DesktopGalleryContent = () => (
  <div className="p-6 overflow-y-auto scrollbar-hide h-full">
    <div className="grid grid-cols-4 gap-4">
      {galleryItems.map((item, i) => (
        <div key={i} className="aspect-square rounded-lg border border-border/50 bg-card/30 hover:border-primary/30 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer">
          <ImageIcon className="w-10 h-10 text-muted-foreground/30" />
          <span className="text-[8px] font-display tracking-widest text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default DesktopGalleryContent;
