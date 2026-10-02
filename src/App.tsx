import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { AdminPanel } from './components/AdminPanel';
import { EditableField } from './components/EditableField';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { loadPortfolio, savePortfolio } from './services/portfolioApi';
import type { PortfolioData, Project } from './types';

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [editing, setEditing] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [token, setToken] = useState(() => sessionStorage.getItem('portfolio-admin-token') ?? '');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    loadPortfolio().then(setPortfolio);
  }, []);

  useEffect(() => {
    if (!portfolio) return;
    const hash = window.location.hash.slice(1);
    if (hash) document.getElementById(hash)?.scrollIntoView();
  }, [portfolio]);

  const update = <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    setPortfolio((current) => current ? { ...current, [key]: value } : current);
  };

  const persist = async (value: PortfolioData) => {
    const result = await savePortfolio(value, token);
    setPortfolio(result.data);
    setSaveMessage(result.localOnly ? 'Saved on this device only — API unavailable.' : 'Changes saved.');
    window.setTimeout(() => setSaveMessage(''), 3500);
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const sender = String(formData.get('name') ?? '');
    const senderEmail = String(formData.get('email') ?? '');
    const message = String(formData.get('message') ?? '');
    const subject = encodeURIComponent(`Portfolio inquiry from ${sender}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${sender}\nEmail: ${senderEmail}`);
    window.location.href = `mailto:${portfolio.contact.email}?subject=${subject}&body=${body}`;
  };

  if (!portfolio) return <main className="loading-screen"><span className="loading-mark">M.</span><span>Loading portfolio</span></main>;

  const socialLinks = [
    { label: 'GitHub', href: portfolio.socials.github, icon: Github },
    { label: 'LinkedIn', href: portfolio.socials.linkedin, icon: Linkedin },
    { label: 'Email', href: `mailto:${portfolio.contact.email}`, icon: Mail },
  ].filter((link) => link.href);

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Go to home"><span className="wordmark-icon">m.</span><span>{portfolio.name}</span></a>
        <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {['about', 'work', 'experience', 'contact'].map((section) => (
            <a href={`#${section}`} key={section} onClick={() => setMobileMenuOpen(false)}>{section}</a>
          ))}
        </nav>
        <div className="topbar-actions">
          <a className="availability" href={`mailto:${portfolio.contact.email}`}><span className={`status-dot ${portfolio.available ? '' : 'status-dot-unavailable'}`} /> {portfolio.available ? 'Available for work' : 'Not taking projects'}</a>
          <button className="icon-button mobile-menu-button" aria-label="Toggle navigation" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <main id="home">
        <Hero portfolio={portfolio} editing={editing} onUpdate={update} />

        <motion.section id="about" className="section about-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }} variants={reveal}>
          <div className="section-heading">
            <div><span className="eyebrow"><span className="eyebrow-line" /> A LITTLE ABOUT ME</span><h2>Curious by nature.<br /><span className="text-muted">Intentional by design.</span></h2></div>
            <span className="section-index">01 / 04</span>
          </div>
          <div className="about-grid">
            <div className="about-copy glass-card">
              <span className="card-kicker"><Sparkles size={14} /> THE SHORT VERSION</span>
              <p><EditableField value={portfolio.about} editing={editing} onChange={(value) => update('about', value)} multiline /></p>
              <div className="about-location"><span className="location-ping" /> Based in {portfolio.location} <span className="location-divider">·</span> Working worldwide</div>
            </div>
            <div className="skills-panel">
              <span className="card-kicker">THINGS I WORK WITH</span>
              {portfolio.skills.map((group, index) => (
                <div className="skill-group" key={group.category}>
                  <div className="skill-group-label"><span className="skill-group-number">0{index + 1}</span>{group.category}</div>
                  <div className="skill-tags">{group.items.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="work" className="section projects-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={reveal}>
          <div className="section-heading">
            <div><span className="eyebrow"><span className="eyebrow-line" /> SELECTED WORK</span><h2>Things I’ve <span className="text-muted">made.</span></h2></div>
            <a className="text-link" href={portfolio.socials.github} target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={15} /></a>
          </div>
          <div className="project-grid">
            {portfolio.projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onSelect={setSelectedProject} />)}
          </div>
        </motion.section>

        <motion.section id="experience" className="section experience-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={reveal}>
          <div className="section-heading">
            <div><span className="eyebrow"><span className="eyebrow-line" /> THE JOURNEY</span><h2>Where I’ve <span className="text-muted">been.</span></h2></div>
            <span className="section-index">03 / 04</span>
          </div>
          <div className="timeline">
            {portfolio.experience.map((item, index) => (
              <article className="timeline-item" key={`${item.company}-${item.period}`}>
                <div className="timeline-rail"><span className={`timeline-dot ${index === 0 ? 'timeline-dot-active' : ''}`} />{index < portfolio.experience.length - 1 && <span className="timeline-line" />}</div>
                <div className="timeline-content">
                  <div className="timeline-meta"><span>{item.period}</span><span className="timeline-type">{item.type}</span></div>
                  <h3>{item.role}</h3><p className="experience-company">{item.company}</p>
                  <p className="experience-description">{item.description}</p>
                  <div className="skill-tags experience-tags">{item.skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" className="section contact-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
          <div className="contact-card glass-card">
            <div className="contact-glow" />
            <div className="contact-content">
              <span className="eyebrow"><span className="eyebrow-line" /> HAVE A GOOD ONE IN MIND?</span>
              <h2>Let’s make<br /><span className="gradient-text">something matter.</span></h2>
              <p>Have a project, an opportunity, or just want to talk shop? My inbox is always open.</p>
              <a className="button button-primary" href={`mailto:${portfolio.contact.email}`}>Say hello <ArrowUpRight size={16} /></a>
            </div>
            <div className="contact-aside">
              <span className="card-kicker">GET IN TOUCH</span>
              <a className="contact-email" href={`mailto:${portfolio.contact.email}`}><EditableField value={portfolio.contact.email} editing={editing} onChange={(value) => update('contact', { ...portfolio.contact, email: value })} /><ArrowUpRight size={14} /></a>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <label htmlFor="contact-name">YOUR NAME</label><input id="contact-name" name="name" placeholder="Jane Smith" required />
                <label htmlFor="contact-email">EMAIL ADDRESS</label><input id="contact-email" name="email" type="email" placeholder="jane@example.com" required />
                <label htmlFor="contact-message">A LITTLE ABOUT IT</label><textarea id="contact-message" name="message" placeholder="Tell me what you have in mind..." rows={3} required />
                <button className="button button-primary contact-submit" type="submit">Send a message <ArrowUpRight size={14} /></button>
              </form>
              <div className="social-links">{socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} aria-label={label} target={label === 'Email' ? undefined : '_blank'} rel="noreferrer"><Icon size={17} /></a>)}</div>
              <span className="contact-note"><span className="status-dot" /> Usually replies within 2–3 days</span>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <a className="wordmark footer-wordmark" href="#home"><span className="wordmark-icon">m.</span><span>Designed & built with care.</span></a>
        <span>© {new Date().getFullYear()} Martin Villanueva</span>
        <a className="back-to-top" href="#home">Back to top <ArrowDown size={14} /></a>
      </footer>

      <button className={`edit-trigger ${token ? 'edit-authenticated' : ''}`} onClick={() => setAdminOpen(true)} aria-label="Open portfolio editor"><span className="edit-trigger-dot" /> {token ? 'Edit site' : 'Admin'}</button>
      {saveMessage && <div className="save-toast" role="status">{saveMessage}</div>}
      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        portfolio={portfolio}
        token={token}
        onAuthenticated={(nextToken) => { setToken(nextToken); sessionStorage.setItem('portfolio-admin-token', nextToken); setEditing(true); }}
        onSignOut={() => { setToken(''); setEditing(false); sessionStorage.removeItem('portfolio-admin-token'); }}
        onSave={persist}
        onEditingChange={setEditing}
        editing={editing}
      />
      <AnimatePresence>
        {selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </div>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.article className="project-dialog glass-card" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.22 }}>
        <button className="icon-button dialog-close" onClick={onClose} aria-label="Close project details"><X size={19} /></button>
        <span className="eyebrow"><span className="eyebrow-line" /> PROJECT DEEP DIVE</span>
        <h2>{project.name}</h2><p>{project.details}</p>
        <div className="skill-tags">{project.tags.map((tag) => <span key={tag} className="skill-tag">{tag}</span>)}</div>
        <div className="dialog-links">{project.demoUrl && <a className="button button-primary" href={project.demoUrl} target="_blank" rel="noreferrer">View project <ArrowUpRight size={15} /></a>}{project.githubUrl && <a className="button button-quiet" href={project.githubUrl} target="_blank" rel="noreferrer"><Github size={15} /> Source code</a>}</div>
      </motion.article>
    </motion.div>
  );
}
