import { ArrowUpRight, Github } from 'lucide-react';
import { motion } from 'motion/react';
import type { CSSProperties } from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.article
      className={`project-card project-${project.accent}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.09 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
      }}
    >
      <button className="project-art-button" onClick={() => onSelect(project)} aria-label={`Read more about ${project.name}`}>
        <div className={`project-art art-${project.visual}`}>
          <div className="art-grain" />
          {project.visual === 'sound' && <div className="soundscape">{Array.from({ length: 33 }, (_, i) => <span key={i} style={{ '--bar': `${12 + Math.abs(Math.sin(i * 1.17) * Math.cos(i * 0.31)) * 85}%`, '--phase': `${i * -0.075}s` } as CSSProperties} />)}</div>}
          {project.visual === 'orbit' && <div className="orbit-art"><i /><i /><i /><b>m.</b><span>01</span></div>}
          {project.visual === 'grid' && <div className="grid-art"><span>01</span><span>02</span><span>03</span><span>04</span><i>SYS<br />READY</i></div>}
          <span className="project-art-label">{project.category}</span><span className="project-art-index">0{index + 1}</span>
        </div>
      </button>
      <div className="project-info">
        <button className="project-title-button" onClick={() => onSelect(project)}><h3>{project.name}</h3><ArrowUpRight size={17} /></button>
        <p>{project.description}</p>
        <div className="project-footer"><div className="skill-tags">{project.tags.slice(0, 3).map((tag) => <span className="skill-tag" key={tag}>{tag}</span>)}</div>{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`View ${project.name} on GitHub`} onClick={(event) => event.stopPropagation()}><Github size={16} /></a>}</div>
      </div>
    </motion.article>
  );
}
