// src/lib/icon-map.ts
// Maps stored icon-name strings (in the DB) to Lucide icon components, so icons
// can be chosen from the dashboard and resolved at render time.

import {
  Github,
  Linkedin,
  Facebook,
  Mail,
  Twitter,
  Instagram,
  Palette,
  Database,
  Zap,
  Code2,
  Cloud,
  Server,
  Terminal,
  Cpu,
  Layers,
  Globe,
  Smartphone,
  Boxes,
  Braces,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Facebook,
  Mail,
  Twitter,
  Instagram,
  Palette,
  Database,
  Zap,
  Code2,
  Cloud,
  Server,
  Terminal,
  Cpu,
  Layers,
  Globe,
  Smartphone,
  Boxes,
  Braces,
};

/** Resolve an icon name to a component, falling back to a sensible default. */
export function getIcon(name?: string): LucideIcon {
  return (name && iconMap[name]) || Code2;
}

/** Icon names selectable for Tech Stack categories in the dashboard. */
export const TECH_ICON_OPTIONS: string[] = [
  "Palette",
  "Database",
  "Zap",
  "Code2",
  "Cloud",
  "Server",
  "Terminal",
  "Cpu",
  "Layers",
  "Globe",
  "Smartphone",
  "Boxes",
  "Braces",
];

/** Known social platforms: maps a `social` key to its label + icon. */
export const SOCIAL_PLATFORMS: {
  key: "facebook" | "linkedin" | "github" | "email" | "twitter" | "instagram";
  label: string;
  icon: LucideIcon;
}[] = [
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "github", label: "GitHub", icon: Github },
  { key: "email", label: "Email", icon: Mail },
  { key: "twitter", label: "Twitter", icon: Twitter },
  { key: "instagram", label: "Instagram", icon: Instagram },
];

/** Build the correct href for a social link value (emails get mailto:). */
export function socialHref(key: string, value: string): string {
  if (!value) return "#";
  if (key === "email") {
    return value.startsWith("mailto:") ? value : `mailto:${value}`;
  }
  return value;
}
