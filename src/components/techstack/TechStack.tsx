import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';
import TechGraph from './TechGraph';
import { TECH_NODES } from '../../data/portfolio';
import type { TechNode } from '../../types';

const GROUP_COLORS: Record<TechNode['group'], string> = {
  language: '#f59e0b',
  data: '#00d4ff',
  database: '#10b981',
  backend: '#6366f1',
  frontend: '#38bdf8',
  cloud: '#8b5cf6',
  devops: '#ef4444',
};

const GROUP_LABELS: Record<TechNode['group'], string> = {
  language: 'Languages',
  data: 'Data Engineering',
  database: 'Databases',
  backend: 'Backend',
  frontend: 'Frontend',
  cloud: 'Cloud',
  devops: 'DevOps',
};

type GroupFilter = TechNode['group'] | 'all';

const FILTERS: { label: string; value: GroupFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Languages', value: 'language' },
  { label: 'Data Engineering', value: 'data' },
  { label: 'Databases', value: 'database' },
  { label: 'Backend', value: 'backend' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'DevOps', value: 'devops' },
];

export default function TechStack() {
  const [activeGroup, setActiveGroup] = useState<GroupFilter>('all');

  const filtered = TECH_NODES.filter(
    (n) => activeGroup === 'all' || n.group === activeGroup
  );

  const sorted = [...filtered].sort((a, b) => b.proficiency - a.proficiency);

  return (
    <section
      id="techstack"
      className="py-32 relative"
      style={{ overflowX: 'hidden' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel
          label="04 · Tech Ecosystem"
          title="Technology Graph"
          subtitle="Hover any node to see connections and proficiency. Every edge represents real usage across projects."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl p-4 sm:p-6 mb-12 border border-white/5"
          style={{ overflowX: 'hidden', maxWidth: '100%' }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] text-[#6e7681] tracking-widest uppercase">
              Interactive Dependency Graph
            </span>
            <div className="flex items-center gap-2">
              <div className="status-dot" />
              <span className="font-mono text-[10px] text-[#8b949e]">
                {TECH_NODES.length} technologies mapped
              </span>
            </div>
          </div>
          <TechGraph />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {FILTERS.map((f) => {
            const color = f.value === 'all' ? '#00d4ff' : GROUP_COLORS[f.value as TechNode['group']];
            const isActive = activeGroup === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setActiveGroup(f.value)}
                className="px-3 py-2 rounded-lg font-mono text-xs tracking-wide transition-all duration-200"
                style={{
                  background: isActive ? color + '15' : 'rgba(255,255,255,0.03)',
                  border: isActive ? '1px solid ' + color + '40' : '1px solid rgba(255,255,255,0.06)',
                  color: isActive ? color : '#6e7681',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {sorted.map((node, i) => {
              const color = GROUP_COLORS[node.group];
              const groupLabel = GROUP_LABELS[node.group];
              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  whileHover={{ y: -2 }}
                  className="glass rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all duration-200 group cursor-default"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span
                        className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded"
                        style={{ background: color + '12', color, border: '1px solid ' + color + '25' }}
                      >
                        {groupLabel}
                      </span>
                      <h4 className="text-white font-semibold text-sm mt-2">{node.label}</h4>
                    </div>
                    <div
                      className="font-mono text-2xl font-black opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{ color }}
                    >
                      {node.proficiency}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] text-[#6e7681]">Proficiency</span>
                      <span className="font-mono text-[10px] font-semibold" style={{ color }}>
                        {node.proficiency}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: node.proficiency + '%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.04, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: color, boxShadow: '0 0 8px ' + color + '60' }}
                      />
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[9px] text-[#6e7681]">Connected to:</span>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {node.connections.slice(0, 4).map((connId) => {
                        const connNode = TECH_NODES.find((n) => n.id === connId);
                        if (!connNode) return null;
                        const cc = GROUP_COLORS[connNode.group];
                        return (
                          <span
                            key={connId}
                            className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                            style={{ background: cc + '10', color: cc + '90', border: '1px solid ' + cc + '20' }}
                          >
                            {connNode.label}
                          </span>
                        );
                      })}
                      {node.connections.length > 4 && (
                        <span className="font-mono text-[9px] text-[#4a5568] px-1">
                          +{node.connections.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: 'Languages', value: '4', color: '#f59e0b' },
            { label: 'Data Tools', value: '4', color: '#00d4ff' },
            { label: 'Databases', value: '3', color: '#10b981' },
            { label: 'Frameworks', value: '7+', color: '#6366f1' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-4 text-center border border-white/5"
            >
              <div className="font-mono text-2xl font-black mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-[#6e7681] uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}