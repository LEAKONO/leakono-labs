import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const STATUSES = [
  { label: 'Pipelines', value: 'OPERATIONAL', color: '#10b981' },
  { label: 'Airflow', value: 'RUNNING', color: '#10b981' },
  { label: 'Snowflake', value: 'ACTIVE', color: '#10b981' },
  { label: 'dbt Cloud', value: 'SYNCED', color: '#00d4ff' },
  { label: 'APIs', value: 'HEALTHY', color: '#10b981' },
];

export default function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10"
    >
      {/* Live clock */}
      <div className="flex items-center gap-2">
        <div className="status-dot" />
        <span className="font-mono text-xs text-[#8b949e]">
          {time.toUTCString().slice(17, 25)}{' '}
          <span className="text-[#6e7681]">UTC</span>
        </span>
      </div>

      <div className="w-px h-4 bg-white/10" />

      {/* System statuses */}
      {STATUSES.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: s.color, boxShadow: `0 0 6px ${s.color}` }}
          />
          <span className="font-mono text-xs text-[#6e7681]">
            {s.label}:{' '}
            <span style={{ color: s.color }}>{s.value}</span>
          </span>
        </div>
      ))}
    </motion.div>
  );
}