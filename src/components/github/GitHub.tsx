import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Clock, ExternalLink, Activity, Code2, AlertCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';
import SectionLabel from '../ui/SectionLabel';
import { PROFILE } from '../../data/portfolio';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  topics: string[];
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#2b7489',
  JavaScript: '#f1e05a',
  SQL: '#e38c00',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
};

function timeAgo(d: string) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 3600) return Math.floor(s / 60) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  if (s < 2592000) return Math.floor(s / 86400) + 'd ago';
  return Math.floor(s / 2592000) + 'mo ago';
}

function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  const lc = repo.language ? (LANG_COLORS[repo.language] ?? '#8b949e') : '#8b949e';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -3 }}
      className="glass rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 group flex flex-col"
    >
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg,' + lc + '80, transparent)' }} />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <Code2 size={13} className="text-cyan-glow shrink-0" />
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="font-mono text-sm font-semibold text-white hover:text-cyan-glow transition-colors truncate">
              {repo.name}
            </a>
          </div>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-[#6e7681] hover:text-cyan-glow transition-colors opacity-0 group-hover:opacity-100 shrink-0">
            <ExternalLink size={13} />
          </a>
        </div>
        <p className="text-[#6e7681] text-xs leading-relaxed mb-3 flex-1 line-clamp-2">
          {repo.description ?? 'No description provided.'}
        </p>
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {repo.topics.slice(0, 3).map((t) => (
              <span key={t} className="font-mono text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', color: 'rgba(0,212,255,0.7)' }}>
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lc }} />
                <span className="font-mono text-[10px] text-[#6e7681]">{repo.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Star size={11} className="text-[#6e7681]" />
              <span className="font-mono text-[10px] text-[#6e7681]">{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork size={11} className="text-[#6e7681]" />
              <span className="font-mono text-[10px] text-[#6e7681]">{repo.forks_count}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={10} className="text-[#4a5568]" />
            <span className="font-mono text-[9px] text-[#4a5568]">{timeAgo(repo.updated_at)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GitHub() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let mounted = true;
    axios.all([
      axios.get('https://api.github.com/users/' + PROFILE.githubUsername + '/repos?per_page=20&sort=updated'),
      axios.get('https://api.github.com/users/' + PROFILE.githubUsername),
    ]).then(axios.spread((r1, r2) => {
      if (!mounted) return;
      setRepos(r1.data);
      setUser(r2.data);
      setLoading(false);
    })).catch(() => {
      if (!mounted) return;
      setError(true);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  const languages = ['all', ...Array.from(new Set(repos.map((r) => r.language).filter((l): l is string => l !== null)))];
  const filtered = filter === 'all' ? repos : repos.filter((r) => r.language === filter);

  return (
    <section id="github" className="py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)' }} />
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel label="06 . GitHub Command Center" title="Repository Dashboard" subtitle="Live data pulled from the GitHub API. Every repository, language, and commit in real-time." />

        {user && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-5 mb-8 border border-white/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                  <FaGithub size={22} className="text-cyan-glow" />
                </div>
                <div>
                  <p className="text-white font-semibold">{PROFILE.githubUsername}</p>
                  <p className="font-mono text-xs text-[#6e7681]">github.com/{PROFILE.githubUsername}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-6 items-center">
                {[
                  { label: 'Repositories', value: user.public_repos, color: '#00d4ff' },
                  { label: 'Followers', value: user.followers, color: '#10b981' },
                  { label: 'Following', value: user.following, color: '#8b5cf6' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-mono text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                    <div className="font-mono text-[10px] text-[#6e7681] uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '8px 16px' }}>
                  <FaGithub size={14} /> Profile
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {!loading && !error && (
          <div className="flex flex-wrap gap-2 mb-8">
            {languages.map((lang) => {
              const color = lang === 'all' ? '#00d4ff' : (LANG_COLORS[lang] ?? '#8b949e');
              const active = filter === lang;
              return (
                <button key={lang} onClick={() => setFilter(lang)} className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs tracking-wide transition-all duration-200"
                  style={{ background: active ? color + '15' : 'rgba(255,255,255,0.03)', border: active ? '1px solid ' + color + '40' : '1px solid rgba(255,255,255,0.06)', color: active ? color : '#6e7681' }}>
                  {lang !== 'all' && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />}
                  {lang === 'all' ? 'All Languages' : lang}
                </button>
              );
            })}
            <div className="ml-auto flex items-center gap-2 px-3 py-2 glass rounded-lg">
              <Activity size={12} className="text-cyan-glow" />
              <span className="font-mono text-xs text-[#8b949e]">{filtered.length} repos</span>
            </div>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0,1,2,3,4,5].map((i) => (
              <div key={i} className="glass rounded-xl p-4 border border-white/5 animate-pulse h-40">
                <div className="h-3 bg-white/5 rounded w-3/4 mb-3" />
                <div className="h-2 bg-white/5 rounded w-full mb-2" />
                <div className="h-2 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="glass rounded-2xl p-8 border border-white/5 text-center">
            <AlertCircle size={32} className="text-[#6e7681] mx-auto mb-4" />
            <p className="text-[#8b949e] font-mono text-sm mb-2">Unable to connect to GitHub API</p>
            <p className="text-[#6e7681] text-xs mb-6">Rate limit reached or network issue.</p>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <FaGithub size={14} /> View GitHub Profile
            </a>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((repo, i) => <RepoCard key={repo.id} repo={repo} index={i} />)}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-10 text-center">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex">
              <FaGithub size={15} /> View All Repositories on GitHub
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
