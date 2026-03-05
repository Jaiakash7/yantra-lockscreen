import { ReactNode } from "react";
import StatusBar from "./StatusBar";

const PhoneFrame = ({ children }: { children: ReactNode }) => {
  return (
    // Outer Wrapper: Creates the blank dark space around the phone
    <div className="w-full h-[100dvh] bg-black flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      
      {/* Inner Phone Frame: The actual app constrained inside the padding */}
      <div className="w-full max-w-[400px] h-full max-h-[850px] relative rounded-[2.5rem] border-[6px] border-zinc-800 bg-background inner-screen-glow overflow-hidden carbon-bg flex flex-col mx-auto shadow-2xl">
        
        <StatusBar />
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
        
        {/* MSEC Watermark */}
        <div className="px-3 py-2 text-center pb-3">
          <p className="text-[7px] text-muted-foreground/40 font-mono tracking-wider leading-tight">
            PROPERTY OF MEENAKSHI SUNDARARAJAN ENGG COLLEGE // DEPT. OF MECH.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PhoneFrame;
