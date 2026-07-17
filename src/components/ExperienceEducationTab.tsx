/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, Building, ArrowUpRight, Award, Sparkles } from 'lucide-react';

interface TimelineItem {
  roleOrDegree: string;
  institution: string;
  location: string;
  period: string;
  description: string[];
  skills?: string[];
  gpaOrLink?: string;
}

export default function ExperienceEducationTab() {
  const experiences: TimelineItem[] = [
    {
      roleOrDegree: "Front/Backend Developer",
      institution: "DeepBreath Project",
      location: "",
      period: "",
      description: [
        "Created the front-end for the Android mobile app, implementing UI components, navigation, and state management.",
        "Connected front-end components to backend APIs and services to enable data synchronization and user authentication."
      ],
      skills: ["Android", "Kotlin", "REST APIs"]
    },
    {
      roleOrDegree: "DevOps Engineer",
      institution: "DeepBreath Project",
      location: "",
      period: "",
      description: [
        "Deployed and maintained server infrastructure on AWS using EC2 instances and Amazon AuroraDB.",
        "Managed backups, monitoring, and deployment workflows to ensure high availability and scalability."
      ],
      skills: ["AWS EC2", "Amazon Aurora"]
    },
    {
      roleOrDegree: "Quality Assurance Analyst (Intern)",
      institution: "Department of Information and Communications Technology",
      location: "",
      period: "",
      description: [
        "Performed quality assurance testing, wrote test plans, and reported defects to development teams.",
        "Collaborated with engineers to reproduce issues and verify fixes prior to releases."
      ]
    }
  ];

  const education: TimelineItem[] = [
    {
      roleOrDegree: "B.S. in Computer Science (Software Engineering)",
      institution: "FEU Institute of Technology",
      location: "Manila, Philippines",
      period: "2022 - 2026",
      description: [
        "Specialized in Software Engineering with a focus on front-end development and modern web architectures.",
        "Completed core coursework in algorithms, data structures, software design, and systems engineering."
      ],
      gpaOrLink: ""
    }
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in" id="experience-education-tab-root">
      
      {/* Tab Header Banner */}
      <div className="rounded-lg border border-[#d0d7de] bg-[#f6f8fa] p-6 dark:border-[#30363d] dark:bg-[#161b22]" id="exp-edu-header">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-[#f78166]/10 p-3 text-[#f78166]">
            <Briefcase size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#24292f] dark:text-[#f0f6fc] flex items-center gap-2">
              Career History & Academic Background <Sparkles size={16} className="text-yellow-400" />
            </h2>
            <p className="mt-1 text-sm text-[#57606a] dark:text-[#8b949e] leading-relaxed">
              An overview of my professional experience building production-grade web systems and my academic foundation in software design.
            </p>
          </div>
        </div>
      </div>

      {/* Main split timeline (Experience & Education side-by-side on desktop, stacked on mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="exp-edu-timelines-grid">
        
        {/* EXPERIENCE COLUMN */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#d0d7de] dark:border-[#30363d]">
            <Briefcase className="text-[#f78166]" size={18} />
            <h3 className="font-bold text-base text-[#24292f] dark:text-[#f0f6fc]">Professional Experience</h3>
          </div>

          <div className="relative pl-6 border-l-2 border-[#d0d7de] dark:border-[#30363d] space-y-8 mt-2" id="experience-timeline">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative" id={`exp-item-${idx}`}>
                {/* Timeline dot */}
                <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#d0d7de] bg-white dark:border-[#30363d] dark:bg-[#0d1117]">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#f78166]" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h4 className="font-bold text-sm text-[#24292f] dark:text-[#f0f6fc]">
                      {exp.roleOrDegree}
                    </h4>
                    <span className="text-xs font-mono text-[#57606a] dark:text-[#8b949e] bg-[#f6f8fa] dark:bg-[#161b22] px-2 py-0.5 rounded border border-[#d0d7de]/50 dark:border-[#30363d]/50">
                      {exp.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-[#0969da] dark:text-[#58a6ff]">
                    <Building size={12} />
                    <span>{exp.institution}</span>
                    <span className="text-[#d0d7de] dark:text-[#30363d]">•</span>
                    <MapPin size={12} className="text-[#57606a] dark:text-[#8b949e]" />
                    <span className="text-[#57606a] dark:text-[#8b949e]">{exp.location}</span>
                  </div>

                  <ul className="mt-2 space-y-1.5 pl-4 list-disc">
                    {exp.description.map((desc, dIdx) => (
                      <li key={dIdx} className="text-xs text-[#57606a] dark:text-[#8b949e] leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {exp.skills && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="rounded bg-[#eaeef2] px-2 py-0.5 text-[10px] font-mono text-[#24292f] dark:bg-[#30363d] dark:text-[#c9d1d9]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION COLUMN */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#d0d7de] dark:border-[#30363d]">
            <GraduationCap className="text-[#0969da] dark:text-[#58a6ff]" size={20} />
            <h3 className="font-bold text-base text-[#24292f] dark:text-[#f0f6fc]">Academic Education</h3>
          </div>

          <div className="relative pl-6 border-l-2 border-[#d0d7de] dark:border-[#30363d] space-y-8 mt-2" id="education-timeline">
            {education.map((edu, idx) => (
              <div key={idx} className="relative" id={`edu-item-${idx}`}>
                {/* Timeline dot */}
                <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#d0d7de] bg-white dark:border-[#30363d] dark:bg-[#0d1117]">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#0969da] dark:bg-[#58a6ff]" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h4 className="font-bold text-sm text-[#24292f] dark:text-[#f0f6fc]">
                      {edu.roleOrDegree}
                    </h4>
                    <span className="text-xs font-mono text-[#57606a] dark:text-[#8b949e] bg-[#f6f8fa] dark:bg-[#161b22] px-2 py-0.5 rounded border border-[#d0d7de]/50 dark:border-[#30363d]/50">
                      {edu.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-[#1f883d] dark:text-[#39d353]">
                    <Building size={12} />
                    <span>{edu.institution}</span>
                    <span className="text-[#d0d7de] dark:text-[#30363d]">•</span>
                    <MapPin size={12} className="text-[#57606a] dark:text-[#8b949e]" />
                    <span className="text-[#57606a] dark:text-[#8b949e]">{edu.location}</span>
                  </div>

                  <ul className="mt-2 space-y-1.5 pl-4 list-disc">
                    {edu.description.map((desc, dIdx) => (
                      <li key={dIdx} className="text-xs text-[#57606a] dark:text-[#8b949e] leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {edu.gpaOrLink && (
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 rounded bg-[#dafbe1] dark:bg-[#102a16] text-[#1a7f37] dark:text-[#56d364] px-2 py-0.5 text-[10px] font-semibold">
                        <Award size={10} />
                        {edu.gpaOrLink}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
