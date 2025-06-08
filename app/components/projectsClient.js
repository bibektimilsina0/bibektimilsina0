'use client';

import { motion } from "framer-motion";
import ProjectCard from "./projectCard";

export default function ProjectsClient({ projects }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {projects.map((project) => (
                <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full sm:w-72 md:w-96"
                >
                    <ProjectCard project={project} />
                </motion.div>
            ))}
        </div>
    );
}
