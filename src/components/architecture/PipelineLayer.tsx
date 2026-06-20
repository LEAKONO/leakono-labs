import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, AlertTriangle, TrendingUp } from 'lucide-react';
import type { PipelineLayer } from '../../types';

interface PipelineLayerProps {
  layer: PipelineLayer;
  index: number;
  isLast: boolean;
}

export default function PipelineLayerCard({ layer, index, isLast }: PipelineLayerProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Connector line going down */}
      {!isLast && (
        <div className="absolute left-8 top-full w-px h-6 z-10 flow-line"
          style={{ background: `linear-gradient(to bottom, ${layer.color}60, ${layer.color}20)` }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        {/* Main row — always visible */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left group"
        >
          <div
            className="glass glass-hover rounded-xl p-5 flex items-center gap-5 transition-all duration-300"
            style={{
              borderColor: expanded ? `${layer.color}40` : 'rgba(255,255,255,0.06)',
              boxShadow: expanded ? `0 0 30px ${layer.color}10` : '',
            }}
          >
            {/* Index + color bar */}
            <div className="flex items-center gap-3 shrink-0">
              <div
                className="w-1 h-12 rounded-full"
                style={{ backgroundColor: layer.color, boxShadow: `0 0 10px ${layer.color}60` }}
              />
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-lg shrink-0"
                style={{
                  backgroundColor: `${layer.color}12`,
                  border: `1px solid ${layer.color}30`,
                  color: layer.color,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="font-mono text-[10px] tracking-widest font-600 uppercase"
                  style={{ color: layer.color }}
                >
                  {layer.label}
                </span>
              </div>
              <h3 className="text-white font-semibold text-lg">{layer.name}</h3>
              <p className="text-[#8b949e] text-sm mt-1 leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-all">
                {layer.description}
              </p>
            </div>

            {/* Tech pills — desktop */}
            <div className="hidden xl:flex flex-wrap gap-2 max-w-xs">
              {layer.technologies.slice(0, 3).map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
              {layer.technologies.length > 3 && (
                <span className="tag">+{layer.technologies.length - 3}</span>
              )}
            </div>

            {/* Expand chevron */}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="shrink-0 text-[#6e7681]"
            >
              <ChevronDown size={18} />
            </motion.div>
          </div>
        </button>

        {/* Expanded panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div
                className="mx-4 mb-2 rounded-b-xl p-6 grid md:grid-cols-3 gap-6"
                style={{
                  background: `${layer.color}06`,
                  border: `1px solid ${layer.color}20`,
                  borderTop: 'none',
                }}
              >
                {/* Technologies */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={13} style={{ color: layer.color }} />
                    <span className="font-mono text-[10px] tracking-widest text-[#6e7681] uppercase">
                      Technologies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded text-xs font-mono font-500"
                        style={{
                          background: `${layer.color}15`,
                          border: `1px solid ${layer.color}30`,
                          color: layer.color,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engineering Challenge */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={13} className="text-amber-400" />
                    <span className="font-mono text-[10px] tracking-widest text-[#6e7681] uppercase">
                      Engineering Challenge
                    </span>
                  </div>
                  <p className="text-[#8b949e] text-sm leading-relaxed">
                    {layer.challenge}
                  </p>
                </div>

                {/* Scaling Considerations */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={13} className="text-emerald-400" />
                    <span className="font-mono text-[10px] tracking-widest text-[#6e7681] uppercase">
                      Scaling Strategy
                    </span>
                  </div>
                  <p className="text-[#8b949e] text-sm leading-relaxed">
                    {layer.scaling}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Downward arrow between layers */}
      {!isLast && (
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center my-2"
        >
          <ChevronDown size={14} style={{ color: layer.color, opacity: 0.5 }} />
        </motion.div>
      )}
    </div>
  );
}