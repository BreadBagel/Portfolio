/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Code } from 'lucide-react';

interface HeaderProps {
  setActiveTab: (tab: string) => void;
}

export default function Header({
  setActiveTab,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-[#f6f8fa] px-4 text-[#24292f] transition-colors dark:border-[#30363d] dark:bg-[#161b22] dark:text-[#c9d1d9]" id="gh-header">
      {/* Left side: Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2 font-bold tracking-tight text-[#24292f] dark:text-[#f0f6fc] hover:opacity-80 focus:outline-none"
          id="portfolio-logo-btn"
        >
          <Code size={24} className="text-[#f78166]" />
          <span className="hidden text-sm font-semibold sm:inline">BreadBagel</span>
        </button>
      </div>
    </header>
  );
}
