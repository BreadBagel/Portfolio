export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  updatedAt: string;
  isPrivate: boolean;
  size: string;
  license?: string;
  isPinned: boolean;
  githubUrl?: string;
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  labels: { name: string; color: string; description: string }[];
  createdAt: string;
  author: string;
  commentsCount: number;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: string;
  amount: number;
  avatar: string;
  message?: string;
  date: string;
}

export interface CommitDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface BioInfo {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  email: string;
  twitter: string;
  company: string;
  organizations: { name: string; logo: string }[];
  followersCount: number;
  followingCount: number;
  starredCount: number;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  details: string;
  tags: string[];
  visual: string;
  accent: string;
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  performanceBadge?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type: string;
  description: string;
  skills: string[];
}

export interface ServiceOffering {
  title: string;
  description: string;
  deliverables: string[];
  icon: 'web' | 'interface' | 'cloud' | 'automation';
}

export interface PortfolioData {
  name: string;
  username: string;
  title: string;
  roles: string[];
  bio: string;
  about: string;
  location: string;
  avatar: string;
  available: boolean;
  socials: {
    github: string;
    linkedin: string;
  };
  contact: {
    email: string;
  };
  skills: SkillGroup[];
  projects: Project[];
  experience: ExperienceItem[];
  services?: ServiceOffering[];
}
