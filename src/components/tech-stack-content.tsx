"use client";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TextReveal from "./fancy/text-reveal";
import { TechCategory } from "@/types/content";
import { getIcon } from "@/lib/icon-map";

export default function TechStackContent({
  categories,
}: {
  categories: TechCategory[];
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
            Technology Stack
          </TextReveal>
          <Separator className="mt-2 w-12" />
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {categories.map((category, categoryIndex) => {
              const IconComponent = getIcon(category.iconName);
              return (
                <motion.div
                  key={category._id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.6 + categoryIndex * 0.1,
                    duration: 0.6,
                  }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-sm">
                          {category.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay:
                                0.8 + categoryIndex * 0.1 + skillIndex * 0.05,
                              duration: 0.3,
                            }}
                          >
                            <Badge
                              variant="secondary"
                              className="text-xs hover:bg-primary/20 transition-colors cursor-default"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
