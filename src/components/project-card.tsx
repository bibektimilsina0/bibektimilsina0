"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import TextReveal from "./fancy/text-reveal";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Project {
  title: string;
  description?: string;
  date?: Date | string;
  website?: string;
  github?: string;
  tags?: { label: string }[];
  // thumbnail: string;
}
interface ProjectCardProps extends Project {
  href: string;
  thumbnail: string;
  className?: string;
}

function ProjectCard({
  title,
  description,
  href,
  thumbnail,
  tags,
  className,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group relative flex w-full max-w-sm mx-auto flex-col justify-between border border-border/50 bg-card hover:shadow-lg hover:border-secondary/40  transition-all duration-300 ease-out cursor-pointer overflow-hidden py-0",
          className
        )}
      >
        <div className="grid gap-4">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={`Screenshot of ${title}`}
            width={640}
            height={360}
            className={cn(
              "fill rounded-t-lg transition-transform duration-300 origin-top h-full w-full object-cover",
              isHovered ? "scale-105" : "scale-100"
            )}
          />

          {/* Action Buttons Overlay */}
          <div
            className={cn(
              "absolute top-3 right-3 transition-opacity duration-200",
              isHovered ? "opacity-100 rounded-t-lg" : "opacity-0"
            )}
          ></div>
          <div className="p-6 space-y-4">
            <TextReveal
              className="text-xl font-bold group-hover:text-primary transition-colors duration-300"
              as="h3"
            >
              {title}
            </TextReveal>
            <TextReveal
              as="p"
              className="text-sm text-muted-foreground leading-relaxed line-clamp-2"
            >
              {description ?? ""}
            </TextReveal>

            <div className="flex flex-wrap gap-2 min-h-20">
              {tags?.map((tag, index) => (
                <Badge
                  key={`project-tag_${index}`}
                  variant="secondary"
                  className="text-xs h-8 px-2"
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Link
          href={href}
          className="absolute inset-0 z-10"
          aria-label={`View ${title} project`}
        />
      </Card>
    </motion.div>
  );
}

export default ProjectCard;
