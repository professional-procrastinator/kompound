"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // This key is the magic. When it changes, the animation triggers.
        initial={{ y: "-100vh" }} // Start above the screen
        animate={{ y: 0 }} // Rest in the center
        exit={{ y: "100vh" }} // Slide out down the bottom
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1], // Matches your exact cubic-bezier from the CSS!
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
