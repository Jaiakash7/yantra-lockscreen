import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PhoneFrame from "@/components/PhoneFrame";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import EventsHub from "./pages/EventsHub";
import EventDetails from "./pages/EventDetails";
import MapPage from "./pages/MapPage";
import SchedulePage from "./pages/SchedulePage";
import InstructionPage from "./pages/InstructionPage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import PrizePage from "./pages/PrizePage";
import PrizesPage from "./pages/PrizesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Framed = ({ children }: { children: React.ReactNode }) => (
  <PhoneFrame>{children}</PhoneFrame>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Framed><HomePage /></Framed>} />
          <Route path="/events" element={<Framed><EventsHub /></Framed>} />
          <Route path="/events/:id" element={<Framed><EventDetails /></Framed>} />
          <Route path="/map" element={<Framed><MapPage /></Framed>} />
          <Route path="/schedule" element={<Framed><SchedulePage /></Framed>} />
          <Route path="/instruction" element={<Framed><InstructionPage /></Framed>} />
          <Route path="/about" element={<Framed><AboutPage /></Framed>} />
          <Route path="/gallery" element={<Framed><GalleryPage /></Framed>} />
          <Route path="/prize" element={<Framed><PrizePage /></Framed>} />
          <Route path="/prizes" element={<Framed><PrizesPage /></Framed>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
