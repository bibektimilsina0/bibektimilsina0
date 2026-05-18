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

export default function HomePage({ children }: { children?: React.ReactNode }) {
  const [transition, setTransition] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Consolidate intro animation timers, scroll listeners, and initial scroll detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    // If already scrolled down, defer skipping the animations to avoid synchronous cascading renders during mount
    if (window.scrollY > 50) {
      const frame = requestAnimationFrame(() => {
        setTransition(true);
        setIsLoaded(true);
      });
      return () => cancelAnimationFrame(frame);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setTransition(true);
        setIsLoaded(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => setTransition(true), 1250);
    const timer2 = setTimeout(() => setIsLoaded(true), 2500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
          <div className="w-full">
            <motion.div
              variants={CONTENT_VARIANTS}
              initial="hidden"
              animate={transition ? "visible" : "hidden"}
              className="w-full"
            >
              <Landing key={String(transition)} />
            </motion.div>
          </div>
        )}
      </div>
      
      {children}
    </main>
  );
}
