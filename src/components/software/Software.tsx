import { motion } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';
import SoftwareCard from './SoftwareCard';
import { SOFTWARE_PROJECTS } from '../../data/portfolio';

// Capability badges shown at the top
const CAPABILITIES = [
  { label: 'REST API Design', color: '#00d4ff' },
  { label: 'Auth Systems', color: '#10b981' },
  { label: 'Database Modeling', color: '#8b5cf6' },
  { label: 'React Frontend', color: '#38bdf8' },
  { label: 'Node.js Backend', color: '#22c55e' },
  { label: 'Flask / Django', color: '#f59e0b' },
  { label: 'MongoDB', color: '#10b981' },
  { label: 'PostgreSQL', color: '#6366f1' },
  { label: 'JWT / OAuth', color: '#ef4444' },
  { label: 'Docker', color: '#0ea5e9' },
];

// Architecture overview diagram
function FullStackDiagram() {
  const layers = [
    {
      label: 'Presentation Layer',
      items: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
      color: '#38bdf8',
      side: 'Frontend',
    },
    {
      label: 'API Gateway',
      items: ['REST APIs', 'JWT Auth', 'Rate Limiting', 'Validation'],
      color: '#00d4ff',
      side: 'Interface',
    },
    {
      label: 'Business Logic',
      items: ['Node.js / Express', 'Flask / Django', 'Services', 'Controllers'],
      color: '#10b981',
      side: 'Backend',
    },
    {
      label: 'Data Layer',
      items: ['MongoDB', 'PostgreSQL', 'ORM / ODM', 'Migrations'],
      color: '#8b5cf6',
      side: 'Database',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 mb-12"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-4 bg-cyan-glow rounded-full" />
        <span className="font-mono text-[10px] tracking-widest text-[#6e7681] uppercase">
          Full-Stack Architecture Overview
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-xl p-4 relative overflow-hidden"
            style={{
              background: `${layer.color}08`,
              border: `1px solid ${layer.color}25`,
            }}
          >
            {/* Side label */}
            <div
              className="absolute top-3 right-3 font-mono text-[9px]
                         tracking-widest px-1.5 py-0.5 rounded"
              style={{
                background: `${layer.color}15`,
                color: layer.color,
                border: `1px solid ${layer.color}30`,
              }}
            >
              {layer.side}
            </div>

            {/* Layer number */}
            <div
              className="font-mono text-3xl font-black mb-3 opacity-10"
              style={{ color: layer.color }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>

            <p
              className="font-mono text-xs font-600 mb-3"
              style={{ color: layer.color }}
            >
              {layer.label}
            </p>

            <div className="space-y-1.5">
              {layer.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: layer.color }}
                  />
                  <span className="text-[#8b949e] text-[11px] font-mono">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Connector arrow — between layers on desktop */}
            {i < layers.length - 1 && (
              <div className="hidden lg:block absolute -right-3 top-1/2
                              -translate-y-1/2 z-10">
                <div
                  className="w-6 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${layer.color}50, transparent)`,
                  }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Data flow arrows on mobile/tablet */}
      <div className="lg:hidden flex justify-center mt-4">
        <div className="flex flex-col items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-px h-4 bg-cyan-glow/40"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Software() {
  return (
    <section id="software" className="py-32 relative">
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)',
        }}
      />

      {/* Subtle background tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(56,189,248,0.02), transparent)',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        <SectionLabel
          label="03 · Software Engineering"
          title="Full-Stack Systems"
          subtitle="More than data pipelines — production software built from database schema to responsive UI."
        />

        {/* Capability badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CAPABILITIES.map((cap, i) => (
            <motion.span
              key={cap.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="px-3 py-1.5 rounded-full font-mono text-[11px] font-500"
              style={{
                background: `${cap.color}10`,
                border: `1px solid ${cap.color}25`,
                color: cap.color,
              }}
            >
              {cap.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Full-stack diagram */}
        <FullStackDiagram />

        {/* Project cards */}
        <div className="space-y-6">
          {SOFTWARE_PROJECTS.map((project, i) => (
            <SoftwareCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom proof statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid sm:grid-cols-3 gap-4"
        >
          {[
            {
              stat: 'End-to-End',
              desc: 'From schema design to deployed UI',
              color: '#00d4ff',
            },
            {
              stat: 'API-First',
              desc: 'RESTful, documented, and tested',
              color: '#10b981',
            },
            {
              stat: 'Secure',
              desc: 'JWT, bcrypt, role-based access',
              color: '#8b5cf6',
            },
          ].map((item) => (
            <div
              key={item.stat}
              className="glass rounded-xl p-5 text-center
                         border border-white/5 hover:border-white/10
                         transition-all duration-300"
            >
              <div
                className="font-mono text-xl font-black mb-2"
                style={{ color: item.color }}
              >
                {item.stat}
              </div>
              <p className="text-[#8b949e] text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}