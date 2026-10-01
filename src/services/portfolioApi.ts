import fallbackData from '../data/portfolioData.json';
import type { PortfolioData } from '../types';

const LOCAL_KEY = 'portfolio-content';
const bundledAvatar = new URL('../assets/images/PFP.jpg', import.meta.url).href;

function withBundledAvatar(data: PortfolioData): PortfolioData {
  return data.avatar.startsWith('/src/assets/') ? { ...data, avatar: bundledAvatar } : data;
}

export async function loadPortfolio(): Promise<PortfolioData> {
  try {
    const response = await fetch('/api/portfolio');
    if (!response.ok) throw new Error(`Portfolio API returned ${response.status}`);
    return withBundledAvatar(await response.json() as PortfolioData);
  } catch (error) {
    console.warn('Portfolio API is unavailable; using local content.', error);
    const local = localStorage.getItem(LOCAL_KEY);
    return local ? withBundledAvatar(JSON.parse(local) as PortfolioData) : withBundledAvatar(fallbackData as PortfolioData);
  }
}

export async function savePortfolio(data: PortfolioData, token: string): Promise<{ data: PortfolioData; localOnly: boolean }> {
  try {
    const response = await fetch('/api/portfolio/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const result = await response.json() as { error?: string };
      throw new Error(result.error ?? `Portfolio API returned ${response.status}`);
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    return { data: withBundledAvatar(await response.json() as PortfolioData), localOnly: false };
  } catch (error) {
    if (error instanceof TypeError) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
      return { data, localOnly: true };
    }
    throw error;
  }
}

export async function authenticateAdmin(password: string): Promise<string> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const result = await response.json() as { token?: string; error?: string };
  if (!response.ok || !result.token) throw new Error(result.error ?? 'Unable to authenticate.');
  return result.token;
}
