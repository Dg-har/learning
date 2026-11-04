import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

const stickers = [
  { text: 'coffee.exe ☕', color: 'var(--bright-orange)', x: '72%', y: '28%', rotate: -8 },
  { text: 'npm install pls', color: 'var(--neon-green)', x: '82%', y: '15%', rotate: 6 },
  { text: 'works on my machine 🙃', color: 'var(--sky-blue)', x: '75%', y: '62%', rotate: -5 },
  { text: '404: sleep not found', color: 'var(--hot-pink)', x: '85%', y: '45%', rotate: 7 },
  { text: 'git push --force 😈', color: 'var(--electric-purple-light)', x: '80%', y: '78%', rotate: -3 },
  { text: '> hello world', color: 'var(--neon-green)', x: '65%', y: '90%', rotate: 4 },
];

const titles = [
  'FULL-STACK DEVELOPER.',
  'FULL-TIME BUG WRANGLER 🐛',
  'PROFESSIONAL GOOGLER 🔎',
  'CAFFEINE-POWERED CODER ☕',
  'IDEA → SHIP → REPEAT 🚀',
];

const Hero = () => {
  const { x: mouseX, y: mouseY } = useMousePosition();
  const [titleIndex, setTitleIndex] = useState(0);
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(titles[0]);

  // Cycle title on hover
  useEffect(() => {
    if (!isHoveringTitle) return;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isHoveringTitle]);

  useEffect(() => {
    setDisplayTitle(titles[titleIndex]);
  }, [titleIndex]);

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
  const dx = mouseX - centerX;
  const dy = mouseY - centerY;

  return (
    <section
      id="hero"
      className="section-container"
      style={{
        background: 'transparent',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <div
        className="blob"
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'var(--electric-purple)',
          top: '-100px',
          right: '-100px',
        }}
      />
      <div
        className="blob"
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'var(--hot-pink)',
          bottom: '-100px',
          left: '-80px',
          animationDelay: '-4s',
        }}
      />

      {/* Dot grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Floating stickers */}
      {stickers.map((sticker, i) => (
        <motion.div
          key={i}
          className="sticker"
          style={{
            left: sticker.x,
            top: sticker.y,
            color: sticker.color,
            borderColor: sticker.color,
            rotate: sticker.rotate,
            opacity: 0.85,
          }}
          animate={{
            x: dx * (0.01 + i * 0.003),
            y: dy * (0.01 + i * 0.003),
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          initial={{ opacity: 0, scale: 0, rotate: sticker.rotate }}
          whileInView={{ opacity: 0.85, scale: 1 }}
          viewport={{ once: true }}
        >
          {sticker.text}
        </motion.div>
      ))}

      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hey badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,45,120,0.15)',
              border: '1.5px solid rgba(255,45,120,0.3)',
              borderRadius: '100px',
              padding: '0.4rem 1rem',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--hot-pink)',
              fontWeight: '600',
            }}
          >
            <span>👋</span>
            <span>YO, I'M ALIVE ON THE INTERNET</span>
          </motion.div>

          {/* Big name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              color: 'white',
              letterSpacing: '-0.03em',
              marginBottom: '0.5rem',
            }}
          >
            SAFAL
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, var(--hot-pink), var(--electric-purple-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            NEUPANE.
          </motion.h1>

          {/* Taglines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ marginBottom: '1rem' }}
          >
            {['I WRITE CODE.', 'I BREAK THINGS.', 'I FIX THEM.', 'SOMETIMES.'].map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
                  fontWeight: 700,
                  color: i === 3 ? 'var(--hot-pink)' : 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.05em',
                  lineHeight: 1.5,
                }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          {/* Role tag — hover to cycle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onMouseEnter={() => setIsHoveringTitle(true)}
            onMouseLeave={() => { setIsHoveringTitle(false); setTitleIndex(0); }}
            data-hover
            style={{
              display: 'inline-block',
              marginBottom: '2.5rem',
              padding: '0.6rem 1.2rem',
              background: isHoveringTitle ? 'rgba(57,255,20,0.1)' : 'rgba(255,255,255,0.06)',
              border: `2px solid ${isHoveringTitle ? 'var(--neon-green)' : 'rgba(255,255,255,0.15)'}`,
              borderRadius: '6px',
              transition: 'all 0.3s ease',
            }}
          >
            <motion.span
              key={displayTitle}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                fontWeight: 700,
                color: isHoveringTitle ? 'var(--neon-green)' : 'rgba(255,255,255,0.85)',
                letterSpacing: '0.05em',
              }}
            >
              {isHoveringTitle ? '> ' : ''}{displayTitle}
            </motion.span>
            {!isHoveringTitle && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginLeft: '0.75rem' }}>
                [hover me]
              </span>
            )}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <motion.button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              SEE MY STUFF ↓
            </motion.button>
            <motion.button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-outline"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.25)' }}
              whileHover={{ scale: 1.03, borderColor: 'white' }}
              whileTap={{ scale: 0.97 }}
            >
              LET'S TALK →
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: '-3rem',
            left: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em',
          }}
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >↓</motion.span>
          SCROLL DOWN
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
