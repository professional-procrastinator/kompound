"use client";

import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[--background] overflow-hidden">
      <motion.div
        className="min-h-screen w-full flex flex-col"
        initial={{ opacity: 0, scale: 0.8, filter: "blur(15px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
