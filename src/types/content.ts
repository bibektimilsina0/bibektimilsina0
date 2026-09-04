// src/types/content.ts
// Shared types for all dynamic, dashboard-managed site content.

export interface SocialLinks {
  facebook?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  twitter?: string;
  instagram?: string;
}

// --- Singletons (one document each) ---

export interface Hero {
  _id?: string;
  greeting: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  techExpertise: string[];
  social: SocialLinks;
}

export interface Introduction {
  _id?: string;
  label: string;
  title: string;
  location: string;
  paragraphs: string[];
}

export interface ContactInfo {
  _id?: string;
  heading: string;
  subheading: string;
  email: string;
  phone: string;
  location: string;
}

// A submission from the public contact form. Read-only in the dashboard —
// created by /api/contact, never edited.
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// --- Collections (many documents, ordered by numeric id) ---

export interface Experience {
  _id: string;
  id: number;
  company: string;
  position: string;
  location: string;
  duration: string;
  type: string;
  description: string[];
  technologies: string[];
}

export interface TechCategory {
  _id: string;
  id: number;
  title: string;
  iconName: string;
  skills: string[];
}
