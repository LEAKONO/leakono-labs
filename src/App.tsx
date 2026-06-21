import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/ui/Navbar';
import Hero from './components/hero/Hero';
import Architecture from './components/architecture/Architecture';
import Projects from './components/projects/Projects';
import Software from './components/software/Software';
import TechStack from './components/techstack/TechStack';
import Metrics from './components/metrics/Metrics';
import GitHub from './components/github/GitHub';
import Contact from './components/contact/Contact';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.title = 'Emmanuel Leakono — Data Engineer';
  }, []);

  return (
    <div
      className="relative min-h-screen bg-graphite-950"
      style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}
    >
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
          zIndex: 100,
          transformOrigin: '0%',
        }}
      />
      <Navbar />
      <main style={{ overflowX: 'hidden', width: '100%' }}>
        <Hero />
        <Architecture />
        <Projects />
        <Software />
        <TechStack />
        <Metrics />
        <GitHub />
        <Contact />
      </main>
    </div>
  );
}