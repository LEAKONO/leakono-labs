import { motion } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';
import PipelineLayerCard from './PipelineLayer';
import { PIPELINE_LAYERS } from '../../data/portfolio';

// Animated data flow diagram at the top
function PipelineFlowDiagram() {
  const stages = [
    { label: 'Sources', color: '#6366f1' },
    { label: 'Ingest', color: '#f59e0b' },
    { label: 'Store', color: '#10b981' },
    { label: 'Transform', color: '#00d4ff' },
    { label: 'Warehouse', color: '#8b5cf6' },
    { label: 'Consume', color: '#ef4444' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 mb-12 overflow-x-auto"
    >
      <div className="flex items-center gap-0 min-w-max mx-auto w-fit">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center">
            {/* Stage box */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex flex-col items-center gap-2 px-5 py-3 rounded-xl cursor-default"
              style={{
                background: `${stage.color}10`,
                border: `1px solid ${stage.color}30`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: stage.color,
                  boxShadow: `0 0 8px ${stage.color}`,
                  animation: `pulse ${1.5 + i * 0.2}s ease-in-out infinite`,
                }}
              />
              <span
                className="font-mono text-xs font-600 whitespace-nowrap"
                style={{ color: stage.color }}
              >
                {stage.label}
              </span>
            </motion.div>

            {/* Connector with flowing packet */}
            {i < stages.length - 1 && (
              <div className="relative w-12 h-px mx-1" style={{ background: `${stage.color}30` }}>
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: stage.color,
                    boxShadow: `0 0 6px ${stage.color}`,
                    animation: `flowPacket 2s linear infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes flowPacket {
          0%   { left: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}

export default function Architecture() {
  return (
    <section id="architecture" className="py-32 relative">
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)' }}
      />

      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel
          label="01 · Engineering Architecture"
          title="Data Pipeline Architecture"
          subtitle="A full-stack data platform — from raw source to business insight. Click any layer to inspect the engineering decisions inside."
        />

        {/* Mini flow diagram */}
        <PipelineFlowDiagram />

        {/* Layer cards */}
        <div className="space-y-3">
          {PIPELINE_LAYERS.map((layer, i) => (
            <PipelineLayerCard
              key={layer.id}
              layer={layer}
              index={i}
              isLast={i === PIPELINE_LAYERS.length - 1}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 glass rounded-xl p-5 flex items-start gap-4 border border-cyan-glow/10"
        >
          <div className="w-1 h-full min-h-[40px] bg-cyan-glow/40 rounded-full shrink-0" />
          <div>
            <p className="font-mono text-xs text-cyan-glow mb-1 tracking-widest uppercase">
              Engineering Philosophy
            </p>
            <p className="text-[#8b949e] text-sm leading-relaxed">
              Every layer is independently testable, observable, and replaceable.
              Pipelines are designed for idempotency safe to re-run at any stage
              without producing duplicate or corrupted data.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}