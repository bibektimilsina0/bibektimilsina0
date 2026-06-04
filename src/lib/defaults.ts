// src/lib/defaults.ts
// Default content mirroring the original hard-coded values. Used by actions so
// the public site looks identical until the owner edits a section from the
// dashboard. Singletons fall back to these; collections seed from them once.

import type {
  ContactInfo,
  Experience,
  Hero,
  Introduction,
  TechCategory,
} from "@/types/content";

export const DEFAULT_HERO: Hero = {
  greeting: "Hello, I'm",
  firstName: "BIBEK",
  lastName: "TIMILSINA",
  profileImage: "/photo.jpg",
  techExpertise: [
    "React.js",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "JavaScript",
    "TypeScript",
    "MongoDB",
    "Express",
    "REST APIs",
    "GraphQL",
    "HTML",
    "C/C++",
    "Python",
    "Machine Learning",
    "NLP",
    "LLMs",
    "Firebase",
    "Git",
  ],
  social: {
    facebook: "https://www.facebook.com/bibek.timilsina.568",
    linkedin: "https://www.linkedin.com/in/bibek-timilsina-6a5477253/",
    github: "https://github.com/bibektimilsina0",
    email: "",
    twitter: "",
    instagram: "",
  },
};

export const DEFAULT_INTRODUCTION: Introduction = {
  label: "Introduction",
  title: "Full-Stack Developer & Modern Web Architect",
  location: "Kathmandu, Nepal",
  paragraphs: [
    "With a background in Computer Engineering and a strong foundation in both frontend and backend technologies, I create web applications that not only look stunning but also deliver seamless user experiences. I specialize in React.js, Next.js, Node.js, Express.js, and MongoDB, and I'm dedicated to staying updated with the latest trends in web development.",
    "Specialized in building scalable web applications using modern JavaScript/TypeScript stack. Experienced with React ecosystem, state management solutions, and contemporary development tools. From React Query for server state to Zustand for client state, from shadcn/ui components to custom animations - I leverage the best tools to create exceptional user experiences.",
  ],
};

export const DEFAULT_CONTACT: ContactInfo = {
  heading: "Let's work together",
  subheading:
    "I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to collaborate!",
  email: "bibektimilsina7857@gmail.com",
  phone: "+977 9863207857",
  location: "Kathmandu, Nepal",
};

// Collections — seeded into the DB on first read (so cards are editable).
// _id is assigned by Mongo; ordering uses the numeric `id` (ascending).

export const DEFAULT_EXPERIENCES: Omit<Experience, "_id">[] = [
  {
    id: 1,
    company: "Muktinath Krishi Company",
    position: "Software Developer",
    location: "Kathmandu, Nepal",
    duration: "July 2025 - Present",
    type: "Full-time",
    description: [
      "Developed and maintained Frontend of an ecommerce platform for agricultural products using Next.js with TypeScript",
      "Implemented state management using Zustand and server-state synchronization with React Query for optimal performance",
      "Utilized shadcn/ui component library to build consistent, accessible, and responsive user interfaces",
    ],
    technologies: ["Next.js", "TypeScript", "Zustand", "React Query", "shadcn/ui"],
  },
  {
    id: 2,
    company: "TutorHome Nepal",
    position: "Web Developer (Contract)",
    location: "Remote, Nepal",
    duration: "April 2024 - Oct 2024",
    type: "Contract",
    description: [
      "Collaborated to develop a fully functional tuition platform connecting parents and students with verified home tutors",
      "Implemented Firebase Authentication, Firestore Database, and Storage for secure user management and real-time data syncing",
      "Built responsive role-based dashboards for parents, tutors, and admins using Next.js and Tailwind CSS",
    ],
    technologies: ["Next.js", "Firebase", "Tailwind CSS", "React.js", "Firestore"],
  },
];

export const DEFAULT_TECH_CATEGORIES: Omit<TechCategory, "_id">[] = [
  {
    id: 1,
    title: "Frontend",
    iconName: "Palette",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
    ],
  },
  {
    id: 2,
    title: "Backend",
    iconName: "Database",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "MongoDB",
      "Firebase",
      "PostgreSQL",
      "REST APIs",
      "GraphQL",
    ],
  },
  {
    id: 3,
    title: "State Management",
    iconName: "Zap",
    skills: ["Redux Toolkit", "Zustand", "Context API", "React Query"],
  },
  {
    id: 4,
    title: "Tools & Others",
    iconName: "Code2",
    skills: ["Git", "Docker", "Firebase", "Vercel"],
  },
];
