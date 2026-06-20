import { motion } from 'framer-motion';
import type { ArchNode } from '../../types';

const TYPE_COLORS: Record<ArchNode['type'], string> = {
  source: '#6366f1',
  ingestion: '#f59e0b',
  storage: '#10b981',
  transform: '#00d4ff',
  warehouse: '#8b5cf6',
  consumption: '#ef4444',
};

const TYPE_LABELS: Record<ArchNode['type'], string> = {
  source: 'SRC',
  ingestion: 'ING',
  storage: 'STG',
  transform: 'TRF',
  warehouse: 'DWH',
  consumption: 'CON',
};

interface ArchFlowProps {
  nodes: ArchNode[];
}

export default function ArchFlow({ nodes }: ArchFlowProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-0 min-w-max py-2">
        {nodes.map((node, i) => {
          const color = TYPE_COLORS[node.type];
          const typeLabel = TYPE_LABELS[node.type];

          return (
            <div key={node.id} className="flex items-center">
              {/* Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex flex-col items-center gap-1.5 group cursor-default"
              >
                {/* Type badge */}
                <span
                  className="font-mono text-[9px] font-700 tracking-widest px-1.5 py-0.5 rounded"
                  style={{
                    background: `${color}15`,
                    color: color,
                    border: `1px solid ${color}30`,
                  }}
                >
                  {typeLabel}
                </span>

                {/* Node box */}
                <div
                  className="w-24 rounded-lg p-2.5 text-center transition-all duration-200"
                  style={{
                    background: `${color}10`,
                    border: `1px solid ${color}35`,
                    boxShadow: `0 0 0 0 ${color}00`,
                  }}
                >
                  {/* Pulse dot */}
                  <div className="flex justify-center mb-1.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 6px ${color}`,
                        animation: `pulse ${1.5 + i * 0.15}s ease-in-out infinite`,
                      }}
                    />
                  </div>

                  {/* Label */}
                  <p
                    className="font-mono text-[10px] font-600 leading-tight"
                    style={{ color }}
                  >
                    {node.label}
                  </p>

                  {/* Tech */}
                  <p className="text-[#6e7681] text-[9px] mt-1 leading-tight font-mono">
                    {node.tech}
                  </p>
                </div>

                {/* Tooltip on hover */}
                <div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                             absolute mt-1 z-20 bg-[#0d1117] border border-white/10 rounded-lg
                             p-2 text-[10px] font-mono text-[#8b949e] whitespace-nowrap
                             pointer-events-none shadow-xl"
                  style={{ top: '100%' }}
                >
                  {node.details}
                </div>
              </motion.div>

              {/* Connector arrow */}
              {i < nodes.length - 1 && (
                <div className="relative flex items-center mx-1 w-8 shrink-0">
                  {/* Line */}
                  <div
                    className="w-full h-px"
                    style={{
                      background: `linear-gradient(90deg, ${color}50, ${TYPE_COLORS[nodes[i + 1].type]}50)`,
                    }}
                  />
                  {/* Moving packet */}
                  <motion.div
                    animate={{ x: [0, 28, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.25,
                    }}
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 6px ${color}`,
                      left: 0,
                    }}
                  />
                  {/* Arrow head */}
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 border-l-4 border-y-2 border-y-transparent"
                    style={{
                      borderLeftColor: `${TYPE_COLORS[nodes[i + 1].type]}60`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}