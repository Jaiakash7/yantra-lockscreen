import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Users, QrCode, Wrench, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomDock from "@/components/BottomDock";

interface EventSpec {
  title: string;
  code: string;
  duration: string;
  venue: string;
  teamSize: string;
  description: string;
}

const techEvents: EventSpec[] = [
  { title: "DynamiCAD", code: "TE-001", duration: "2 HRS", venue: "CAD LAB-1", teamSize: "INDIVIDUAL", description: "Flagship event — precision CAD modeling competition using SolidWorks/CATIA under pressure." },
  { title: "BRAIN SPARKS", code: "TE-002", duration: "1.5 HRS", venue: "SEMINAR HALL-B", teamSize: "TEAM OF 2", description: "Rapid-fire technical quiz spanning core mechanical engineering domains." },
  { title: "PAPER PRESENTATION", code: "TE-003", duration: "3 HRS", venue: "AUDITORIUM", teamSize: "TEAM OF 2", description: "Present your research paper on emerging mechanical engineering topics." },
  { title: "COMPONENT-MESHING", code: "TE-004", duration: "2 HRS", venue: "LAB-C3", teamSize: "TEAM OF 3", description: "Identify, assemble, and mesh mechanical components against the clock." },
  { title: "RETRO RACERS", code: "TE-005", duration: "2 HRS", venue: "OPEN GROUND", teamSize: "TEAM OF 4", description: "Design and race vintage-style mechanical vehicles on an obstacle course." },
];

const nonTechEvents: EventSpec[] = [
  { title: "CRIC FORGE", code: "NT-001", duration: "1 HR", venue: "SEMINAR HALL-A", teamSize: "INDIVIDUAL", description: "Forge facts from fiction — a quiz testing general knowledge and lateral thinking." },
  { title: "FRAME FLUX", code: "NT-002", duration: "2 HRS", venue: "MEDIA LAB", teamSize: "TEAM OF 3", description: "Short film / reel making competition with a surprise theme reveal." },
  { title: "OTAKU CLASH", code: "NT-003", duration: "2 HRS", venue: "MAIN HALL", teamSize: "INDIVIDUAL", description: "Anime-inspired cosplay and trivia — showcase your otaku spirit." },
  { title: "RAPID RUMBLE", code: "NT-004", duration: "1.5 HRS", venue: "ARENA", teamSize: "TEAM OF 4", description: "Fast-paced multi-round mini-games combining speed, strategy, and teamwork." },
];

const SpecCard = ({ event, index }: { event: EventSpec; index: number }) => (
  <motion.div
    className="spec-sheet rounded-r-lg p-4 relative overflow-hidden"
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 * index, type: "spring", stiffness: 300, damping: 25 }}
    whileHover={{ x: 4 }}
  >
    <div className="absolute top-0 right-0 w-6 h-6">
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-background border-l-[24px] border-l-transparent" />
    </div>

    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="font-display text-xs tracking-wider text-primary font-bold">{event.title}</h3>
        <span className="text-[8px] font-mono text-muted-foreground">REF: {event.code}</span>
      </div>
      <QrCode className="w-6 h-6 text-muted-foreground/30" />
    </div>

    <p className="text-[10px] font-body text-secondary-foreground/70 mb-3 leading-relaxed">{event.description}</p>

    <div className="border-t border-border/50 pt-2">
      <span className="text-[7px] font-display tracking-[0.3em] text-muted-foreground mb-2 block">DESIGN CONSTRAINTS</span>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-primary/60" />
          <span className="text-[9px] font-mono text-secondary-foreground/80">{event.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-primary/60" />
          <span className="text-[9px] font-mono text-secondary-foreground/80">{event.venue}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3 text-primary/60" />
          <span className="text-[9px] font-mono text-secondary-foreground/80">{event.teamSize}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const EventsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 p-4 border-b border-border/50">
          <motion.button onClick={() => navigate("/home")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-primary" />
          </motion.button>
          <div>
            <h1 className="font-display text-xs tracking-[0.2em] text-primary font-bold">EVENT MODULES</h1>
            <span className="text-[8px] font-mono text-muted-foreground">9 MODULES LOADED</span>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-3.5 h-3.5 text-primary" />
              <span className="text-[9px] font-display tracking-[0.3em] text-primary">TECHNICAL EVENTS</span>
              <div className="h-px flex-1 bg-border" />
              <span className="text-[8px] font-mono text-muted-foreground">5 MODULES</span>
            </div>
            <div className="space-y-3">
              {techEvents.map((e, i) => <SpecCard key={e.code} event={e} index={i} />)}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gamepad2 className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[9px] font-display tracking-[0.3em] text-orange-400">NON-TECHNICAL EVENTS</span>
              <div className="h-px flex-1 bg-border" />
              <span className="text-[8px] font-mono text-muted-foreground">4 MODULES</span>
            </div>
            <div className="space-y-3">
              {nonTechEvents.map((e, i) => <SpecCard key={e.code} event={e} index={i + 5} />)}
            </div>
          </div>
        </div>
      </div>
      <BottomDock />
    </div>
  );
};

export default EventsPage;
