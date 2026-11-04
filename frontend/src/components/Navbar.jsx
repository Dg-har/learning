import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useSound } from '../hooks/useSound';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { soundEnabled, setSoundEnabled } = useSound();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: '👋 ME', href: '#hero' },
    { label: '🧪 ABOUT', href: '#about' },
    { label: '🧠 SKILLS', href: '#skills' },
    { label: '🛠 PROJECTS', href: '#projects' },
    { label: '📬 TALK', href: '#contact' },
  ];

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
    setActive(href);
  };

  return (
    <>
      <nav className="navbar" style={{ boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.15)' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Logo */}
          <div className="nav-logo">
            <span style={{ color: 'var(--hot-pink)' }}>S</span>
            <span style={{ color: 'var(--electric-purple)' }}>N</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', marginLeft: '4px', letterSpacing: '0.05em' }}>
              .dev
            </span>
          </div>

          {/* Desktop links */}
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`nav-link ${active === link.href ? 'active' : ''}`}
                  style={{ background: 'none', border: active === link.href ? undefined : '1.5px solid transparent' }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Sound toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              style={{
                background: 'none',
                border: '1.5px solid var(--border-color)',
                borderRadius: '100px',
                padding: '0.35rem 0.7rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: '600',
                transition: 'all 0.2s',
              }}
              title="Toggle sound"
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: '1.5px solid var(--border-color)',
                borderRadius: '100px',
                padding: '0.35rem 0.7rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: '600',
                transition: 'all 0.2s',
              }}
              title="Toggle theme"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: '1.5px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.4rem 0.6rem',
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
              }}
              className="mobile-hamburger"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="mobile-menu-link"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{ background: 'none', border: 'none', color: 'var(--off-white)' }}
              >
                {link.label}
              </motion.button>
            ))}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={toggleTheme} style={{ background: 'none', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '0.5rem 1rem', color: 'white', fontSize: '1.2rem' }}>
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} style={{ background: 'none', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '0.5rem 1rem', color: 'white', fontSize: '1.2rem' }}>
                {soundEnabled ? '🔊' : '🔇'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
