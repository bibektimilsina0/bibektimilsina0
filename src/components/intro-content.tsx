"use client";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TextReveal from "./fancy/text-reveal";
import { Introduction } from "@/types/content";

export default function IntroContent({
  introduction,
}: {
  introduction: Introduction;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full px-4 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <TextReveal
            as="p"
            className="text-sm font-medium text-muted-foreground uppercase tracking-wider"
          >
            {introduction.label}
          </TextReveal>
          <Separator className="mt-2 w-12" />
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Title Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <TextReveal
              as="h1"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {introduction.title}
            </TextReveal>

            {introduction.location && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center space-x-2 text-muted-foreground"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <TextReveal as="span">{introduction.location}</TextReveal>
              </motion.div>
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="space-y-4"
          >
            {introduction.paragraphs.map((paragraph, idx) => (
              <TextReveal
                key={idx}
                as="p"
                className="text-muted-foreground leading-relaxed"
              >
                {paragraph}
              </TextReveal>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
