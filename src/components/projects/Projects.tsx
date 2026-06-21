import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';
import ProjectPlatform from './ProjectPlatform';
import { PROJECTS } from '../../data/portfolio';

type Filter = 'all' | 'data' | 'active' | 'production';

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All Systems', value: 'all' },
  { label: 'Data Pipelines', value: 'data' },
  { label: 'Active', value: 'active' },
  { label: 'Production', value: 'production' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filtered = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'data') return p.category === 'data';
    return p.status === activeFilter;
  });

  return (
    <section id="projects" className="py-32 relative">
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)',
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel
          label="02 · Flagship Systems"
          title="Data Engineering Platforms"
          subtitle="Production-grade pipelines built end-to-end. Each system is a full platform — not a script."
        />

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all duration-200 ${
                activeFilter === f.value
                  ? 'bg-cyan-glow text-graphite-950 font-700'
                  : 'glass text-[#8b949e] hover:text-white hover:border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}

          {/* Count indicator */}
          <div className="ml-auto flex items-center gap-2 px-3 py-2 glass rounded-lg">
            <div className="status-dot" />
            <span className="font-mono text-xs text-[#8b949e]">
              {filtered.length} system{filtered.length !== 1 ? 's' : ''} online
            </span>
          </div>
        </motion.div>

        {/* Project grid */}
        <motion.div
          layout
          className="space-y-6"
        >
          <AnimateFiltered projects={filtered} />
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4
                     glass rounded-2xl p-6 border border-white/5"
        >
          <div>
            <p className="font-mono text-xs text-cyan-glow tracking-widest uppercase mb-1">
              Open Source
            </p>
            <p className="text-white font-semibold">All projects are on GitHub</p>
            <p className="text-[#8b949e] text-sm mt-1">
              Full source code, README documentation, and architecture diagrams.
            </p>
          </div>
          <a
            href="https://github.com/LEAKONO"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0 whitespace-nowrap"
          >
            View All Repositories
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Separate component to handle AnimatePresence per project
import { AnimatePresence } from 'framer-motion';
import type { Project } from '../../types';

function AnimateFiltered({ projects }: { projects: Project[] }) {
  return (
    <AnimatePresence mode="popLayout">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          layout
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.3 }}
        >
          <ProjectPlatform project={project} index={i} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}