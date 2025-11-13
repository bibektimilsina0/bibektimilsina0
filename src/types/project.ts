export interface Project {
  _id: string;
  id: number;
  title: string;
  description: string;
  projectTitle?: string;
  projectDescription?: string;
  projectLink?: string;
  githubLink?: string;
  preview?: string;
  technologies?: string; // comma-separated list, e.g. "React, TypeScript"
}
