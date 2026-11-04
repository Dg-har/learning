import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp } from '../animations/variants';

const funFacts = [
  { icon: '☕', label: 'Coffee consumed', value: '∞', sub: 'cups and counting' },
  { icon: '🐛', label: 'Bugs defeated', value: '999+', sub: 'probably more' },
  { icon: '💻', label: 'Tabs currently open', value: '47', sub: 'at any given time' },
  { icon: '🎧', label: 'Coding soundtrack', value: 'LOFI', sub: '/ ROCK / WHATEVER' },
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      className="section-container"
      ref={ref}
      style={{
        background: 'transparent',
        color: 'var(--text-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '40%',
        height: '100%',
        background: 'linear-gradient(135deg, transparent, rgba(255,107,53,0.08))',
        pointerEvents: 'none',
      }} />

      {/* Scribble decorations */}
      <svg
        style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.12, width: '200px' }}
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M10,100 Q50,20 100,100 Q150,180 190,100" stroke="var(--bright-orange)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M10,120 Q50,40 100,120 Q150,200 190,120" stroke="var(--bright-orange)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section label */}
          <motion.p variants={staggerItem} className="section-label" style={{ color: 'var(--bright-orange)' }}>
            // about.js
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '3rem',
            }}
          >
            SO...{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--bright-orange), var(--hot-pink))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              WHO AM I?
            </span>
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))', gap: '4rem', alignItems: 'start' }}>
            {/* Text */}
            <motion.div variants={staggerItem}>
              {[
                "I'm Safal Neupane.",
                "A developer who enjoys turning random ideas into things that actually work.",
                "Sometimes I write clean code.",
                "Sometimes I stare at the same bug for 3 hours and then realize I forgot a semicolon.",
                "Both are part of the process.",
                "I'm currently obsessed with building full-stack apps, making things that feel good to use, and shipping fast.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  variants={staggerItem}
                  style={{
                    fontFamily: i === 0 ? 'var(--font-display)' : 'var(--font-body)',
                    fontSize: i === 0 ? 'clamp(1.4rem, 3.5vw, 2rem)' : '1.05rem',
                    fontWeight: i === 0 ? 800 : 400,
                    color: 'var(--text-primary)',
                    opacity: i === 0 ? 1 : 0.8,
                    marginBottom: '1rem',
                    lineHeight: 1.7,
                  }}
                >
                  {text}
                </motion.p>
              ))}

              {/* Availability badge */}
              <motion.div
                variants={staggerItem}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(57,255,20,0.1)',
                  border: '2px solid rgba(57,255,20,0.3)',
                  borderRadius: '100px',
                }}
              >
                <span style={{
                  width: '8px',
                  height: '8px',
                  background: 'var(--neon-green)',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite',
                }} />
                <style>{`@keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }`}</style>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--neon-green-muted)' }}>
                  OPEN TO OPPORTUNITIES
                </span>
              </motion.div>
            </motion.div>

            {/* Fun facts */}
            <motion.div variants={staggerItem}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--bright-orange)',
                opacity: 0.7,
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}>
                // fun_facts.json
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {funFacts.map((fact, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, rotate: (i % 2 === 0 ? -1 : 1) }}
                    style={{
                      background: 'var(--card-bg)',
                      border: '2px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      boxShadow: '4px 4px 0 var(--border-color)',
                    }}
                  >
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{fact.icon}</div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      fontWeight: 900,
                      color: 'var(--bright-orange)',
                      lineHeight: 1,
                    }}>
                      {fact.value}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      opacity: 0.5,
                      marginTop: '0.25rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      {fact.sub}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
