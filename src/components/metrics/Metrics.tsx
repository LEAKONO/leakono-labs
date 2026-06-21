import { motion } from 'framer-motion';
import {
  Database,
  Code2,
  Cpu,
  Layers,
  GitBranch,
  Terminal,
  Activity,
  Zap,
  Shield,
  Clock,
} from 'lucide-react';
import SectionLabel from '../ui/SectionLabel';
import { DASHBOARD_METRICS } from '../../data/portfolio';
import { useInView } from '../../hooks/useInView';

const ICON_MAP: Record<string, React.ElementType> = {
  Database,
  Code2,
  Cpu,
  Layers,
  GitBranch,
  Terminal,
};

// Live system telemetry rows
const TELEMETRY = [
  { label: 'pipeline.airflow.status', value: 'OPERATIONAL', color: '#10b981' },
  { label: 'warehouse.snowflake.cluster', value: 'MULTI-CLUSTER', color: '#00d4ff' },
  { label: 'transform.dbt.last_run', value: 'SUCCESS', color: '#10b981' },
  { label: 'ingestion.scheduler', value: 'RUNNING', color: '#10b981' },
  { label: 'api.rest.health', value: 'HEALTHY', color: '#10b981' },
  { label: 'storage.postgres.conn', value: 'CONNECTED', color: '#00d4ff' },
  { label: 'frontend.react.build', value: 'PASSING', color: '#10b981' },
  { label: 'auth.jwt.service', value: 'ACTIVE', color: '#10b981' },
];

// Skill competency bars
const COMPETENCIES = [
  { label: 'Data Pipeline Engineering', value: 92, color: '#00d4ff' },
  { label: 'SQL & Analytics Engineering', value: 95, color: '#8b5cf6' },
  { label: 'Apache Airflow Orchestration', value: 90, color: '#f59e0b' },
  { label: 'dbt Transformations', value: 88, color: '#00d4ff' },
  { label: 'Snowflake Data Warehousing', value: 87, color: '#8b5cf6' },
  { label: 'Python Data Engineering', value: 92, color: '#f59e0b' },
  { label: 'React Frontend Development', value: 85, color: '#38bdf8' },
  { label: 'Node.js / Express Backend', value: 83, color: '#10b981' },
  { label: 'PostgreSQL Database Design', value: 90, color: '#6366f1' },
  { label: 'REST API Development', value: 90, color: '#6366f1' },
];

// Certification / achievement badges
const ACHIEVEMENTS = [
  { label: 'Software Engineering', issuer: 'Moringa School', year: '2024', color: '#00d4ff', icon: Code2 },
  { label: 'Web Development', issuer: 'Power Learn Project', year: '2025', color: '#10b981', icon: Terminal },
  { label: 'Data Engineering', issuer: 'Self-Directed', year: '2024', color: '#8b5cf6', icon: Database },
  { label: 'Full Stack Development', issuer: 'Safaridesk Internship', year: '2025', color: '#f59e0b', icon: Zap },
];

// Animated stat counter card
// TEST 1: CountUp removed entirely — replaced with plain numericValue
// to isolate whether react-countup is the broken element.
function StatCard({
  metric,
  index,
}: {
  metric: (typeof DASHBOARD_METRICS)[0];
  index: number;
}) {
  const { ref, inView } = useInView();
  const Icon = ICON_MAP[metric.icon] ?? Terminal;
  const numericValue = parseFloat(metric.value.replace(/[^0-9.]/g, ''));
  const suffix = metric.value.replace(/[0-9]/g, '');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass rounded-2xl p-5 border border-white/5
                 hover:border-cyan-glow/20 transition-all duration-300
                 relative overflow-hidden group"
    >
      <div
        className="absolute -bottom-2 -right-2 font-mono font-black
                   text-6xl opacity-[0.04] group-hover:opacity-[0.07]
                   transition-opacity select-none text-cyan-glow"
      >
        {metric.value}
      </div>

      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: 'rgba(0,212,255,0.08)',
          border: '1px solid rgba(0,212,255,0.2)',
        }}
      >
        <Icon size={18} className="text-cyan-glow" />
      </div>

      {/* TEST: plain number instead of <CountUp /> */}
      <div className="font-mono text-3xl font-black text-white mb-1">
        {inView ? `${numericValue}${suffix}` : '0'}
      </div>

      <div className="font-mono text-[11px] text-[#6e7681] tracking-widest uppercase">
        {metric.label}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0
                   group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)',
        }}
      />
    </motion.div>
  );
}

