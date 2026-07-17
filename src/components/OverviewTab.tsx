/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Code, LayoutGrid, Terminal, BookOpen } from 'lucide-react';
import { BioInfo } from '../types';

interface OverviewTabProps {
  bio: BioInfo;
  setActiveTab?: (tab: string) => void;
}

export default function OverviewTab({ bio, setActiveTab }: OverviewTabProps) {
  const [readmeContent, setReadmeContent] = useState<string>(
    `# 👋 Hi, I'm Martin Villanueva!

Software Engineer with a passion for high-performance compilations, beautiful animations, and modular web structures. I build tools that help other engineers write clean and responsive programs.

## 🛠️ Tech Stack & Skills
*   **Languages:** TypeScript, JavaScript, Rust, Go, SQL, HTML/CSS, Python
*   **Frameworks:** React (Next.js/Vite), Node.js, Express, Tailwind CSS
*   **Databases:** PostgreSQL, MySQL, AuroraDB
*   **Tools:** Git, Docker, AWS Cloud Services

## 🚀 Key Focus Areas
-   Conducted software testing to identify defects and issues.
-   Prepared project files and configurations for cloud deployment.
-   Managed and organized database records to ensure accurate and up-to-date information.`
  );

  // Simple, safe Markdown parser to HTML to bypass extra external library compile issues
  const parseMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    return lines.map((line, index) => {
      // Header 1
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="mb-4 mt-6 text-2xl font-bold tracking-tight text-[#24292f] dark:text-[#f0f6fc] border-b border-[#d0d7de] pb-1.5 dark:border-[#30363d]">
            {line.substring(2)}
          </h1>
        );
      }
      // Header 2
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="mb-3 mt-5 text-xl font-semibold tracking-tight text-[#24292f] dark:text-[#f0f6fc] border-b border-[#d0d7de] pb-1 dark:border-[#30363d]">
            {line.substring(3)}
          </h2>
        );
      }
      // Bullet list items
      if (line.startsWith('* ') || line.startsWith('- ')) {
        // Simple bold parser inside lists
        const cleanText = line.substring(2);
        return (
          <li key={index} className="ml-5 list-disc text-sm text-[#24292f] dark:text-[#c9d1d9] mb-1">
            {renderBoldText(cleanText)}
          </li>
        );
      }
      // Empty line
      if (line.trim() === '') {
        return <div key={index} className="h-2"></div>;
      }
      // Normal paragraphs with inline code highlights
      return (
        <p key={index} className="mb-2 text-sm leading-relaxed text-[#24292f] dark:text-[#c9d1d9]">
          {renderBoldText(line)}
        </p>
      );
    });
  };

  const renderBoldText = (text: string) => {
    // Basic bold ** and code ` parser
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    const parts = text.split(regex);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-[#24292f] dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="rounded bg-[#f6f8fa] px-1.5 py-0.5 font-mono text-xs text-[#cf222e] dark:bg-[#161b22] dark:text-[#ff7b72] border border-[#d0d7de] dark:border-[#30363d]">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const accomplishments = [
    {
      date: "May 2025",
      title: "Initial Creation of DeepBreath: RestNet-34 and Logistics Regression of Cough Sounds Analysis to Assist Preliminary Diagnosis of Pneumonia",
      desc: "Developed the alpha version of DeepBreath, trained the model on a dataset of cough sounds, and implemented the initial logistics regression algorithm for preliminary diagnosis.", 
      icon: Code,
      badge: "Release"
    },
    {
      date: "June 2025",
      title: "Staging DeepBreath: RestNet-34 and Logistics Regression of Cough Sounds Analysis to Assist Preliminary Diagnosis of Pneumonia",
      desc: "Staged the Project to AWS Cloud Services; EC2 and AuroraDB for initial testing and deployment.",
      icon: Code,
      badge: "Release"
    },
    {
      date: "February 2026",
      title: "Intern at Department of Information and Communications Technology (DICT) - National Government of the Philippines",
      desc: "Interned as a Quality Assurance Analyst, conducting software testing, preparing project files for cloud deployment, and managing database records.",
      icon: Code,
      badge: "Release"
    },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in" id="gh-overview-tab">
      
      {/* 0. Main Professional Hero Section: Name & Introduction with Picture */}
      <div className="rounded-lg border border-[#30363d] bg-gradient-to-r from-[#161b22] to-[#0d1117] p-6 shadow-xl flex flex-col sm:flex-row gap-6 items-center" id="overview-hero">
        <div className="relative group h-28 w-28 md:h-32 md:w-32 overflow-hidden rounded-full border border-[#30363d] bg-gradient-to-br from-[#1f6feb] to-[#238636] shadow-lg shrink-0">
          <img
            src={bio.avatar}
            alt={bio.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${bio.username}`;
            }}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">
            {bio.name}
          </h1>
          <p className="text-base text-[#58a6ff] font-semibold mb-3">
            @{bio.username}
          </p>
          <p className="text-[#c9d1d9] text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
            {bio.bio}
          </p>
        </div>
      </div>

      {/* 1. Custom profile README section */}
      <div className="rounded-lg border border-[#d0d7de] bg-white p-4 shadow-sm dark:border-[#30363d] dark:bg-[#161b22]">
        <div className="flex items-center justify-between border-b border-[#d0d7de] pb-3 dark:border-[#30363d] mb-4">
          <div className="flex items-center gap-2 text-xs text-[#57606a] dark:text-[#8b949e] font-medium font-mono">
            <span>BreadBagel</span>
            <span>/</span>
            <span className="font-bold text-[#24292f] dark:text-[#f0f6fc]">README.md</span>
          </div>
        </div>

        {/* Readme Content Container */}
        <div className="prose dark:prose-invert max-w-none text-[#24292f] dark:text-[#c9d1d9]" id="readme-rendered-content">
          {parseMarkdown(readmeContent)}
        </div>
      </div>


      {/* 3. Experience & Milestones Timeline */}
      <div className="rounded-lg border border-[#d0d7de] bg-white p-4 shadow-sm dark:border-[#30363d] dark:bg-[#161b22]">
        <div className="flex items-center gap-2 border-b border-[#d0d7de] pb-3 dark:border-[#30363d] mb-4">
          <Terminal size={14} className="text-[#57606a] dark:text-[#8b949e]" />
          <h2 className="text-sm font-semibold text-[#24292f] dark:text-[#f0f6fc]">
            Activity & Experience Milestones
          </h2>
        </div>

        {/* Timeline lists */}
        <div className="relative border-l border-[#d0d7de] dark:border-[#30363d] ml-2.5 pl-5 flex flex-col gap-5">
          {accomplishments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative">
                {/* Visual marker dot */}
                <span className="absolute -left-[27px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-[#0d1117] ring-4 ring-[#f6f8fa] dark:ring-[#161b22]">
                  <Icon size={10} className="text-[#0969da] dark:text-[#58a6ff]" />
                </span>

                <div className="flex flex-col gap-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-[#24292f] dark:text-[#f0f6fc]">
                      {item.title}
                    </span>
                    <span className="rounded bg-[#eaeef2] px-1.5 py-0.5 text-[9px] font-bold text-[#57606a] dark:bg-[#21262d] dark:text-[#8b949e]">
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-[#57606a] dark:text-[#8b949e] md:ml-auto">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-xs text-[#57606a] dark:text-[#8b949e] mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
