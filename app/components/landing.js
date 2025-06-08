"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const techSkills = [
    "React.js",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "JavaScript",
    "MongoDB",
    "Express",
    "Rest APIs",
    "GraphQL",
    "HTML",
    "c/c++",
    "Python",
    "Machine Learning",
    "Natural Language Processing",
    "LLMs",
    "Firebase",
    "Git"
];

function Landing() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="m-4 flex flex-col md:flex-row justify-evenly">
                {/* Text Section */}
                <motion.div
                    className="mt-8 text-center leading-loose items-center font-mono md:w-1/2"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="text-xl">I'm</span>
                    <br /><br />
                    <span className="font-bold text-3xl md:text-5xl p-2">BIBEK <br /> TIMILSINA</span>
                    <motion.div
                        className="my-8 flex justify-center space-x-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {[
                            { icon: faFacebook, link: "https://www.facebook.com/bibek.timilsina.568" },
                            { icon: faLinkedin, link: "https://www.linkedin.com/in/bibek-timilsina-6a5477253/" },
                            { icon: faGithub, link: "https://github.com/bibektimilsina0" }
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FontAwesomeIcon icon={social.icon} className="text-2xl" />
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Image Section */}
                <motion.div
    className="w-3/5 md:w-1/2 flex justify-center items-center mt-8 md:mt-0 mx-auto"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
    whileHover={{ scale: 1.08, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }} // Hover effect
    whileTap={{ scale: 0.95 }} // Scale down slightly when tapped
>
    <Image
        src="/photo.jpg"
        width={380}
        height={380}
        alt="Bibek Timilsina"
        className="rounded-lg"
    />
</motion.div>

            </div>

            {/* Tech Expertise Section */}
            <div className="m-4">
                <h2 className="text-base font-semibold text-white mb-4 mx-8">TECH EXPERTISE</h2>
                <motion.div
                    className="mx-8 flex flex-wrap gap-2 mt-1"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                >
                    {techSkills.map((tech, index) => (
                        <motion.button
                            key={index}
                            className="bg-gray-700 text-yellow-500 hover:bg-yellow-800 text-sm px-3 py-1 rounded-full transition-all"
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            {tech}
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Landing;
