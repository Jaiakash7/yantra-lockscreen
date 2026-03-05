export type EventType = 'technical' | 'non-technical';
export type EventCategory = 'flagship' | 'special' | 'standard' | 'none';

export interface EventData {
  id: string;
  title: string;
  type: EventType;
  category: EventCategory;
  icon: string; // Lucide icon name
  duration: string;
  venue: string;
  teamSize: string;
  description: string;
  guidelines: string[];
}

export const eventsData: EventData[] = [
  {
    id: "cad-modeling",
    title: "CAD MODELING WITH AUTODESK FUSION 360",
    type: "technical",
    category: "flagship",
    icon: "Cpu",
    duration: "2 HRS",
    venue: "CAD LAB-1",
    teamSize: "INDIVIDUAL",
    description: "Flagship event — precision CAD modeling competition using Autodesk Fusion 360 under timed pressure. Demonstrate your mastery of parametric design, assemblies, and rendering.",
    guidelines: [
      "Participants must bring their own laptops with Fusion 360 pre-installed.",
      "Internet access will NOT be provided during the event.",
      "All models must be original work created during the event window.",
      "Judging criteria: Accuracy (40%), Complexity (30%), Aesthetics (20%), Time (10%).",
      "Any form of pre-made templates or copied geometry leads to immediate disqualification.",
    ],
  },
  {
    id: "paper-presentation",
    title: "PAPER PRESENTATION",
    type: "technical",
    category: "special",
    icon: "FileText",
    duration: "3 HRS",
    venue: "AUDITORIUM",
    teamSize: "TEAM OF 2",
    description: "Present your research paper on emerging mechanical engineering topics. Showcase innovative ideas and technical depth before an expert panel.",
    guidelines: [
      "Papers must be original and not previously published.",
      "Presentation duration: 8 minutes + 2 minutes Q&A.",
      "Submit abstract (max 300 words) before the event.",
      "Use IEEE format for paper submissions.",
      "Topics: Robotics, Thermal Systems, Manufacturing, Materials Science, or Sustainable Engineering.",
    ],
  },
  {
    id: "stress-analysis",
    title: "STRESS ANALYSIS USING ANSYS",
    type: "technical",
    category: "standard",
    icon: "Activity",
    duration: "2 HRS",
    venue: "SIM LAB-2",
    teamSize: "INDIVIDUAL",
    description: "Perform FEA-based stress analysis on given mechanical components using ANSYS Workbench. Identify failure points and optimize geometry.",
    guidelines: [
      "ANSYS Student version will be provided on lab systems.",
      "Participants will receive a problem statement at the start.",
      "Meshing quality and convergence study carry significant marks.",
      "Results must be documented in a standard report template.",
      "No external USB drives or internet access permitted.",
    ],
  },
  {
    id: "split-muff-coupling",
    title: "SPLIT MUFF COUPLING ASSEMBLY",
    type: "technical",
    category: "standard",
    icon: "Wrench",
    duration: "2 HRS",
    venue: "LAB-C3",
    teamSize: "TEAM OF 3",
    description: "Identify, assemble, and mesh mechanical coupling components against the clock. Test your hands-on mechanical aptitude.",
    guidelines: [
      "All tools and components will be provided.",
      "Teams must complete assembly within the allotted time.",
      "Judging: Assembly accuracy (50%), Speed (30%), Teamwork (20%).",
      "Safety gear must be worn at all times.",
      "Damaged components due to negligence will incur penalties.",
    ],
  },
  {
    id: "retro-racers",
    title: "RETRO RACERS",
    type: "technical",
    category: "standard",
    icon: "Car",
    duration: "2 HRS",
    venue: "OPEN GROUND",
    teamSize: "TEAM OF 4",
    description: "Design and race vintage-style mechanical vehicles on an obstacle course. Engineering meets speed in this adrenaline-fueled competition.",
    guidelines: [
      "Vehicles must be human-powered or gravity-driven only.",
      "Maximum dimensions: 1.5m x 0.8m x 0.8m.",
      "All vehicles undergo safety inspection before racing.",
      "Track includes ramps, slalom, and straightaway sections.",
      "Winning criteria: Fastest time + style points.",
    ],
  },
  {
    id: "free-fire",
    title: "FREE FIRE E-SPORTS TOURNAMENT",
    type: "non-technical",
    category: "none",
    icon: "Gamepad2",
    duration: "3 HRS",
    venue: "ESPORTS ARENA",
    teamSize: "TEAM OF 4",
    description: "Battle royale showdown — squad up and compete in a multi-round Free Fire tournament. Last team standing takes it all.",
    guidelines: [
      "Players must use their own mobile devices.",
      "Custom rooms will be created by organizers.",
      "No emulators or external controllers allowed.",
      "Scoring: Kill points + placement points per round.",
      "Fair play policy — any hacking leads to instant ban.",
    ],
  },
  {
    id: "treasure-hunt",
    title: "TREASURE HUNT",
    type: "non-technical",
    category: "none",
    icon: "MapPin",
    duration: "2 HRS",
    venue: "CAMPUS WIDE",
    teamSize: "TEAM OF 4",
    description: "Decode cryptic clues scattered across campus to find the hidden treasure. Combines puzzle-solving, teamwork, and speed.",
    guidelines: [
      "Teams receive the first clue at the starting point.",
      "Each clue leads to the next location on campus.",
      "No vehicles or running inside buildings.",
      "All team members must be present at each checkpoint.",
      "First team to find the treasure wins.",
    ],
  },
  {
    id: "frame-flux",
    title: "FRAME FLUX",
    type: "non-technical",
    category: "none",
    icon: "Film",
    duration: "2 HRS",
    venue: "MEDIA LAB",
    teamSize: "TEAM OF 3",
    description: "Short film / reel making competition with a surprise theme reveal. Capture, edit, and deliver a compelling visual story.",
    guidelines: [
      "Theme will be revealed 30 minutes before filming starts.",
      "Maximum reel duration: 90 seconds.",
      "Any smartphone or camera may be used for filming.",
      "Basic editing tools will be available on lab systems.",
      "Content must be original and campus-appropriate.",
    ],
  },
  {
    id: "otaku-style",
    title: "OTAKU STYLE",
    type: "non-technical",
    category: "none",
    icon: "Sparkles",
    duration: "2 HRS",
    venue: "MAIN HALL",
    teamSize: "INDIVIDUAL",
    description: "Anime-inspired cosplay and trivia showcase — dress as your favorite character and prove your otaku knowledge.",
    guidelines: [
      "Cosplay must be self-made or significantly customized.",
      "Props must comply with campus safety regulations.",
      "Trivia round covers anime, manga, and Japanese culture.",
      "Judging: Costume accuracy (40%), Presentation (30%), Trivia score (30%).",
      "Participants get 3 minutes for their stage presentation.",
    ],
  },
];

export const contacts = [
  { name: "SYED NAYEM", phone: "9042818580" },
  { name: "SENTHIL", phone: "9080191348" },
  { name: "MR. CHIDAMBARAM", phone: "9751894475" },
];

export const prizeMap: Record<string, { first: string; second: string; third: string }> = {
  flagship: { first: "₹1,500", second: "₹1,000", third: "₹750" },
  special: { first: "₹1,000", second: "₹750", third: "₹500" },
  standard: { first: "₹750", second: "₹500", third: "₹250" },
};

export const techEvents = eventsData.filter((e) => e.type === "technical");
export const nonTechEvents = eventsData.filter((e) => e.type === "non-technical");
