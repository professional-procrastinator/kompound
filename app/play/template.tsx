// app/play/template.tsx
"use client";

import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    // Keep overflow-hidden here so the scaling doesn't cause weird scrollbars
    <div className="min-h-screen w-full bg-[--background] overflow-hidden">
      <motion.div
        className="min-h-screen w-full flex flex-col"
        // Starts far away (0.8 scale), invisible, and blurry
        initial={{ opacity: 0, scale: 0.8, filter: "blur(15px)" }}
        // Zooms into its normal size and snaps into focus
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.8,
          ease: "easeOut", // easeOut makes it feel like the camera is slowing down to a stop
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
