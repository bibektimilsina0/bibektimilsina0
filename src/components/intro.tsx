"use client";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TextReveal from "./fancy/text-reveal";

function Intro() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="px-4 py-12"
    >
      <div className="mx-auto max-w-7xl space-y-12">
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
            Introduction
          </TextReveal>
          <Separator className="mt-2 w-12" />
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2">
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
              Full-Stack Developer & Modern Web Architect
            </TextReveal>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center space-x-2 text-muted-foreground"
            >
              <MapPin className="h-4 w-4 text-primary" />
              <TextReveal as="span">Kathmandu, Nepal</TextReveal>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="space-y-4"
          >
            <TextReveal
              as="p"
              className="text-muted-foreground leading-relaxed"
            >
              With a background in Computer Engineering and a strong foundation
              in both frontend and backend technologies, I create web
              applications that not only look stunning but also deliver seamless
              user experiences. I specialize in React.js, Next.js, Node.js,
              Express.js, and MongoDB, and I&apos;m dedicated to staying updated
              with the latest trends in web development.
            </TextReveal>
            <TextReveal
              as="p"
              className="text-muted-foreground leading-relaxed"
            >
              Specialized in building scalable web applications using modern
              JavaScript/TypeScript stack. Experienced with React ecosystem,
              state management solutions, and contemporary development tools.
              From React Query for server state to Zustand for client state,
              from shadcn/ui components to custom animations - I leverage the
              best tools to create exceptional user experiences.
            </TextReveal>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Intro;
