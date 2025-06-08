"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

function ProjectCard({ project }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!project) {
        return <div>No project data available.</div>;
    }

    const { projectTitle, projectDescription, projectLink, githubLink, preview, technologies } = project;
    const formattedTechnologies = technologies ? technologies.split(",").map((tech) => tech.trim()) : [];

    return (
        <div>
        <motion.div
            className="w-full sm:w-80 md:w-96 p-4 m-4 border rounded-lg shadow-md flex flex-col items-center cursor-pointer"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            transition={{ duration: 0.3 }}
        >
            {/* Image with hover effect */}
            <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <Image
                    src={preview}
                    width={360}
                    height={200}
                    className="rounded-lg object-cover"
                    alt={projectTitle}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </motion.div>

            {/* Title */}
            <h2 className="text-lg font-bold mt-2 text-center">{projectTitle}</h2>

            {/* Description (truncated to 2 lines) */}
            <p className="text-gray-400 line-clamp-2 overflow-hidden">{projectDescription}</p>

            {/* Technologies */}
            <div className="mt-2 flex flex-wrap justify-center gap-2">
                {formattedTechnologies.map((tech, index) => (
                    <motion.button
                        key={index}
                        className="bg-yellow-900 text-yellow-500 hover:bg-yellow-800 text-sm px-3 py-1 rounded-full transition-all"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2, type: "spring", stiffness: 200 }}
                    >
                        {tech}
                    </motion.button>
                ))}
            </div>
            </motion.div>
            {/* Modal */}
            {isOpen && (
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex flex-col md:flex-row items-center justify-center z-50 bg-black bg-opacity-50">
                    <motion.div
                        className="bg-[#2d3846] p-4 sm:p-6 rounded-lg w-[95%] max-w-5xl mx-auto flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[90vh] relative"
     
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                    >
                        {/* Close Button (Cross icon) */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="absolute top-4 right-4 text-white text-2xl"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        {console.log(isOpen)}
                        <Image
                            src={preview}
                            width={660}
                            height={500}
                            className="rounded-lg object-contain w-full md:w-1/2"
                            alt={projectTitle}
                        />
                        <div>
                            <Dialog.Title className="text-2xl font-bold text-white">{projectTitle}</Dialog.Title>
                            <p className="text-gray-400 mt-2">{projectDescription}</p>
                            <div className="mt-4 flex gap-6">
                                {/* Demo Link */}
                                <a
                                    href={projectLink}
                                    target="_blank"
                                    className="flex items-center bg-yellow-500 text-yellow-900 hover:bg-yellow-400 transition-all p-2 rounded-md"
                                >
                                    Live Demo
                                    <FontAwesomeIcon icon={faArrowRightToBracket} className="text-[#E94057] ml-2" />
                                </a>

                                {/* GitHub Link */}
                                <a
                                    href={githubLink}
                                    target="_blank"
                                    className="flex items-center bg-yellow-500 text-yellow-900 hover:bg-yellow-400 transition-all p-2 rounded-md"
                                >
                                    Code
                                    <FontAwesomeIcon icon={faGithub} className="text-[#E94057] ml-2" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </Dialog>
            )}
       
        </div>
    );
}

export default ProjectCard;
