"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Intro() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }} 
      className="mx-4 md:my-4"
    >
      {/* Introduction Header */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ delay: 0.2, duration: 0.6 }} 
        className="m-4"
      >
        <h5 className="text-gray-400">-- Introduction</h5>
      </motion.div>

      {/* Title and Location */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.4, duration: 0.8 }} 
        className="m-4"
      >
        <h1 className="text-2xl md:text-3xl">
          MERN-Stack Web Developer,
        </h1>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2"></div>
          <div className="w-full md:w-1/2 flex items-center justify-start">
            <motion.span 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.6, duration: 0.6 }} 
              className="pr-4"
            >
              <FontAwesomeIcon icon={faLocationDot} style={{ color: "rgb(251 191 36)" }} />
            </motion.span>
            <motion.span 
              initial={{ x: 20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Kathmandu, Nepal
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.8, duration: 1 }} 
        className="m-4"
      >
        <p className="text-gray-400">
          With a background in Computer Engineering and a strong foundation in both frontend and backend technologies, I create web applications that not only look stunning but also deliver seamless user experiences.
          <br />
          I specialize in React.js, Next.js, Node.js, Express.js, and MongoDB, and I'm dedicated to staying updated with the latest trends in web development. My goal is to contribute innovative solutions to real-world challenges, turning ideas into reality.
        </p>
      </motion.div>

      {/* Journey Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 1, duration: 0.8 }} 
        className="m-4"
      >
        <h1 className="text-xl md:text-2xl">
          <span className="text-amber-400">My journey</span>
          <a href="#journey">
            <motion.span 
              initial={{ x: -10, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 1.2, duration: 0.6 }} 
              className="pl-4"
            >
              <FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: "rgb(251 191 36)" }} />
            </motion.span>
          </a>
        </h1>
      </motion.div>
    </motion.div>
  );
}

export default Intro;
