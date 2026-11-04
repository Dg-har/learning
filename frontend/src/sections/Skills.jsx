import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';
import { skills } from '../data/skills';

const SkillPill = ({ skill }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="skill-pill"
      whileHover={{ scale: 1.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
      data-hover
    >
      <span style={{ fontSize: '1.1rem' }}>{skill.icon}</span>
      <span>{skill.name}</span>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 10px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--dark-navy)',
              border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: '8px',
              padding: '0.5rem 0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--sky-blue)',
              whiteSpace: 'nowrap',
              zIndex: 10,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
          >
            "{skill.quote}"
            {/* Arrow */}
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgba(0,212,255,0.3)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const categories = [
    { key: 'frontend', label: '⚛ Frontend', color: 'var(--sky-blue)' },
    { key: 'backend', label: '🟢 Backend', color: 'var(--neon-green)' },
    { key: 'database', label: '🍃 Database', color: 'var(--bright-orange)' },
    { key: 'tools', label: '🛠 Tools', color: 'var(--hot-pink)' },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        background: 'transparent',
        padding: 'var(--section-padding) clamp(1.5rem, 5vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background dot grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(0,212,255,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={staggerItem} className="section-label" style={{ color: 'var(--sky-blue)' }}>
            // toolbox.js
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
            MY{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--sky-blue), var(--neon-green))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              TOOLBOX 🧰
            </span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '3.5rem',
            }}
          >
            hover to reveal the truth behind each skill →
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {categories.map((cat) => (
              <motion.div key={cat.key} variants={staggerItem}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: cat.color,
                  letterSpacing: '0.1em',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <span style={{ width: '20px', height: '2px', background: cat.color, display: 'inline-block' }} />
                  {cat.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  {skills[cat.key].map((skill) => (
                    <SkillPill key={skill.name} skill={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note at the bottom */}
          <motion.p
            variants={staggerItem}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.2)',
              marginTop: '3rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '1.5rem',
            }}
          >
            // No fake percentage bars. These are real tools I use daily.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
