import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';

const obsessions = [
  { text: 'React Native', icon: '📱' },
  { text: 'AI & LLMs', icon: '🤖' },
  { text: 'Full Stack Development', icon: '🔄' },
  { text: 'UI/UX Design', icon: '🎨' },
  { text: 'Building in public', icon: '🚀' },
  { text: 'Clean architecture', icon: '🏗️' },
  { text: 'Performance optimization', icon: '⚡' },
];

const CurrentlyObsessed = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= obsessions.length) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [inView]);

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
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={staggerItem} className="section-label" style={{ color: 'var(--electric-purple-light)' }}>
            // current_state.json
          </motion.p>

          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '2.5rem',
            }}
          >
            CURRENTLY{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--electric-purple-light), var(--hot-pink))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              OBSESSED WITH
            </span>
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {obsessions.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={i < visibleCount ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.5rem',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
                whileHover={{ borderColor: 'rgba(155,93,229,0.5)', x: 4 }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--electric-purple-light)', fontWeight: 700 }}>→</span>
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}>
                  {item.text}
                </span>
                {i === 0 && (
                  <span style={{
                    marginLeft: 'auto',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--neon-green)',
                    background: 'rgba(57,255,20,0.1)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '100px',
                    border: '1px solid rgba(57,255,20,0.2)',
                  }}>
                    MAIN FOCUS
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentlyObsessed;
