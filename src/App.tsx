import { useEffect, useState } from 'react';
import type { ChangeEvent, CSSProperties, FormEvent, ReactNode } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CloudCog,
  Check,
  ChevronDown,
  Code2,
  Component,
  Copy,
  Github,
  Linkedin,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MoveUpRight,
  PanelsTopLeft,
  Save,
  Sparkles,
  X,
  Workflow,
} from 'lucide-react';
import { Aurora, GlassCard, GradientText, SlippyWords } from 'performative-ui';
import type { SlippyWord } from 'performative-ui';
import { authenticateAdmin, loadPortfolio, savePortfolio } from './services/portfolioApi';
import type { PortfolioData, Project } from './types';
import type { ServiceOffering } from './types';

const projectFilters = ['All', 'React', 'Architecture', 'Design System', 'Automation'] as const;
type ProjectFilter = (typeof projectFilters)[number];

const sectionLinks = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const skillCategories = [
  { title: 'Frontend', keywords: ['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind CSS'] },
  { title: 'Languages', keywords: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
  { title: 'Architecture', keywords: ['Node.js', 'Express', 'PostgreSQL', 'AWS', 'AuroraDB', 'Workflow automation', 'n8n'] },
  { title: 'Styling', keywords: ['Tailwind CSS', 'HTML & CSS', 'Figma', 'Responsive design'] },
  { title: 'Automation & assistance', keywords: ['n8n', 'Workflow automation', 'AI-assisted workflows', 'Virtual assistance', 'Initial HR screening', 'Administrative support', 'Process coordination'] },
];

const automationWordRows: SlippyWord[][] = [
  [
    { label: 'n8n workflow automation', key: 'n8n', gradient: true },
    'Virtual assistance',
    'AI-assisted HR screening',
    'Process coordination',
    'Administrative support',
    { label: 'n8n workflow automation', key: 'n8n-repeat', gradient: true },
    'Virtual assistance',
    'AI-assisted HR screening',
    'Process coordination',
    'Administrative support',
  ],
  [
    'Human-reviewed AI',
    'Initial candidate screening',
    'Digital operations',
    'Task coordination',
    'Repeatable processes',
    'Human-reviewed AI',
    'Initial candidate screening',
    'Digital operations',
    'Task coordination',
    'Repeatable processes',
  ],
];

const defaultServices: ServiceOffering[] = [
  {
    title: 'Responsive web development',
    description: 'Turn your idea into a clean, responsive web experience that feels at home on every screen.',
    deliverables: ['React interfaces', 'Responsive layouts', 'Accessible interactions'],
    icon: 'web',
  },
  {
    title: 'Interface implementation',
    description: 'Bring product screens and visual direction to life with careful component work and attention to detail.',
    deliverables: ['Reusable UI components', 'Polished interaction states', 'Thoughtful visual details'],
    icon: 'interface',
  },
  {
    title: 'Quality & cloud support',
    description: 'Get an extra pair of hands for testing, deployment preparation, and the data behind your application.',
    deliverables: ['Quality assurance', 'AWS deployment preparation', 'Database workflows'],
    icon: 'cloud',
  },
];

const serviceIcons = {
  web: PanelsTopLeft,
  interface: Component,
  cloud: CloudCog,
  automation: Workflow,
};

type AuroraBlob = { color: string; x: number; y: number; size: number };

const auroraPalettes: AuroraBlob[][] = [
  [
    { color: 'rgba(19, 116, 139, .48)', x: 18, y: 18, size: 100 },
    { color: 'rgba(19, 122, 100, .4)', x: 78, y: 38, size: 92 },
    { color: 'rgba(30, 70, 132, .42)', x: 45, y: 86, size: 94 },
  ],
  [
    { color: 'rgba(60, 174, 197, .44)', x: 23, y: 28, size: 96 },
    { color: 'rgba(50, 112, 176, .46)', x: 82, y: 28, size: 92 },
    { color: 'rgba(31, 64, 130, .48)', x: 55, y: 84, size: 98 },
  ],
];

const MotionGlassCard = motion.create(GlassCard);

function ScrollAurora() {
  const [paletteIndex, setPaletteIndex] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updatePalette = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const nextIndex = Math.floor(window.scrollY / Math.max(window.innerHeight, 1)) % auroraPalettes.length;
        setPaletteIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex);
      });
    };

    window.addEventListener('scroll', updatePalette, { passive: true });
    window.addEventListener('resize', updatePalette);
    updatePalette();
    return () => {
      window.removeEventListener('scroll', updatePalette);
      window.removeEventListener('resize', updatePalette);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!portfolio) return <main className="loading-screen"><span className="loading-mark">M.</span><span>Loading portfolio</span></main>;

  const socialLinks = [
    { label: 'GitHub', href: portfolio.socials.github, icon: Github },
    { label: 'LinkedIn', href: portfolio.socials.linkedin, icon: Linkedin },
    { label: 'Email', href: `mailto:${portfolio.contact.email}`, icon: Mail },
  ].filter((link) => link.href);

  return (
    <div className="portfolio-aurora" aria-hidden="true">
      {auroraPalettes.map((blobs, index) => (
        <motion.div
          className="portfolio-aurora-layer"
          key={index}
          animate={{ opacity: paletteIndex === index ? 1 : 0 }}
          transition={{ duration: 1.4, ease: [.22, 1, .36, 1] }}
        >
          <Aurora className="portfolio-aurora-field" blobs={blobs} blur={42} />
        </motion.div>
      ))}
    </div>
  );
}

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [editing, setEditing] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [token, setToken] = useState(() => sessionStorage.getItem('portfolio-admin-token') ?? '');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    let active = true;
    loadPortfolio().then((data) => { if (active) setPortfolio(data); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!selectedProject) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  const update = <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    setPortfolio((current) => current ? { ...current, [key]: value } : current);
  };

  const persist = async (data: PortfolioData) => {
    const result = await savePortfolio(data, token);
    setPortfolio(result.data);
    setToast(result.localOnly ? 'Saved on this device · API unavailable' : 'Portfolio synced successfully');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio?.contact.email ?? '');
      setEmailCopied(true);
      setToast('Email address copied to clipboard');
      window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      setToast('Could not copy automatically · select the email address instead');
    }
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!portfolio) return;
    const formData = new FormData(event.currentTarget);
    const sender = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const inquiryType = String(formData.get('inquiry') ?? 'General inquiry');
    const message = String(formData.get('message') ?? '');
    const subject = encodeURIComponent(`${inquiryType} — ${sender}`);
    const body = encodeURIComponent(`${message}\n\nInquiry: ${inquiryType}\nFrom: ${sender}\nEmail: ${email}`);
    window.location.href = `mailto:${portfolio.contact.email}?subject=${subject}&body=${body}`;
    setToast('Your email draft is ready to send');
    event.currentTarget.reset();
  };

  if (!portfolio) {
    return <main className="loading-screen"><span className="loading-mark">m.</span><span>Loading portfolio</span></main>;
  }

  const filteredProjects = portfolio.projects.filter((project) => (
    activeFilter === 'All' || project.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase())
  ));
  const socialLinks = [
    { label: 'GitHub', href: portfolio.socials.github, icon: Github },
    { label: 'LinkedIn', href: portfolio.socials.linkedin, icon: Linkedin },
  ].filter((link) => link.href);
  const uniqueSkills = new Set(portfolio.skills.flatMap((group) => group.items));
  const services = portfolio.services?.length ? portfolio.services : defaultServices;

  return (
    <MotionConfig reducedMotion="user">
    <div className="portfolio">
      <ScrollAurora />
      <header className="nav-wrap">
        <a className="brand" href="#home" aria-label="Home">
          <span className="brand-mark">m.</span>
          <span>{portfolio.name}<small>Developer &amp; designer</small></span>
        </a>
        <nav className={`nav-links ${mobileMenuOpen ? 'nav-links-open' : ''}`} aria-label="Main navigation">
          {sectionLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className={`status-pill ${portfolio.available ? '' : 'status-pill-away'}`} href={`mailto:${portfolio.contact.email}`}>
            <span className="status-light" />{portfolio.available ? 'Available for work' : 'Not taking projects'}
          </a>
          <button className="admin-toggle" onClick={() => setAdminOpen(true)}>
            {token ? 'Edit mode' : 'Admin'} <MoveUpRight size={13} />
          </button>
          <button className="mobile-nav-toggle" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}>
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <main id="home">
        <section className="intro section-wrap">
          <motion.div className="intro-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, ease: [.22, 1, .36, 1] }}>
            <div className="overline"><span className="overline-dot" /> INDEPENDENT CREATIVE DEVELOPER</div>
            <h1>Thoughtful by nature.<br /><GradientText className="gradient-title">Precise by design.</GradientText></h1>
            <p className="intro-description">
              <EditableField value={portfolio.bio} editing={editing} onChange={(bio) => update('bio', bio)} />
            </p>
            <div className="intro-meta">
              <span className="location-badge"><MapPin size={13} />{portfolio.location}</span>
              <span className="intro-separator" />
              <span className="intro-note">Open to freelance &amp; early-career roles</span>
            </div>
            <div className="intro-actions">
              <a className="action-primary" href="#work">Explore selected work <ArrowUpRight size={15} /></a>
              <a className="action-secondary" href="#contact">Get in touch <ArrowDownRight size={15} /></a>
            </div>
          </motion.div>
          <motion.div className="intro-portrait" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .12 }}>
            <div className="portrait-topline"><span>INDEPENDENT · MANILA</span><span>14° 35′ N</span></div>
            <div className="portrait-frame">
              <img src={portfolio.avatar} alt={portfolio.name} />
              <div className="portrait-caption"><span>A LITTLE CURIOSITY GOES A LONG WAY</span><strong>{portfolio.name}</strong></div>
            </div>
            <div className="portrait-footline"><span>Design-minded <i>×</i> Code-powered</span><span>01 — 04</span></div>
          </motion.div>
        </section>

        <section className="metrics section-wrap" aria-label="Portfolio overview">
          {[
            { value: String(portfolio.projects.length).padStart(2, '0'), label: 'Project snapshots' },
            { value: String(portfolio.experience.length).padStart(2, '0'), label: 'Roles & milestones' },
            { value: String(uniqueSkills.size).padStart(2, '0'), label: 'Tools in my kit' },
            { value: '03', label: 'Ways to work together' },
          ].map((metric) => (
            <div className="metric" key={metric.label}><span className="metric-value">{metric.value}</span><span className="metric-label">{metric.label}</span></div>
          ))}
        </section>

        <section className="automation-section section-wrap" aria-labelledby="automation-heading">
          <div className="automation-copy">
            <span className="section-eyebrow"><span />AUTOMATION &amp; VIRTUAL ASSISTANCE</span>
            <h2 id="automation-heading">Less busywork.<br /><GradientText className="gradient-title">More human focus.</GradientText></h2>
            <p>I build practical n8n workflows and provide virtual assistance for the tasks that keep good work moving. My AI-assisted HR screening workflow supports the initial process—with people, not AI, making hiring decisions.</p>
            <a className="automation-link" href="#work">See the HR workflow <ArrowUpRight size={14} /></a>
          </div>
          <div className="automation-skills">
            <span className="automation-skills-label">WAYS I CAN HELP</span>
            <SlippyWords
              rows={automationWordRows}
              className="automation-slippy"
              aria-label="Virtual assistance, n8n workflow automation, AI-assisted HR screening and process coordination skills"
              intensity={150}
              gap={9}
            />
          </div>
        </section>

        <section className="content-section section-wrap" id="work">
          <SectionHeading number="01" eyebrow="SELECTED WORK" title={<>A few things<br /><GradientText className="gradient-title">made with care.</GradientText></>} />
          <div className="filter-row" aria-label="Filter projects">
            <span className="filter-caption">SHOW ME</span>
            {projectFilters.map((filter) => (
              <button key={filter} className={`filter-chip ${activeFilter === filter ? 'filter-chip-active' : ''}`} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>
                {filter}
              </button>
            ))}
            <span className="filter-count">{filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}</span>
          </div>
          <div className="work-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onSelect={setSelectedProject} />
              ))}
            </AnimatePresence>
          </div>
          {filteredProjects.length === 0 && (
            <div className="empty-filter">No projects in this category just yet. <button onClick={() => setActiveFilter('All')}>Show all projects <ArrowRight size={13} /></button></div>
          )}
        </section>

        <section className="services-section section-wrap" id="services">
          <SectionHeading number="02" eyebrow="WAYS I CAN HELP" title={<>Good work starts<br /><GradientText className="gradient-title">with your goals.</GradientText></>} />
          <p className="services-intro">Need a thoughtful front end, dependable virtual assistance, or an n8n workflow to take repetitive steps off your plate? Let’s find the right scope for your project.</p>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon] ?? PanelsTopLeft;
              return (
                <GlassCard className="service-card" key={service.title}>
                  <div className="service-card-top"><span className="service-index">0{index + 1}</span><span className="service-icon"><Icon size={17} /></span></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-deliverables">{service.deliverables.map((deliverable) => <span key={deliverable}><Check size={12} />{deliverable}</span>)}</div>
                  <a href={`mailto:${portfolio.contact.email}?subject=${encodeURIComponent(`Let's discuss ${service.title}`)}`} className="service-cta">Discuss your project <ArrowUpRight size={13} /></a>
                </GlassCard>
              );
            })}
          </div>
          <div className="process-note"><span className="process-note-label">HOW I WORK</span><span>Listen first</span><i>→</i><span>Agree on the scope</span><i>→</i><span>Build, share, refine</span><i>→</i><span>Clear updates, no surprises</span></div>
        </section>

        <section className="about-section section-wrap" id="about">
          <SectionHeading number="03" eyebrow="A LITTLE ABOUT ME" title={<>A curious mind,<br /><GradientText className="gradient-title">always at work.</GradientText></>} />
          <div className="about-layout">
            <GlassCard className="about-note">
              <span className="note-index"><Sparkles size={14} /> THE SHORT VERSION</span>
              <p><EditableField value={portfolio.about} editing={editing} onChange={(about) => update('about', about)} multiline /></p>
              <div className="about-location"><span className="location-dot" /> Based in {portfolio.location} <span>·</span> Working worldwide</div>
            </GlassCard>
            <div className="skills-matrix">
              <div className="skills-matrix-heading"><div><span className="overline">THE TOOLKIT</span><h3>Skills &amp; strengths</h3></div><span>{uniqueSkills.size} skills</span></div>
              {skillCategories.map((category, index) => {
                const skills = [...new Set([
                  ...portfolio.skills.flatMap((group) => group.items).filter((skill) => category.keywords.includes(skill)),
                  ...category.keywords.filter((skill) => portfolio.skills.some((group) => group.items.includes(skill))),
                ])];
                return (
                  <div className="matrix-row" key={category.title}>
                    <span className="matrix-index">0{index + 1}</span>
                    <div className="matrix-category"><h4>{category.title}</h4><div className="skill-pills">{skills.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}</div></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="experience-section section-wrap" id="experience">
          <SectionHeading number="04" eyebrow="EXPERIENCE" title={<>A path shaped<br /><GradientText className="gradient-title">by doing.</GradientText></>} />
          <div className="timeline">
            {portfolio.experience.map((item, index) => (
              <details className="timeline-entry" key={`${item.company}-${item.period}`} open={index === 0}>
                <summary>
                  <span className={`timeline-marker ${index === 0 ? 'timeline-marker-current' : ''}`} />
                  <span className="timeline-date">{item.period}</span>
                  <span className="timeline-summary"><strong>{item.role}</strong><span>{item.company}</span></span>
                  <span className="timeline-type">{item.type}</span>
                  <ChevronDown className="timeline-chevron" size={16} />
                </summary>
                <div className="timeline-details"><p>{item.description}</p><div className="skill-pills">{item.skills.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}</div></div>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <SectionHeading number="05" eyebrow="LET'S CONNECT" title={<>Good things start<br /><GradientText className="gradient-title">with hello.</GradientText></>} />
          <div className="contact-layout">
            <div className="contact-copy">
              <p>Hiring for an early-career role? Looking for help with a web project? Share what you have in mind and let’s see if we’re a good fit.</p>
              <button className="email-copy" onClick={copyEmail}><span><Mail size={15} />{portfolio.contact.email}</span>{emailCopied ? <Check size={15} /> : <Copy size={14} />}</button>
              <div className="social-row">
                {socialLinks.map(({ label, href, icon: Icon }) => <a href={href} key={label} target="_blank" rel="noreferrer"><Icon size={15} />{label}<ArrowUpRight size={12} /></a>)}
              </div>
            </div>
            <form className="contact-form" onSubmit={submitContact}>
              <div className="contact-field"><label htmlFor="contact-name">YOUR NAME</label><input id="contact-name" name="name" placeholder="Jane Smith" autoComplete="name" required /></div>
              <div className="contact-field"><label htmlFor="contact-email">EMAIL ADDRESS</label><input id="contact-email" name="email" type="email" placeholder="jane@example.com" autoComplete="email" required /></div>
              <div className="contact-field contact-field-wide"><label htmlFor="contact-inquiry">I'M GETTING IN TOUCH ABOUT</label><select id="contact-inquiry" name="inquiry" defaultValue="Freelance project">
                <option>Freelance project</option><option>Job opportunity</option><option>Collaboration</option><option>Something else</option>
              </select></div>
              <div className="contact-field contact-field-wide"><label htmlFor="contact-message">WHAT'S ON YOUR MIND?</label><textarea id="contact-message" name="message" rows={3} placeholder="A little about your project..." required /></div>
              <button className="action-primary form-submit" type="submit">Start a conversation <ArrowUpRight size={14} /></button>
              <span className="form-note">Opens a new message in your email app.</span>
            </form>
          </div>
        </section>
      </main>

      <footer className="page-footer section-wrap">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">m.</span><span>Made with intention.<small>© {new Date().getFullYear()} {portfolio.name}</small></span></a>
        <a className="footer-top" href="#home">Back to top <ArrowUpRight size={13} /></a>
      </footer>

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
      <AnimatePresence>
        {toast && <motion.div className="toast" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><Check size={15} />{toast}</motion.div>}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}

function SectionHeading({ number, eyebrow, title }: { number: string; eyebrow: string; title: ReactNode }) {
  return (
    <div className="section-heading">
      <div><span className="section-eyebrow"><span />{eyebrow}</span><h2>{title}</h2></div>
      <span className="section-number">{number} <i>/ 05</i></span>
    </div>
  );
}

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (project: Project) => void }) {
  return (
    <MotionGlassCard className="project-card" layout initial={{ opacity: 0, y: 13 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: .24, ease: [.22, 1, .36, 1] }}>
      <button className={`project-preview preview-${project.accent}`} onClick={() => onSelect(project)} aria-label={`Open ${project.name} details`}>
        <ProjectArtwork visual={project.visual} />
        <span className="preview-category">{project.category}</span><span className="preview-number">0{index + 1}</span>
        <span className="preview-open"><MoveUpRight size={15} /></span>
      </button>
      <div className="project-content">
        <div className="project-heading-row"><div><span className="project-eyebrow">{project.category}</span><h3>{project.name}</h3></div><button className="project-detail-link" onClick={() => onSelect(project)} aria-label={`Read more about ${project.name}`}><ArrowUpRight size={17} /></button></div>
        <p>{project.description}</p>
        <div className="project-tag-list">{project.tags.slice(0, 4).map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}</div>
        {project.performanceBadge && <span className="project-badge"><Check size={11} />{project.performanceBadge}</span>}
        <div className="project-actions">
          {project.demoUrl ? <a href={project.demoUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={12} /></a> : <span className="project-link-muted">Project details <ArrowRight size={12} /></span>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer"><Github size={13} />Source</a>}
        </div>
      </div>
    </MotionGlassCard>
  );
}

function ProjectArtwork({ visual }: { visual: string }) {
  if (visual === 'workflow') {
    return <div className="workflow-art" aria-hidden="true"><span className="workflow-node workflow-trigger">NEW<br />APPLICANT</span><span className="workflow-node workflow-ai">AI-ASSISTED<br />INITIAL SCREEN</span><span className="workflow-node workflow-human">HUMAN<br />REVIEW</span><i className="workflow-edge edge-one" /><i className="workflow-edge edge-two" /><b className="workflow-human-note">PEOPLE DECIDE</b><small className="art-caption">N8N · HUMAN-IN-THE-LOOP</small></div>;
  }
  if (visual === 'sound') {
    return <div className="sound-art" aria-hidden="true"><div className="sound-ring sound-ring-one" /><div className="sound-ring sound-ring-two" /><div className="sound-wave">{Array.from({ length: 37 }, (_, index) => <span key={index} style={{ '--wave-height': `${16 + Math.abs(Math.sin(index * 1.17) * Math.cos(index * .31)) * 83}%` } as CSSProperties} />)}</div><span className="art-caption">AUDIO · ANALYSIS</span></div>;
  }
  if (visual === 'orbit') {
    return <div className="orbit-art" aria-hidden="true"><span /><span /><span /><b>m.</b><i className="orbit-star">✳</i><i className="orbit-index">01</i><small className="art-caption">THOUGHTFUL BY DESIGN</small></div>;
  }
  return <div className="grid-art" aria-hidden="true"><span /><span /><span /><span /><b>SYS<br />READY</b><small className="art-caption">QUALITY · DELIVERY</small></div>;
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.article className="dialog-card" initial={{ opacity: 0, y: 15, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: .99 }} transition={{ duration: .2 }}>
        <button className="dialog-close" onClick={onClose} aria-label="Close project details"><X size={18} /></button>
        <span className="section-eyebrow"><span />PROJECT NOTES</span><span className="dialog-category">{project.category}</span>
        <h2>{project.name}</h2><p>{project.details}</p>
        <div className="project-tag-list">{project.tags.map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}</div>
        <div className="dialog-actions">{project.demoUrl && <a className="action-primary" href={project.demoUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14} /></a>}{project.githubUrl && <a className="action-secondary" href={project.githubUrl} target="_blank" rel="noreferrer"><Github size={14} />Source code <ArrowUpRight size={12} /></a>}</div>
      </motion.article>
    </motion.div>
  );
}

function EditableField({ value, editing, onChange, multiline = false }: { value: string; editing: boolean; onChange: (value: string) => void; multiline?: boolean }) {
  if (!editing) return <>{value}</>;
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value);
  return multiline
    ? <textarea className="inline-edit inline-edit-multiline" value={value} onChange={handleChange} rows={4} aria-label="Edit portfolio text" />
    : <input className="inline-edit" value={value} onChange={handleChange} aria-label="Edit portfolio text" />;
}

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
  token: string;
  onAuthenticated: (token: string) => void;
  onSignOut: () => void;
  onSave: (data: PortfolioData) => Promise<void>;
  onEditingChange: (editing: boolean) => void;
  editing: boolean;
}

function AdminPanel({ open, onClose, portfolio, token, onAuthenticated, onSignOut, onSave, onEditingChange, editing }: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [json, setJson] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { setJson(JSON.stringify(portfolio, null, 2)); }, [portfolio, open]);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      onAuthenticated(await authenticateAdmin(password));
      setPassword('');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to sign in.');
    }
  };

  const save = async () => {
    setError('');
    let parsed: PortfolioData;
    try {
      parsed = JSON.parse(json) as PortfolioData;
      if (!parsed.name || !parsed.contact?.email || !Array.isArray(parsed.projects) || !Array.isArray(parsed.experience) || !Array.isArray(parsed.skills)) {
        throw new Error('Include a name, contact email, projects, experience, and skills.');
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Portfolio JSON is not valid.');
      return;
    }
    setSaving(true);
    try {
      await onSave(parsed);
      onClose();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`admin-backdrop ${open ? 'admin-backdrop-open' : ''}`} aria-hidden={!open} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="admin-panel" role="dialog" aria-modal="true" aria-label="Portfolio editor">
        <div className="admin-header"><div className="admin-heading-icon"><Code2 size={18} /></div><div><span className="card-kicker">PORTFOLIO CMS</span><h2>Content editor</h2></div><button className="icon-button admin-close" onClick={onClose} aria-label="Close editor"><X size={18} /></button></div>
        {!token ? (
          <form className="admin-login" onSubmit={login}>
            <span className="login-lock"><LockKeyhole size={20} /></span><h3>Admin access</h3><p>Sign in to edit and publish your portfolio content.</p>
            <label htmlFor="admin-password">Admin password</label><input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            {error && <p className="admin-error" role="alert">{error}</p>}<button className="action-primary admin-submit" type="submit">Sign in <span>→</span></button>
            <p className="admin-hint">Configure <code>ADMIN_PASSWORD</code> and <code>JWT_SECRET</code> on your API server.</p>
          </form>
        ) : (
          <div className="admin-editor">
            <div className="admin-auth-status"><span className="status-dot" /> Authenticated as administrator<button onClick={onSignOut}><LogOut size={14} /> Sign out</button></div>
            <div className="admin-editor-intro"><h3>Edit your content</h3><p>Use inline editing for your intro and bio, or update your complete portfolio JSON here.</p></div>
            <button className={`inline-mode-button ${editing ? 'inline-mode-active' : ''}`} onClick={() => onEditingChange(!editing)}><span>{editing ? <Check size={15} /> : <Code2 size={15} />}</span>{editing ? 'Inline editing enabled' : 'Enable inline editing'}<span className="mode-switch">{editing ? 'ON' : 'OFF'}</span></button>
            <label className="json-label" htmlFor="portfolio-json">PORTFOLIO DATA <span>JSON</span></label>
            <textarea id="portfolio-json" className="json-editor" spellCheck={false} value={json} onChange={(event) => setJson(event.target.value)} />
            <div className="admin-editor-footer"><span className="admin-security-note"><LockKeyhole size={13} /> Protected by JWT authentication</span><button className="action-primary" onClick={save} disabled={saving}><Save size={15} /> {saving ? 'Saving…' : 'Save changes'}</button></div>
            {error && <p className="admin-error" role="alert">{error}</p>}
          </div>
        )}
      </aside>
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
