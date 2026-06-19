import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, MapPin } from 'lucide-react';
import TopologyCanvas from './TopologyCanvas';
import StatusBar from './StatusBar';
import heroPhoto from '../../assets/hero.png';

const HEADLINE_WORDS = ['BUILDING', 'DATA', 'PLATFORMS', 'THAT', 'SCALE'];

const ROLES = [
  'Data Engineering',
  'Pipeline Architecture',
  'Cloud Infrastructure',
  'Analytics Engineering',
  'Backend Systems',
];

export default function Hero() {
  const scrollToNext = () => {
    document.querySelector('#architecture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-graphite-950"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-100" />

      {/* Topology canvas */}
      <TopologyCanvas />

      {/* Radial fade overlay — keeps center readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, #080a0f 80%)',
        }}
      />

      {/* Top status line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-20 left-0 right-0 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#6e7681] tracking-widest uppercase">
            Engineering Command Center · v2.0.0
          </span>
          <span className="font-mono text-[10px] text-[#6e7681]">
            sys.status: <span className="text-cyan-glow">ONLINE</span>
          </span>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-1 h-4 bg-cyan-glow rounded-full" />
              <span className="section-label">Data Engineer · Software Engineer</span>
            </motion.div>

            {/* Headline */}
            <div className="mb-6">
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                  className={`inline-block mr-4 text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-none ${
                    word === 'DATA' || word === 'SCALE'
                      ? 'text-cyan-glow'
                      : 'text-white'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="text-[#8b949e] text-lg leading-relaxed max-w-lg mb-2"
            >
              Designing pipelines, cloud infrastructure, analytics systems,
              APIs, and production software.
            </motion.p>

            {/* Role tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {ROLES.map((role) => (
                <span key={role} className="tag">{role}</span>
              ))}
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15 }}
              className="flex items-center gap-2 mb-8 text-[#6e7681]"
            >
              <MapPin size={13} />
              <span className="font-mono text-xs">Nairobi, Kenya</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button onClick={scrollToNext} className="btn-primary">
                <ArrowDown size={16} />
                Explore Systems
              </button>
              <a href="/resume.pdf" download className="btn-ghost">
                <Download size={16} />
                Download Resume
              </a>
              
                href="https://github.com/LEAKONO"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Github size={16} />
                GitHub
              </a>
            </motion.div>

            {/* Status bar */}
            <StatusBar />
          </div>

          {/* Right — profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Outer glow rings */}
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #00d4ff20, #8b5cf620, #00d4ff20)',
                  transform: 'scale(1.15)',
                  animation: 'spin 12s linear infinite',
                }}
              />
              <div className="absolute inset-0 rounded-full border border-cyan-glow/20"
                style={{ transform: 'scale(1.08)' }}
              />

              {/* Photo container */}
              <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-2 border-cyan-glow/30"
                style={{ boxShadow: '0 0 60px rgba(0,212,255,0.2), 0 0 120px rgba(0,212,255,0.08)' }}
              >
                <img
                  src={heroPhoto}
                  alt="Emmanuel Leakono"
                  className="w-full h-full object-cover object-top"
                />
                {/* Scan overlay */}
                <div className="absolute inset-0 scan-line pointer-events-none" />
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{ background: 'linear-gradient(to top, #080a0f40, transparent)' }}
                />
              </div>

              {/* Floating metric badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-8 top-1/4 glass rounded-xl p-3 border border-white/10"
              >
                <div className="font-mono text-xs text-[#8b949e]">Pipelines</div>
                <div className="font-mono text-xl font-bold text-cyan-glow">6+</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-8 bottom-1/4 glass rounded-xl p-3 border border-white/10"
              >
                <div className="font-mono text-xs text-[#8b949e]">Tech Stack</div>
                <div className="font-mono text-xl font-bold text-cyan-glow">20+</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-4 top-8 glass rounded-xl p-3 border border-white/10"
              >
                <div className="font-mono text-xs text-[#8b949e]">dbt Models</div>
                <div className="font-mono text-xl font-bold text-cyan-glow">30+</div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-[#6e7681] tracking-widest uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-cyan-glow" />
        </motion.div>
      </motion.div>

      {/* Spin keyframe */}
      <style>{`
        @keyframes spin {
          from { transform: scale(1.15) rotate(0deg); }
          to { transform: scale(1.15) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}