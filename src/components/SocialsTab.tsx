/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Linkedin,
  Github,
  Mail,
  ExternalLink,
  MessageSquare,
  Compass,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { BioInfo } from '../types';

interface SocialsTabProps {
  bio: BioInfo;
}

interface SocialPlatform {
  name: string;
  username: string;
  url: string;
  icon: React.ComponentType<any>;
  color: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
  tagline: string;
  metric?: string;
  metricLabel?: string;
  highlights?: string[];
}

export default function SocialsTab({ bio }: SocialsTabProps) {
  const socialPlatforms: SocialPlatform[] = [
    {
      name: "LinkedIn",
      username: bio.website ? new URL('https://linkedin.com').hostname : 'LinkedIn',
      url: "https://www.linkedin.com/in/martin-villanueva-942443296/",
      icon: Linkedin,
      color: "border-[#0a66c2]/30 hover:border-[#0a66c2] bg-[#f4f8fc] dark:bg-[#0f1924]",
      textColor: "text-[#0a66c2]",
      badgeBg: "bg-[#0a66c2]/10 dark:bg-[#0a66c2]/20",
      badgeText: "text-[#0a66c2] dark:text-[#5fa4e6]",
      tagline: "Let's connect professionally for opportunities & collaboration."
    },
    {
      name: "GitHub",
      username: bio.username,
      url: "https://github.com/" + bio.username,
      icon: Github,
      color: "border-[#24292f]/30 hover:border-[#24292f] bg-[#f6f8fa] dark:bg-[#161b22]",
      textColor: "text-[#24292f] dark:text-[#f0f6fc]",
      badgeBg: "bg-[#24292f]/10 dark:bg-[#f0f6fc]/10",
      badgeText: "text-[#24292f] dark:text-[#c9d1d9]",
      tagline: "Explore my source code and technical contributions."
    },
    {
      name: "Direct Email",
      username: bio.email,
      url: `mailto:${bio.email}`,
      icon: Mail,
      color: "border-[#1f883d]/30 hover:border-[#1f883d] bg-[#f5faf6] dark:bg-[#0f2014]",
      textColor: "text-[#1f883d] dark:text-[#39d353]",
      badgeBg: "bg-[#1f883d]/10 dark:bg-[#1f883d]/20",
      badgeText: "text-[#1f883d] dark:text-[#5cd682]",
      tagline: "Drop a line for business inquiries, consulting, or speaking sessions."
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in" id="socials-tab-root">
      
      {/* Intro Header Section */}
      <div className="rounded-lg border border-[#d0d7de] bg-[#f6f8fa] p-6 dark:border-[#30363d] dark:bg-[#161b22]" id="socials-header-card">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-[#f78166]/10 p-3 text-[#f78166]">
            <Compass size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#24292f] dark:text-[#f0f6fc] flex items-center gap-2">
              Connect With Me <Sparkles size={16} className="text-yellow-400" />
            </h2>
            <p className="mt-1 text-sm text-[#57606a] dark:text-[#8b949e] leading-relaxed">
              Let&apos;s build together! I am highly active across the developer community. Reach out for consultations, feedback, or to chat about high-fidelity web experiences and performant compiler engines.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Social Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="social-cards-grid">
        {socialPlatforms.map((platform, idx) => {
          const IconComponent = platform.icon;
          return (
            <div
              key={idx}
              className={`flex flex-col justify-between rounded-lg border p-5 shadow-sm transition duration-200 ${platform.color}`}
              id={`social-card-${platform.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <div>
                {/* Header of the card */}
                <div className="flex items-center justify-between border-b border-[#d0d7de]/50 pb-3 dark:border-[#30363d]/50">
                  <div className="flex items-center gap-2.5">
                    <span className={`p-1.5 rounded-md ${platform.badgeBg} ${platform.textColor}`}>
                      <IconComponent size={18} />
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-[#24292f] dark:text-[#f0f6fc]">
                        {platform.name}
                      </h3>
                      <p className="text-[11px] text-[#57606a] dark:text-[#8b949e]">
                        {platform.username}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Tagline */}
                <p className="text-xs text-[#24292f] dark:text-[#c9d1d9] leading-relaxed mt-3 italic">
                  &ldquo;{platform.tagline}&rdquo;
                </p>

              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-[#d0d7de]/40 dark:border-[#30363d]/40 flex justify-end">
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-1 rounded-md border border-[#d0d7de] bg-white px-3.5 py-1.5 text-xs font-semibold shadow-xs transition hover:bg-[#eaeef2] dark:border-[#30363d] dark:bg-[#21262d] dark:text-[#c9d1d9] dark:hover:bg-[#30363d]`}
                >
                  Visit Profile
                  <ArrowUpRight size={13} className="ml-0.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Interactive Quick-Chat card */}
      <div className="rounded-lg border border-[#d0d7de] bg-white p-5 dark:border-[#30363d] dark:bg-[#161b22] text-center" id="social-footer-card">
        <MessageSquare size={32} className="mx-auto text-[#f78166] mb-2.5" />
        <h3 className="text-sm font-bold text-[#24292f] dark:text-[#f0f6fc]">Need a Custom Solution or Deep Technical Advice?</h3>
        <p className="text-xs text-[#57606a] dark:text-[#8b949e] max-w-lg mx-auto mt-1 leading-relaxed">
          You can always email me directly. Let&apos;s talk about custom enterprise integrations, full-stack migrations, or performant design architectures.
        </p>
        <div className="mt-4">
          <a
            href={`mailto:${bio.email}`}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#1f883d] hover:bg-[#167431] dark:bg-[#238636] dark:hover:bg-[#2ea043] px-4 py-2 text-xs font-bold text-white transition shadow-sm"
          >
            Send Direct Email Inquiry
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

    </div>
  );
}
