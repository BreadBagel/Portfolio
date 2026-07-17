/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BioInfo, Repository, Issue, Sponsor } from '../types';

export const bioInfo: BioInfo = {
  name: "Martin Villanueva",
  username: "BreadBagel",
  avatar: "/src/assets/images/PFP.jpg",
  bio: "Software Engineer building modern developer tools & delightful web experiences. Focused on Python, and Web Development. Passionate about open-source, and community-driven projects.",
  location: "Manila, Phillippines",
  website: "",
  email: "mcvillanueva6789@gmail.com",
  twitter: "",
  company: "",
  organizations: [
    { name: "Vercel", logo: "▲" },
    { name: "GitHub", logo: "🐙" },
    { name: "React", logo: "⚛" },
    { name: "Rust Foundation", logo: "🦀" },
    { name: "Tailwind CSS", logo: "🍃" }
  ],
  followersCount: 0,
  followingCount: 0,
  starredCount: 0
};

export const initialRepositories: Repository[] = [
  {
    id: "1",
    name: "react-motion-canvas",
    description: "An interactive, GPU-accelerated canvas component powered by motion/react and WebGL. Optimized for complex physics-based web animations.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 524,
    forks: 48,
    updatedAt: "2026-06-24T18:30:00Z",
    isPrivate: false,
    size: "14.2 MB",
    license: "MIT",
    isPinned: true,
    githubUrl: "https://github.com/framer/motion"
  },
  {
    id: "2",
    name: "git-issue-contact",
    description: "A serverless, lightweight feedback widget designed to look and feel exactly like GitHub's issue editor, saving submissions to local/cloud databases.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 289,
    forks: 34,
    updatedAt: "2026-06-23T12:15:00Z",
    isPrivate: false,
    size: "4.8 MB",
    license: "MIT",
    isPinned: true,
    githubUrl: "https://github.com/git-point/git-point"
  },
  {
    id: "3",
    name: "esbuild-node-bundle",
    description: "A zero-config build suite that bundles typescript Node.js microservices into a single executable CommonJS or ESModule output with source maps.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 312,
    forks: 21,
    updatedAt: "2026-06-21T09:40:00Z",
    isPrivate: false,
    size: "1.2 MB",
    license: "Apache-2.0",
    isPinned: true,
    githubUrl: "https://github.com/evanw/esbuild"
  },
  {
    id: "4",
    name: "github-aesthetic-portfolio",
    description: "A high-fidelity developer portfolio template styled with the exact color schemes, tab hierarchies, and interaction behaviors of GitHub.",
    language: "CSS",
    languageColor: "#563d7c",
    stars: 1245,
    forks: 215,
    updatedAt: "2026-06-25T00:30:00Z",
    isPrivate: false,
    size: "2.3 MB",
    license: "MIT",
    isPinned: true,
    githubUrl: "https://github.com/anuraghazra/github-readme-stats"
  },
  {
    id: "5",
    name: "rust-git-parser",
    description: "Lightning-fast Rust bindings to parse raw .git repository history logs, generating optimized JSON maps for visual dashboard rendering.",
    language: "Rust",
    languageColor: "#dea584",
    stars: 198,
    forks: 14,
    updatedAt: "2026-06-19T22:05:00Z",
    isPrivate: false,
    size: "820 KB",
    license: "MIT",
    isPinned: true,
    githubUrl: "https://github.com/gitoxide-labs/gitoxide"
  },
  {
    id: "6",
    name: "tailwind-auto-grid",
    description: "A smart layout generator that compiles semantic css grid templates from simple reactive sizing properties without extra markup overhead.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 87,
    forks: 9,
    updatedAt: "2026-06-15T14:50:00Z",
    isPrivate: false,
    size: "450 KB",
    license: "MIT",
    isPinned: true,
    githubUrl: "https://github.com/tailwindlabs/tailwindcss"
  },
  {
    id: "7",
    name: "graphql-batch-proxy",
    description: "Nested query resolver proxy that intelligently pools and batches multiple downstream microservice HTTP queries into unified database transactions.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 64,
    forks: 7,
    updatedAt: "2026-05-28T11:15:00Z",
    isPrivate: false,
    size: "6.1 MB",
    license: "MIT",
    isPinned: false,
    githubUrl: "https://github.com/graphql/graphql-js"
  },
  {
    id: "8",
    name: "docker-instant-dev",
    description: "Spin up a fully isolated multi-tier dev environment with pre-configured secure PostgreSQL databases, Redis, and auto-signed HTTPS certificates.",
    language: "Shell",
    languageColor: "#89e051",
    stars: 43,
    forks: 11,
    updatedAt: "2026-05-12T08:12:00Z",
    isPrivate: false,
    size: "1.8 MB",
    isPinned: false,
    githubUrl: "https://github.com/docker/compose"
  },
  {
    id: "9",
    name: "interactive-readme-builder",
    description: "Visual canvas utility to build dynamic README.md profile summaries utilizing progress rings, dynamic skill charts, and layout templates.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 156,
    forks: 18,
    updatedAt: "2026-04-30T17:25:00Z",
    isPrivate: false,
    size: "3.4 MB",
    license: "MIT",
    isPinned: false,
    githubUrl: "https://github.com/rzasherifov/github-readme-medium"
  },
  {
    id: "10",
    name: "wasm-image-compressor",
    description: "High-performance client-side image optimization engine compiled to WebAssembly from native C layers. Shrink file sizes in micro-seconds.",
    language: "C",
    languageColor: "#555555",
    stars: 92,
    forks: 6,
    updatedAt: "2026-04-15T19:00:00Z",
    isPrivate: false,
    size: "740 KB",
    license: "Apache-2.0",
    isPinned: false,
    githubUrl: "https://github.com/GoogleChromeLabs/squoosh"
  }
];

