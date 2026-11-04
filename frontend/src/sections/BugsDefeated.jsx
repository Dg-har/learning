import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';

const bugs = [
  { icon: '🐛', name: 'undefined is not a function', status: 'DEFEATED', color: 'var(--neon-green)' },
  { icon: '😤', name: 'CSS refusing to center', status: 'DEFEATED', color: 'var(--neon-green)' },
  { icon: '📦', name: 'npm dependency hell', status: 'SURVIVED', color: 'var(--sky-blue)' },
  { icon: '💻', name: '"works on my machine"', status: 'STILL INVESTIGATING', color: 'var(--bright-orange)' },
  { icon: '🔥', name: 'CORS in production', status: 'DEFEATED (eventually)', color: 'var(--neon-green)' },
  { icon: '⏰', name: 'timezone bugs at 2AM', status: 'SURVIVED', color: 'var(--sky-blue)' },
  { icon: '🎭', name: 'async/await callback hell', status: 'DEFEATED', color: 'var(--neon-green)' },
  { icon: '📱', name: 'Safari being Safari', status: 'ONGOING BATTLE', color: 'var(--hot-pink)' },
];

const BugItem = ({ bug, index }) => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      onClick={() => setUnlocked(true)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-hover
      style={{
        background: unlocked ? 'rgba(57,255,20,0.05)' : 'var(--card-bg)',
        border: `2px solid ${unlocked ? 'rgba(57,255,20,0.3)' : 'var(--border-color)'}`,
        borderRadius: '10px',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
        <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{bug.icon}</span>
        <div style={{ minWidth: 0 }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {bug.name}
          </p>
          <AnimatePresence>
            {unlocked && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.35)',
                  marginTop: '0.1rem',
                }}
              >
                🏆 Achievement unlocked!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          fontWeight: 700,
          color: bug.color,
          padding: '0.2rem 0.6rem',
          background: `${bug.color}18`,
          border: `1.5px solid ${bug.color}40`,
          borderRadius: '100px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        {bug.status}
      </motion.span>
    </motion.div>
  );
};

const BugsDefeated = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      style={{
        background: 'transparent',
        padding: 'var(--section-padding) clamp(1.5rem, 5vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={staggerItem} className="section-label" style={{ color: 'var(--hot-pink)' }}>
            // bugs.hall_of_fame
          </motion.p>

          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            BUGS I'VE{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--hot-pink), var(--bright-orange))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              FOUGHT 🐛
            </span>
          </motion.h2>

          <motion.p variants={staggerItem} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '2.5rem',
          }}>
            click any bug to unlock the achievement →
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))', gap: '0.75rem' }}>
            {bugs.map((bug, i) => (
              <BugItem key={i} bug={bug} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BugsDefeated;
