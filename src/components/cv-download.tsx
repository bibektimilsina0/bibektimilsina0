"use client";

import { motion } from "motion/react";
import { Download, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function CVDownload() {
  const handleDownloadCV = () => {
    // Replace with your actual CV file path
    const cvUrl = "/cv/bibek-cv.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Bibek_CV.pdf";
    link.click();
  };

  const handleViewCV = () => {
    // Replace with your actual CV file path
    window.open("/cv/bibek-cv.pdf", "_blank");
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-background"
      id="cv"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Resume
          </p>
          <Separator className="mt-2 w-12 mb-8" />
        </motion.div>

        {/* CV Download Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors duration-300">
            <CardContent className="p-8 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-primary" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Download My Resume</h3>
                <p className="text-muted-foreground">
                  Get a detailed overview of my experience, skills, and
                  qualifications.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleDownloadCV} size="lg" className="group">
                  <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                  Download CV
                </Button>
                <Button
                  onClick={handleViewCV}
                  variant="outline"
                  size="lg"
                  className="group"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  View Online
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                PDF Format • Updated December 2024
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default CVDownload;
