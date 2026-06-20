import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ChevronDown, ChevronUp, Monitor, Server, Database, Shield } from 'lucide-react';
import type { SoftwareProject } from '../../types';

const ARCH_LAYERS = [
  {
    key: 'frontend' as keyof SoftwareProject,
    label: 'Frontend Architecture',
    icon: Monitor,
    color: '#38bdf8',
  },
  {
    key: 'backend' as keyof SoftwareProject,
    label: 'Backend Architecture',
    icon: Server,
    color: '#10b981',
  },
  {
    key: 'database' as keyof SoftwareProject,
    label: 'Database Design',
    icon: Database,
    color: '#8b5cf6',
  },
  {
    key: 'auth' as keyof SoftwareProject,
    label: 'Auth & Security',
    icon: Shield,
    color: '#f59e0b',
  },
];

interface SoftwareCardProps {
  project: SoftwareProject;
  index: number;
}

export default function SoftwareCard({ project, index }: SoftwareCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeLayer, setActiveLayer] = useState<string>('frontend');

  const currentLayer = ARCH_LAYERS.find((l) => l.key === activeLayer)!;
  const currentItems = project[activeLayer as keyof SoftwareProject] as string[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="glass rounded-2xl overflow-hidden border border-white/5
                 hover:border-white/10 transition-all duration-300"
    >
      {/* Top chrome bar */}
      <div className="flex items-center justify-between px-5 py-3
                      border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[10px] text-[#6e7681] tracking-widest">
            system://software/{project.id}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full
                        bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400
                          shadow-[0_0_6px_#4ade80]" />
          <span className="font-mono text-[10px] text-emerald-400 font-600">
            DEPLOYED
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start
                        justify-between gap-4 mb-5">
          <div className="flex-1">
            <span className="font-mono text-[10px] text-cyan-glow
                             tracking-widest uppercase">
              Full-Stack Application
            </span>
            <h3 className="text-white text-xl sm:text-2xl font-bold
                           tracking-tight mt-1 mb-2">
              {project.title}
            </h3>
            <p className="text-[#8b949e] text-sm leading-relaxed">
              {project.tagline}
            </p>
          </div>
          
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost !py-2 !px-3 shrink-0 self-start"
          >
            <Github size={14} />
            <span className="hidden sm:inline">Code</span>
          </a>
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

        {/* Feature pills */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {project.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2 p-2.5 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow
                              shadow-[0_0_6px_#00d4ff] shrink-0" />
              <span className="text-[#8b949e] text-xs">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2.5
                     rounded-xl font-mono text-xs text-[#6e7681] hover:text-white
                     border border-white/5 hover:border-white/10
                     bg-white/[0.02] hover:bg-white/[0.04]
                     transition-all duration-200"
        >
          {expanded ? (
            <>
              <ChevronUp size={14} />
              Hide Architecture
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              Inspect Architecture
            </>
          )}
        </button>

        {/* Architecture deep dive */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-5">
                {/* Layer selector tabs */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {ARCH_LAYERS.map((layer) => {
                    const Icon = layer.icon;
                    const isActive = activeLayer === layer.key;
                    return (
                      <button
                        key={layer.key}
                        onClick={() => setActiveLayer(layer.key)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg
                                   font-mono text-[11px] tracking-wide
                                   transition-all duration-200"
                        style={{
                          background: isActive
                            ? `${layer.color}15`
                            : 'rgba(255,255,255,0.02)',
                          border: isActive
                            ? `1px solid ${layer.color}40`
                            : '1px solid rgba(255,255,255,0.05)',
                          color: isActive ? layer.color : '#6e7681',
                        }}
                      >
                        <Icon size={12} />
                        <span className="hidden sm:inline">{layer.label}</span>
                        <span className="sm:hidden">{layer.label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active layer content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLayer}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl p-5"
                    style={{
                      background: `${currentLayer.color}06`,
                      border: `1px solid ${currentLayer.color}20`,
                    }}
                  >
                    {/* Layer header */}
                    <div className="flex items-center gap-2 mb-4">
                      <currentLayer.icon
                        size={14}
                        style={{ color: currentLayer.color }}
                      />
                      <span
                        className="font-mono text-[10px] tracking-widest uppercase font-600"
                        style={{ color: currentLayer.color }}
                      >
                        {currentLayer.label}
                      </span>
                    </div>

                    {/* Architecture items as a visual stack */}
                    <div className="space-y-2">
                      {currentItems.map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-center gap-3"
                        >
                          {/* Layer line */}
                          <div className="flex flex-col items-center shrink-0">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: currentLayer.color,
                                boxShadow: `0 0 6px ${currentLayer.color}80`,
                              }}
                            />
                            {i < currentItems.length - 1 && (
                              <div
                                className="w-px h-6 mt-1"
                                style={{
                                  background: `linear-gradient(to bottom, ${currentLayer.color}40, transparent)`,
                                }}
                              />
                            )}
                          </div>

                          {/* Item box */}
                          <div
                            className="flex-1 px-3 py-2 rounded-lg
                                       font-mono text-xs text-white/80
                                       border border-white/5"
                            style={{ background: 'rgba(255,255,255,0.03)' }}
                          >
                            {item}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* API flow visualization */}
                <div className="mt-4 rounded-xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <p className="font-mono text-[10px] text-[#6e7681]
                                tracking-widest uppercase mb-3">
                    Request Flow
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {['Client', 'API Layer', 'Auth Middleware', 'Controller', 'Service', 'Database'].map(
                      (step, i, arr) => (
                        <div key={step} className="flex items-center gap-2">
                          <div
                            className="px-2.5 py-1.5 rounded-lg font-mono text-[10px]
                                       text-[#8b949e] whitespace-nowrap"
                            style={{
                              background: 'rgba(0,212,255,0.06)',
                              border: '1px solid rgba(0,212,255,0.15)',
                            }}
                          >
                            {step}
                          </div>
                          {i < arr.length - 1 && (
                            <div className="relative w-6 h-px bg-cyan-glow/20 shrink-0">
                              <motion.div
                                animate={{ x: [0, 20, 0] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                  ease: 'linear',
                                }}
                                className="absolute top-1/2 -translate-y-1/2
                                           w-1.5 h-1.5 rounded-full bg-cyan-glow"
                                style={{ left: 0 }}
                              />
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}