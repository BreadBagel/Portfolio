/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  date: string; // YYYY-MM-DD
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