export const initialIssues: Issue[] = [
  {
    id: "issue-1",
    number: 142,
    title: "Inquiry: Collaboration on an open-source animation engine",
    body: "Hi Alex!\n\nI was looking through your repository `react-motion-canvas` and loved the visual fidelity. We are currently working on a collaborative web canvas for creative artists and would love to chat about integrating some of your core rendering logic into our platform.\n\nLet me know if you are open for a brief video call next week!\n\nBest,\n**Sarah Jenkins**\nEngineering Lead @ DesignMatrix",
    state: "open",
    labels: [
      { name: "collaboration", color: "#1D76DB", description: "Inquiries about partnership and projects" },
      { name: "inquiry", color: "#6F42C1", description: "General questions and requests" }
    ],
    createdAt: "2026-06-24T10:15:00Z",
    author: "sjenkins-design",
    commentsCount: 2
  },
  {
    id: "issue-2",
    number: 139,
    title: "Job Offer: Senior Frontend Engineer at TechFlow Inc.",
    body: "Hey Alex,\n\nI'm reaching out from TechFlow. We are heavily expanding our developer tooling group and your background in compilation speeds (seen your `esbuild-node-bundle` tool!) and modern web animations is extremely relevant to what we are building.\n\nWe support fully remote setups, highly competitive compensation (base + equity), and dedicated 20% open-source contributions time.\n\nIf this sounds interesting, please let me know or book a time directly in my calendar!\n\nBest,\n**Marcus Chen**\nCo-Founder, TechFlow",
    state: "open",
    labels: [
      { name: "job-offer", color: "#0E8A16", description: "Career opportunities and professional offers" },
      { name: "priority: high", color: "#D93F0B", description: "Urgent items requiring prompt attention" }
    ],
    createdAt: "2026-06-22T14:32:00Z",
    author: "mchen-techflow",
    commentsCount: 0
  },
  {
    id: "issue-3",
    number: 112,
    title: "Solved: Bug report about responsive break on Contribution Calendar",
    body: "On viewport widths narrower than 480px, the 53-week contribution calendar used to spill out of its container and cause horizontal page scrolling.\n\n**Fix applied:** Wrapped the contribution calendar in a responsive `overflow-x-auto` utility block. On narrow viewports, readers can now slide horizontally smoothly, while desktop maintains full-width display grid structures without clutter.\n\nClosing this issue now!",
    state: "closed",
    labels: [
      { name: "bug", color: "#D73A4A", description: "Something isn't working as expected" },
      { name: "resolved", color: "#24292F", description: "Issue successfully addressed" }
    ],
    createdAt: "2026-06-18T09:20:00Z",
    author: "BreadBagel",
    commentsCount: 1
  }
];

export const initialSponsors: Sponsor[] = [
  {
    id: "spon-1",
    name: "Vercel Inc.",
    tier: "Gold Sponsor",
    amount: 100,
    avatar: "▲",
    message: "Supporting community open source tooling for modern developers.",
    date: "2026-06-10"
  },
  {
    id: "spon-2",
    name: "CodeCraft Foundation",
    tier: "Silver Sponsor",
    amount: 50,
    avatar: "⚙️",
    message: "Keep up the amazing work with the Rust git log parsers!",
    date: "2026-06-14"
  },
  {
    id: "spon-3",
    name: "Emilie Roberts",
    tier: "Coffee Sponsor",
    amount: 10,
    avatar: "☕",
    message: "Your esbuild bundler saved me hours of config time!",
    date: "2026-06-20"
  }
];

export const sponsorTiers = [
  { name: "Coffee Sponsor", amount: 10, description: "Fuel Alex's coding sessions with premium espresso shots. Unlocks a sponsor badge!" },
  { name: "Silver Sponsor", amount: 25, description: "Support ongoing development of utility packages. Your logo added to profile README." },
  { name: "Gold Sponsor", amount: 100, description: "Premium backing for compiler and animation engines. Unlocks a monthly 1-on-1 architecture call!" },
  { name: "Enterprise Sponsor", amount: 500, description: "Dedicated custom development and feature prioritization on open source projects." }
];
