/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import OverviewTab from './components/OverviewTab';
import SocialsTab from './components/SocialsTab';
import ExperienceEducationTab from './components/ExperienceEducationTab';
import CertificationsTab from './components/CertificationsTab';

import {
  bioInfo,
  initialIssues
} from './data/mockData';
import { BioInfo, Issue, CommitDay } from './types';

// Helper to generate 365 days of realistic github activity
const generateInitialCommits = (): CommitDay[] => {
  const commitDays: CommitDay[] = [];
  const today = new Date();
  
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    const dayOfWeek = d.getDay();
    let count = 0;
    
    // Seed clusters of activity (realistic patterns)
    const activePeriod = Math.floor(Math.random() * 5) > 1; // 60% general active days
    if (activePeriod) {
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Weekend: less commits
        count = Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0;
      } else {
        // Weekday: more commits
        count = Math.random() > 0.25 ? Math.floor(Math.random() * 7) + 1 : 0;
      }
    }
    
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count > 2 && count <= 4) level = 2;
    else if (count > 4 && count <= 6) level = 3;
    else if (count > 6) level = 4;
    
    commitDays.push({ date: dateStr, count, level });
  }
  return commitDays;
};

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('gh-portfolio-theme');
    if (saved) return saved === 'dark';
    // Default to dark mode to match GitHub developer aesthetic
    return true;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Core state modules
  const [bio, setBio] = useState<BioInfo>(bioInfo);
  const [issues, setIssues] = useState<Issue[]>(() => {
    const saved = localStorage.getItem('gh-portfolio-issues');
    return saved ? JSON.parse(saved) : initialIssues;
  });


  // Contribution history map
  const [commitHistory, setCommitHistory] = useState<CommitDay[]>(generateInitialCommits);

  // Terminal Workshop live stream logs
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '# Terminal initialized.',
    '# Welcome to Git Commit Workshop v1.0',
    '# Try filling the contribution calendar by typing messages in the Contributions tab.'
  ]);

  // Notifications bell badge count
  const [notificationCount, setNotificationCount] = useState(2);

  // Sync dark mode class with root document elements
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('gh-portfolio-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('gh-portfolio-theme', 'light');
    }
  }, [darkMode]);

  // Persist issues changes to localStorage
  useEffect(() => {
    localStorage.setItem('gh-portfolio-issues', JSON.stringify(issues));
  }, [issues]);



  // Handler for incoming inquiries notifications
  const handleNewIssueNotification = () => {
    setNotificationCount(prev => prev + 1);
  };

  // Trigger quick Terminal focus
  const handleRunTerminal = () => {
    setActiveTab('contributions');
    setTerminalLogs(prev => [
      ...prev,
      `$ cd workspace/developer-portfolio`,
      `$ git status`,
      `On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean`
    ]);
  };

  // No projects section: provide empty pinned list for overview
  const pinnedRepos = [];

  // Render correct Tab content based on navigation state
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            bio={bio}
            setActiveTab={setActiveTab}
          />
        );
      case 'experience':
        return (
          <ExperienceEducationTab />
        );
      case 'certifications':
        return (
          <CertificationsTab />
        );
      case 'contact':
        return (
          <SocialsTab
            bio={bio}
          />
        );
      default:
        return <OverviewTab bio={bio} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#24292f] transition-colors duration-200 dark:bg-[#0d1117] dark:text-[#c9d1d9] selection:bg-[#fd8c73]/30 font-sans" id="gh-root">
      {/* 1. Header component */}
      <Header
        setActiveTab={setActiveTab}
      />

      {/* 2. Top Banner / Profile Overview Header Tabs (GitHub profile look) */}
      <div className="border-b border-[#d0d7de] bg-[#f6f8fa] dark:border-[#30363d] dark:bg-[#161b22] px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-end h-12 gap-2 pl-72 lg:pl-80 text-sm font-medium">
          {[
            { id: 'overview', label: 'Overview', count: null },
            { id: 'experience', label: 'Experience & Edu', count: null },
            { id: 'certifications', label: 'Certifications', count: null },
            { id: 'contact', label: 'Social Medias', count: null }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 pb-2.5 border-b-2 font-semibold text-xs leading-normal transition-all hover:border-[#d0d7de] dark:hover:border-[#30363d] cursor-pointer ${
                  isActive
                    ? 'border-[#f78166] text-[#24292f] dark:text-[#f0f6fc]'
                    : 'border-transparent text-[#57606a] dark:text-[#8b949e]'
                }`}
                id={`top-tab-${tab.id}`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className="rounded-full bg-[#eaeef2] px-1.5 py-0.2 text-[10px] text-[#57606a] dark:bg-[#30363d] dark:text-[#8b949e]">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Split Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row gap-6 lg:gap-8" id="gh-main-content">
        
        {/* Left Column: Sidebar details */}
        <Sidebar
          bio={bio}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openIssuesCount={issues.filter(i => i.state === 'open').length}
        />

        {/* Right Column: Tab Content */}
        <div className="flex-1 min-w-0" id="main-content-display">
          
          {/* Mobile navigation tab header list */}
          <div className="flex overflow-x-auto pb-2 border-b border-[#d0d7de] dark:border-[#30363d] md:hidden mb-4 scrollbar-thin">
            <div className="flex gap-2">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'experience', label: 'Experience & Edu' },
                { id: 'certifications', label: 'Certifications' },
                { id: 'contact', label: 'Social Medias' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full px-4 py-1 text-xs font-semibold shrink-0 transition-all ${
                      isActive
                        ? 'bg-[#24292f] text-white dark:bg-[#c9d1d9] dark:text-[#0d1117]'
                        : 'bg-[#f6f8fa] text-[#57606a] border border-[#d0d7de] dark:bg-[#21262d] dark:text-[#8b949e] dark:border-[#30363d]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active component displays */}
          {renderTabContent()}

        </div>

      </main>

      {/* Footer Block */}
      <footer className="border-t border-[#d0d7de] py-8 text-center text-xs text-[#57606a] dark:border-[#30363d] dark:text-[#8b949e] mt-auto" id="portfolio-footer">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-1.5 font-sans">
            <span className="font-bold text-xs text-[#24292f] dark:text-[#c9d1d9] font-sans">Martin C. Villanueva</span>
            <span className="text-[#57606a] dark:text-[#8b949e] font-sans">|</span>
            <span className="text-[11px] text-[#57606a] dark:text-[#8b949e] font-sans font-medium">Developer Portfolio</span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center font-sans text-[11px]">
            <button onClick={() => setActiveTab('overview')} className="hover:text-[#0969da] dark:hover:text-[#58a6ff] cursor-pointer">Home</button>
            <button onClick={() => setActiveTab('overview')} className="hover:text-[#0969da] dark:hover:text-[#58a6ff] cursor-pointer">Projects</button>
            <button onClick={() => setActiveTab('experience')} className="hover:text-[#0969da] dark:hover:text-[#58a6ff] cursor-pointer">Experience</button>
            <button onClick={() => setActiveTab('certifications')} className="hover:text-[#0969da] dark:hover:text-[#58a6ff] cursor-pointer">Certifications</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-[#0969da] dark:hover:text-[#58a6ff] cursor-pointer">Contact</button>
          </div>
          <span>&copy; {new Date().getFullYear()} Martin C. Villanueva. Operational: v4.2.0-stable</span>
        </div>
      </footer>
    </div>
  );
}
