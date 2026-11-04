import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';

const stats = [
  { icon: '🧠', label: 'Problem Solving', value: 88, color: 'var(--electric-purple-light)' },
  { icon: '⚡', label: 'Curiosity', value: 96, color: 'var(--sky-blue)' },
  { icon: '☕', label: 'Coffee Dependency', value: 99, color: 'var(--bright-orange)' },
  { icon: '🐛', label: 'Bug Fighting', value: 84, color: 'var(--neon-green)' },
  { icon: '🎨', label: 'UI Obsession', value: 91, color: 'var(--hot-pink)' },
  { icon: '😴', label: 'Sleep Schedule', value: 22, color: 'rgba(255,255,255,0.3)' },
];

const StatBar = ({ stat, animate }) => (
  <div style={{ marginBottom: '1.25rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
        {stat.icon} {stat.label}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: stat.color, fontWeight: 700 }}>
        {stat.value === 99 ? '∞' : `${stat.value}`}
      </span>
    </div>
    <div className="stat-bar-track">
      <motion.div
        className="stat-bar-fill"
        style={{ background: stat.color, width: animate ? `${stat.value}%` : '0%' }}
        initial={{ width: '0%' }}
        animate={{ width: animate ? `${stat.value}%` : '0%' }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
      />
    </div>
  </div>
);

const CharacterStats = () => {
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
      {/* Grid BG */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), 
                          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={staggerItem} className="section-label" style={{ color: 'var(--neon-green)' }}>
            // character.stats
          </motion.p>

          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.02em',
              marginBottom: '3rem',
            }}
          >
            CHARACTER{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--neon-green), var(--sky-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              STATS
            </span>
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: '2rem', alignItems: 'center' }}>
            {/* Stats panel */}
            <motion.div
              variants={staggerItem}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(57,255,20,0.2)',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 0 40px rgba(57,255,20,0.05)',
              }}
            >
              {/* Panel header */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.3)',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <span>SAFAL.EXE — v2.6.0</span>
                <span style={{ color: 'var(--neon-green)' }}>■ ONLINE</span>
              </div>

              {stats.map((stat) => (
                <StatBar key={stat.label} stat={stat} animate={inView} />
              ))}

              {/* Level and class */}
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>LEVEL</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--neon-green)' }}>23</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>CLASS</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--sky-blue)' }}>FULL-STACK DEV</div>
                </div>
              </div>
            </motion.div>

            {/* Extra info */}
            <motion.div variants={staggerItem}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}>
                Not your average developer stat sheet. No fake "95% React" bars here.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { label: 'SPECIAL ABILITY', value: 'Turns coffee into working software' },
                  { label: 'WEAKNESS', value: 'CSS centering on a bad day' },
                  { label: 'CURRENT QUEST', value: 'Ship something cool every week' },
                  { label: 'SIDE QUEST', value: 'Actually fix all the TODOs in my code' },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--neon-green)', fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'nowrap', paddingTop: '0.1rem' }}>
                      {item.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CharacterStats;
