"use client";
import Button from "@/components/button/button";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingContent() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const delayClick = () => {
    setIsExiting(true);

    setTimeout(() => {
      router.push("/play");
    }, 100);
  };
  return (
    <motion.div
      animate={{
        opacity: isExiting ? 0 : 1,
        filter: isExiting ? "blur(10px)" : "blur(0px)",
        y: isExiting ? 40 : 0,
      }}
      transition={{ duration: 0.3, damping: 10 }}
      className="flex flex-col flex-1 items-center justify-center font-sans"
    >
      <div className="flex flex-row items-center w-full px-[20%]">
        <div className="flex flex-col gap-4 w-1/2">
          <div className="text-6xl text-(--foreground) font-extrabold">
            Kompound
          </div>
          <div className="text-gray-700 w-5/6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 w-1/2">
          <Button primary={true} click={delayClick}>
            <div>Play Today's Kompound</div>
          </Button>
          <div className="flex flex-row gap-[5]">
            <div className="text-gray-600">or learn</div>
            <div className="hover:underline hover:cursor-pointer">
              {" "}
              how to play
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
