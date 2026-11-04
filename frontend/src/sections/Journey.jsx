import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';
import { timeline } from '../data/timeline';

const Journey = () => {
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
        color: 'var(--text-primary)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={staggerItem} className="section-label" style={{ color: 'var(--bright-orange)' }}>
            // timeline.roadtrip
          </motion.p>

          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '3.5rem',
            }}
          >
            THE{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--bright-orange), var(--hot-pink))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              JOURNEY 🗺️
            </span>
          </motion.h2>

          <div className="timeline-road">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="timeline-item"
                variants={staggerItem}
              >
                {/* Dot */}
                <div className="timeline-dot">
                  <span style={{ fontSize: '0.7rem' }}>{item.emoji}</span>
                </div>

                {/* Content */}
                <div style={{
                  background: 'var(--card-bg)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: i === timeline.length - 1
                    ? '0 0 0 3px var(--border-color), 4px 4px 0 var(--border-color)'
                    : '4px 4px 0 var(--border-color)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--bright-orange)',
                    letterSpacing: '0.1em',
                    marginBottom: '0.25rem',
                  }}>
                    {item.year}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    marginBottom: '0.5rem',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;
