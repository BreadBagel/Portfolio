import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { PortfolioData } from '../types';
import { EditableField } from './EditableField';

interface HeroProps {
  portfolio: PortfolioData;
  editing: boolean;
  onUpdate: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
}

export function Hero({ portfolio, editing, onUpdate }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (portfolio.roles.length < 2) return;
    const interval = window.setInterval(() => setRoleIndex((index) => (index + 1) % portfolio.roles.length), 2800);
    return () => window.clearInterval(interval);
  }, [portfolio.roles]);

  return (
    <section className="hero">
      <div className="hero-layout">
        <div className="hero-main">
          <motion.div className="hero-intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="hero-kicker"><span className="hero-kicker-mark">✳</span> INDEPENDENT CREATIVE DEVELOPER</span>
            <h1>Making digital<br /><span className="hero-serif">feel a little more</span><br /><span className="hero-gradient">human.</span></h1>
            {portfolio.roles.length > 0 && <div className="hero-role" aria-live="polite"><span>BUILDING</span><AnimatePresence mode="wait"><motion.span key={roleIndex} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: .22 }}>{portfolio.roles[roleIndex % portfolio.roles.length]}</motion.span></AnimatePresence></div>}
            <p className="hero-description"><EditableField value={portfolio.bio} editing={editing} onChange={(bio) => onUpdate('bio', bio)} /></p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={16} /></a>
              <a className="button button-quiet" href="#contact">Let’s talk <ArrowDownRight size={16} /></a>
            </div>
            <a className="scroll-cue" href="#about"><span className="scroll-cue-circle"><ArrowDownRight size={14} /></span> SCROLL TO EXPLORE</a>
          </motion.div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.18 }}>
            <div className="visual-orbit orbit-outer" /><div className="visual-orbit orbit-inner" />
            <div className="visual-glow" />
            <div className="visual-card">
              <img src={portfolio.avatar} alt={portfolio.name} className="hero-avatar" />
              <div className="visual-card-caption"><span className="visual-caption-overline">A PERSON, NOT AN ALGORITHM</span><span className="visual-caption-name">{portfolio.name}</span><span className="visual-caption-location">{portfolio.location}</span></div>
            </div>
            <div className="floating-note note-top"><span className="note-spark">✳</span> Design-minded <span className="note-slash">/</span> code-powered</div>
            <div className="floating-note note-bottom"><span className="note-dot" /> Currently open to good ideas</div>
            <span className="orbit-label orbit-label-top">CREATIVE DEV · 2026</span><span className="orbit-label orbit-label-bottom">⌁ AVAILABLE EVERYWHERE</span>
          </motion.div>
        </div>
      </div>
      <div className="hero-foot"><span>WEB DEVELOPMENT</span><span className="foot-star">✳</span><span>INTERACTION DESIGN</span><span className="foot-star">✳</span><span>GOOD ENERGY</span><span className="hero-index">01 — 04</span></div>
    </section>
  );
}
