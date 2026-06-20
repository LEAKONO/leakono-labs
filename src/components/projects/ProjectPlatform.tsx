import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Activity,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  Archive,
} from 'lucide-react';
import type { Project } from '../../types';
import ArchFlow from './ArchFlow';

const STATUS_CONFIG = {
  production: {
    label: 'PRODUCTION',
    color: '#10b981',
    icon: CheckCircle,
  },
  active: {
    label: 'ACTIVE',
    color: '#00d4ff',
    icon: Activity,
  },
  archived: {
    label: 'ARCHIVED',
    color: '#6e7681',
    icon: Archive,
  },
};

interface ProjectPlatformProps {
  project: Project;
  index: number;
}

export default function ProjectPlatform({ project, index }: ProjectPlatformProps) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[project.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300"
    >
      {/* Top bar — like a browser/dashboard chrome */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          {/* Traffic light dots */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[10px] text-[#6e7681] tracking-widest">
            platform://data/{project.id}
          </span>
        </div>

        {/* Status badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-600"
          style={{
            background: `${status.color}15`,
            border: `1px solid ${status.color}30`,
            color: status.color,
          }}
        >
          <StatusIcon size={10} />
          {status.label}
        </div>
      </div>

      {/* Main content */}
      <div className="p-5 sm:p-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] text-cyan-glow tracking-widest uppercase">
                {project.category === 'data' ? 'Data Engineering' : 'Software Engineering'}
              </span>
            </div>
            <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight mb-2">
              {project.title}
            </h3>
            <p className="text-[#8b949e] text-sm leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* GitHub link */}
          
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost !py-2 !px-3 shrink-0 self-start"
          >
            <Github size={14} />
            <span className="hidden sm:inline">Repository</span>
          </a>
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl p-3 text-center"
              style={{
                background: 'rgba(0,212,255,0.04)',
                border: '1px solid rgba(0,212,255,0.12)',
              }}
            >
              <div className="font-mono text-lg sm:text-xl font-bold text-cyan-glow">
                {metric.value}
              </div>
              <div className="font-mono text-[10px] text-[#6e7681] mt-1 leading-tight">
                {metric.label}
              </div>
              {metric.unit && (
                <div className="font-mono text-[9px] text-[#4a5568] mt-0.5">
                  {metric.unit}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Architecture flow — always visible */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-3 bg-cyan-glow/60 rounded-full" />
            <span className="font-mono text-[10px] tracking-widest text-[#6e7681] uppercase">
              Pipeline Architecture
            </span>
          </div>
          <div
            className="rounded-xl p-4"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <ArchFlow nodes={project.architecture} />
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                     font-mono text-xs text-[#6e7681] hover:text-white
                     border border-white/5 hover:border-white/10
                     bg-white/[0.02] hover:bg-white/[0.04]
                     transition-all duration-200"
        >
          {expanded ? (
            <>
              <ChevronUp size={14} />
              Hide Technical Details
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              View Technical Deep Dive
            </>
          )}
        </button>

        {/* Expanded technical details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-4">
                {/* Description */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: 'rgba(0,212,255,0.03)',
                    border: '1px solid rgba(0,212,255,0.1)',
                  }}
                >
                  <p className="font-mono text-[10px] text-cyan-glow tracking-widest uppercase mb-2">
                    System Overview
                  </p>
                  <p className="text-[#8b949e] text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Architecture nodes detail */}
                <div>
                  <p className="font-mono text-[10px] text-[#6e7681] tracking-widest uppercase mb-3">
                    Component Breakdown
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {project.architecture.map((node, i) => (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-lg"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.05)',
                        }}
                      >
                        <div
                          className="w-1 h-full min-h-[32px] rounded-full shrink-0 mt-0.5"
                          style={{
                            background: {
                              source: '#6366f1',
                              ingestion: '#f59e0b',
                              storage: '#10b981',
                              transform: '#00d4ff',
                              warehouse: '#8b5cf6',
                              consumption: '#ef4444',
                            }[node.type],
                          }}
                        />
                        <div>
                          <p className="text-white text-xs font-600 mb-0.5">{node.label}</p>
                          <p className="text-[#6e7681] text-[11px] font-mono">{node.tech}</p>
                          <p className="text-[#4a5568] text-[10px] mt-0.5">{node.details}</p>
                        </div>
                      </motion.div>
                    ))}
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