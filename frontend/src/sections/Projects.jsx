import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';
import api from '../services/api';
import { projects as fallbackProjects } from '../data/projects';

const statusConfig = {
  completed: { label: 'COMPLETED', color: 'var(--neon-green)', barWidth: '100%' },
  'in-progress': { label: 'IN PROGRESS', color: 'var(--sky-blue)', barWidth: '60%' },
  'coming-soon': { label: 'COMING SOON', color: 'var(--bright-orange)', barWidth: '20%' },
  locked: { label: 'LOCKED 🔒', color: 'rgba(255,255,255,0.3)', barWidth: '0%' },
};

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const status = statusConfig[project.status] || statusConfig.completed;

  return (
    <motion.div
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ rotateY: 2, rotateX: -1 }}
      style={{
        transformStyle: 'preserve-3d',
        borderColor: hovered ? 'var(--sky-blue)' : 'var(--border-color)',
      }}
      data-hover
    >
      {/* Level badge */}
      <div className="level-badge" style={{ marginBottom: '0.5rem' }}>
        LEVEL {String(index + 1).padStart(2, '0')}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
        fontWeight: 900,
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        marginBottom: '0.5rem',
        lineHeight: 1.1,
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        color: 'var(--text-secondary)',
        marginBottom: '1.5rem',
        lineHeight: 1.6,
      }}>
        {hovered && project.longDescription ? project.longDescription : project.description}
      </p>

      {/* Status bar */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
            STATUS
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: status.color, fontWeight: 700 }}>
            {status.label}
          </span>
        </div>
        <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', background: status.color, borderRadius: '2px' }}
            initial={{ width: '0%' }}
            animate={{ width: status.barWidth }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
      </div>

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: '4px',
                color: 'var(--sky-blue)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            🚀 LIVE DEMO
          </motion.a>
        )}
        {project.githubUrl && project.status !== 'locked' && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            📂 SOURCE
          </motion.a>
        )}
        {project.status === 'locked' && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            opacity: 0.5,
            padding: '0.5rem 0',
          }}>
            🔒 Stay tuned...
          </span>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    api.get('/projects').then((res) => {
      if (res.data.data?.length > 0) setProjects(res.data.data);
    }).catch(() => {});
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        background: 'transparent',
        padding: 'var(--section-padding) clamp(1.5rem, 5vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blobs */}
      <div className="blob" style={{ position: 'absolute', width: '400px', height: '400px', background: 'var(--sky-blue)', top: '-100px', right: '10%' }} />
      <div className="blob" style={{ position: 'absolute', width: '300px', height: '300px', background: 'var(--electric-purple)', bottom: '-50px', left: '5%', animationDelay: '-3s' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={staggerItem} className="section-label" style={{ color: 'var(--sky-blue)' }}>
            // projects.map()
          </motion.p>

          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
            }}
          >
            STUFF I'VE{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--sky-blue), var(--neon-green))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              BUILT 🧪
            </span>
          </motion.h2>

          <motion.p variants={staggerItem} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '3rem',
          }}>
            hover cards to reveal more →
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '1.5rem',
          }}>
            {projects.map((project, i) => (
              <motion.div key={project._id} variants={staggerItem}>
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
