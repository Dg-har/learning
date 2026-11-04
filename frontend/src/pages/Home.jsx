import { motion } from 'framer-motion';
import { pageTransition } from '../animations/variants';
import Hero from '../sections/Hero';
import About from '../sections/About';
import CharacterStats from '../sections/CharacterStats';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Journey from '../sections/Journey';
import BugsDefeated from '../sections/BugsDefeated';
import CurrentlyObsessed from '../sections/CurrentlyObsessed';
import TerminalSection from '../sections/TerminalSection';
import Contact from '../sections/Contact';

const Footer = () => (
  <footer style={{
    background: 'transparent',
    borderTop: '1px solid var(--border-color)',
    padding: '2rem clamp(1.5rem, 5vw, 6rem)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
  }}>
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.75rem',
      color: 'var(--text-secondary)',
      opacity: 0.6,
    }}>
      © 2026 Safal Neupane — Built with ☕ and too many tabs open.
    </div>
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.72rem',
      color: 'var(--text-secondary)',
      opacity: 0.5,
    }}>
      React + Vite + Node.js + MongoDB
    </div>
  </footer>
);

const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <Hero />
      <About />
      <CharacterStats />
      <Skills />
      <Projects />
      <Journey />
      <BugsDefeated />
      <CurrentlyObsessed />
      <TerminalSection />
      <Contact />
      <Footer />
    </motion.div>
  );
};

export default Home;