// Telemetry row
function TelemetryRow({
  item,
  index,
}: {
  item: (typeof TELEMETRY)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center justify-between py-2.5 px-4
                 border-b border-white/[0.04] last:border-0
                 hover:bg-white/[0.02] transition-colors duration-150
                 group"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{
            backgroundColor: item.color,
            boxShadow: `0 0 6px ${item.color}`,
            animation: `pulse ${1.5 + index * 0.1}s ease-in-out infinite`,
          }}
        />
        <span className="font-mono text-xs text-[#6e7681]
                         group-hover:text-[#8b949e] transition-colors">
          {item.label}
        </span>
      </div>
      <span className="font-mono text-xs font-600" style={{ color: item.color }}>
        {item.value}
      </span>
    </motion.div>
  );
}

// Competency bar
function CompetencyBar({
  item,
  index,
}: {
  item: (typeof COMPETENCIES)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[#8b949e] text-xs group-hover:text-white
                         transition-colors duration-200">
          {item.label}
        </span>
        <span className="font-mono text-xs font-600" style={{ color: item.color }}>
          {item.value}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${item.value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.06, ease: 'easeOut' }}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            backgroundColor: item.color,
            boxShadow: `0 0 8px ${item.color}60`,
          }}
        >
          <div className="absolute inset-0 flow-line" style={{ opacity: 0.4 }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Metrics() {
  return (
    <section id="metrics" className="py-32 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)',
        }}
      />

      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionLabel
          label="05 · Engineering Metrics"
          title="Command Center"
          subtitle="Real-time operational overview of skills, systems, and engineering output."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {DASHBOARD_METRICS.map((metric, i) => (
            <StatCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl overflow-hidden border border-white/5"
          >
            <div className="flex items-center justify-between px-5 py-3
                          border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <Activity size={13} className="text-cyan-glow" />
                <span className="font-mono text-[10px] text-[#6e7681]
                               tracking-widest uppercase">
                  System Telemetry
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="status-dot" />
                <span className="font-mono text-[10px] text-cyan-glow">LIVE</span>
              </div>
            </div>

            <div className="scan-line">
              {TELEMETRY.map((item, i) => (
                <TelemetryRow key={item.label} item={item} index={i} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl overflow-hidden border border-white/5"
          >
            <div className="flex items-center justify-between px-5 py-3
                          border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <Cpu size={13} className="text-cyan-glow" />
                <span className="font-mono text-[10px] text-[#6e7681]
                               tracking-widest uppercase">
                  Skill Proficiency
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#6e7681]">
                {COMPETENCIES.length} skills
              </span>
            </div>

            <div className="p-5 space-y-4">
              {COMPETENCIES.map((item, i) => (
                <CompetencyBar key={item.label} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl overflow-hidden border border-white/5"
        >
          <div className="flex items-center gap-2 px-5 py-3
                        border-b border-white/5 bg-white/[0.02]">
            <Shield size={13} className="text-cyan-glow" />
            <span className="font-mono text-[10px] text-[#6e7681]
                           tracking-widest uppercase">
              Qualifications & Experience
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
            {ACHIEVEMENTS.map((ach, i) => {
              const Icon = ach.icon;
              return (
                <motion.div
                  key={ach.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                  className="p-5 bg-graphite-950 hover:bg-white/[0.02]
                             transition-all duration-200 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center
                               justify-center mb-4 transition-all duration-200"
                    style={{
                      background: `${ach.color}10`,
                      border: `1px solid ${ach.color}25`,
                    }}
                  >
                    <Icon size={16} style={{ color: ach.color }} />
                  </div>
                  <p className="font-mono text-xs font-600 mb-1" style={{ color: ach.color }}>
                    {ach.label}
                  </p>
                  <p className="text-[#8b949e] text-xs mb-1">{ach.issuer}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Clock size={10} className="text-[#6e7681]" />
                    <span className="font-mono text-[10px] text-[#6e7681]">
                      {ach.year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}