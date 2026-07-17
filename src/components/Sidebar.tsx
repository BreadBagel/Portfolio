/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  MapPin,
  Link as LinkIcon,
  Mail,
  Twitter,
  Building,
  Users,
  Layout,
  BookOpen,
  Calendar,
  AlertCircle,
  Briefcase,
  Compass,
  Award
} from 'lucide-react';
import { BioInfo } from '../types';

interface SidebarProps {
  bio: BioInfo;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openIssuesCount: number;
}

export default function Sidebar({
  bio,
  activeTab,
  setActiveTab,
  openIssuesCount
}: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Layout },
    { id: 'experience', label: 'Experience & Edu', icon: Briefcase },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Social Medias', icon: Compass, count: null }
  ];

  return (
    <aside className="w-full shrink-0 flex-col md:w-72 lg:w-80" id="gh-sidebar">
      {/* Profile Card Info */}
      <div className="flex flex-col gap-4">
        {/* Avatar and Main Identifiers */}
        <div className="flex flex-row items-center gap-4 md:flex-col md:items-start md:gap-3">
          {/* Avatar frame */}
          <div className="relative group h-20 w-20 shrink-0 md:h-64 md:w-64 lg:h-72 lg:w-72 overflow-hidden rounded-full border border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-gradient-to-br dark:from-[#1f6feb] dark:to-[#238636] shadow-xl">
            <img
              src={bio.avatar}
              alt={bio.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${bio.username}`;
              }}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Status Indicator Bubble */}
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full border border-[#d0d7de] bg-white text-xs shadow-md dark:border-[#30363d] dark:bg-[#161b22]" title="Current Status">
              💬
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#24292f] dark:text-[#f0f6fc] leading-tight">
              {bio.name}
            </h1>
            <p className="text-sm md:text-base font-light text-[#57606a] dark:text-[#8b949e]">
              {bio.username}
            </p>
          </div>
        </div>

        {/* Bio Description */}
        <div className="mt-1">
          <p className="text-sm text-[#24292f] dark:text-[#c9d1d9] leading-relaxed">
            {bio.bio}
          </p>
        </div>

        {/* Contact Links */}
        <div className="flex flex-col gap-2 border-t border-[#d0d7de] pt-3 text-xs text-[#24292f] dark:border-[#30363d] dark:text-[#c9d1d9]">
          {bio.company && (
            <div className="flex items-center gap-2">
              <Building size={14} className="text-[#57606a] dark:text-[#8b949e]" />
              <span className="font-semibold">{bio.company}</span>
            </div>
          )}
          {bio.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#57606a] dark:text-[#8b949e]" />
              <span>{bio.location}</span>
            </div>
          )}
          {bio.email && (
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-[#57606a] dark:text-[#8b949e]" />
              <a href={`mailto:${bio.email}`} className="hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline truncate">
                {bio.email}
              </a>
            </div>
          )}
          {bio.website && (
            <div className="flex items-center gap-2">
              <LinkIcon size={14} className="text-[#57606a] dark:text-[#8b949e]" />
              <a href={bio.website} target="_blank" rel="noreferrer" className="hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline truncate">
                {bio.website}
              </a>
            </div>
          )}
        </div>


        {/* Sidebar Navigation - Exact Requested element! */}
        <div className="border-t border-[#d0d7de] pt-3 dark:border-[#30363d] flex flex-col gap-1" id="sidebar-navigation">
          <h3 className="text-xs font-bold text-[#24292f] dark:text-[#f0f6fc] mb-2">Navigation</h3>
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs font-medium transition ${
                    isActive
                      ? 'bg-[#eaeef2] text-[#24292f] dark:bg-[#21262d] dark:text-[#f0f6fc]'
                      : 'text-[#24292f] hover:bg-[#f6f8fa] dark:text-[#c9d1d9] dark:hover:bg-[#161b22]'
                  }`}
                  id={`nav-${item.id}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={14} className={isActive ? 'text-[#0969da] dark:text-[#58a6ff]' : 'text-[#57606a] dark:text-[#8b949e]'} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count !== null && (
                    <span className="rounded-full px-2 py-0.5 text-[10px] bg-[#eaeef2] text-[#57606a] dark:bg-[#30363d] dark:text-[#8b949e]">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
