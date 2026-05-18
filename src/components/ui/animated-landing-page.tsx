"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Navbar from "../navbar";
import Landing from "../landing";

const CONTENT_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 30 },
  },
} as const;

export default function HomePage() {
  const [transition, setTransition] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTransition(true), 1250);
    const timer2 = setTimeout(() => setIsLoaded(true), 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main
      className={cn("relative w-full", !isLoaded && "h-dvh overflow-y-hidden")}
    >
      <Navbar transition={transition} />

      <div className="flex items-center justify-center bg-background font-sans max-w-7xl mx-auto">
        {transition && (
          <>
            <div>
              <motion.div
                variants={CONTENT_VARIANTS}
                initial="hidden"
                animate={transition ? "visible" : "hidden"}
                className="w-full"
              >
                <Landing key={String(transition)} />
              </motion.div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
