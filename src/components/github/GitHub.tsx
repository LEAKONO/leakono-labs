import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Star,
  GitFork,
  Clock,
  ExternalLink,
  Activity,
  Code2,
  AlertCircle,
} from 'lucide-react';
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
  size: number;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#2b7489',
  JavaScript: '#f1e05a',
  SQL: '#e38c00',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
};

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 2592000)}mo ago`;
}

function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  const langColor = repo.language
    ? LANGUAGE_COLORS[repo.language] ?? '#8b949e'
    : '#8b949e';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -3 }}
      className="glass rounded-xl overflow-hidden border border-white/5
                 hover:border-white/10 transition-all duration-300 group
                 flex flex-col"
    >
      {/* Card top bar */}
      <div
        className="h-0.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${langColor}80, transparent)`,
        }}
      />

      <div className="p-4 flex flex-col flex-1">
        {/* Repo name + link */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <Code2 size={13} className="text-cyan-glow shrink-0" />
            
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-600 text-white
                         hover:text-cyan-glow transition-colors truncate"
            >
              {repo.name}
            </a>
          </div>
          
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6e7681] hover:text-cyan-glow transition-colors
                       opacity-0 group-hover:opacity-100 shrink-0"
          >
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Description */}
        <p className="text-[#6e7681] text-xs leading-relaxed mb-3 flex-1 line-clamp-2">
          {repo.description ?? 'No description provided.'}
        </p>

        {/* Topics */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                style={{
                  background: 'rgba(0,212,255,0.06)',
                  border: '1px solid rgba(0,212,255,0.15)',
                  color: 'rgba(0,212,255,0.7)',
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            {/* Language */}
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: langColor }}
                />
                <span className="font-mono text-[10px] text-[#6e7681]">
                  {repo.language}
                </span>
              </div>
            )}

            {/* Stars */}
            <div className="flex items-center gap-1">
              <Star size={11} className="text-[#6e7681]" />
              <span className="font-mono text-[10px] text-[#6e7681]">
                {repo.stargazers_count}
              </span>
            </div>

            {/* Forks */}
            <div className="flex items-center gap-1">
              <GitFork size={11} className="text-[#6e7681]" />
              <span className="font-mono text-[10px] text-[#6e7681]">
                {repo.forks_count}
              </span>
            </div>
          </div>

          {/* Last updated */}
          <div className="flex items-center gap-1">
            <Clock size={10} className="text-[#4a5568]" />
            <span className="font-mono text-[9px] text-[#4a5568]">
              {timeAgo(repo.updated_at)}
            </span>
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
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reposRes, userRes] = await Promise.all([
          axios.get(
            `https://api.github.com/users/${PROFILE.githubUsername}/repos?per_page=20&sort=updated`
          ),
          axios.get(
            `https://api.github.com/users/${PROFILE.githubUsername}`
          ),
        ]);
        setRepos(reposRes.data);
        setUser(userRes.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get unique languages for filter
  const languages = [
    'all',
    ...new Set(
      repos
        .map((r) => r.language)
        .filter((l): l is string => l !== null)
    ),
  ];

  const filtered =
    filter === 'all'
      ? repos
      : repos.filter((r) => r.language === filter);

  return (
    <section id="github" className="py-32 relative">
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel
          label="06 · GitHub Command Center"
          title="Repository Dashboard"
          subtitle="Live data pulled from the GitHub API. Every repository, language, and commit — real-time."
        />

        {/* User stats bar */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 mb-8 border border-white/5"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center
                            justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center
                             justify-center"
                  style={{
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.2)',
                  }}
                >
                  <Github size={22} className="text-cyan-glow" />
                </div>
                <div>
                  <p className="text-white font-600">
                    {PROFILE.githubUsername}
                  </p>
                  <p className="font-mono text-xs text-[#6e7681]">
                    github.com/{PROFILE.githubUsername}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  {
                    label: 'Repositories',
                    value: user.public_repos,
                    color: '#00d4ff',
                  },
                  {
                    label: 'Followers',
                    value: user.followers,
                    color: '#10b981',
                  },
                  {
                    label: 'Following',
                    value: user.following,
                    color: '#8b5cf6',
                  },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="font-mono text-2xl font-black"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] text-[#6e7681] uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                ))}

                
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !py-2 !px-4 self-center"
                >
                  <Github size={14} />
                  Profile
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Language filter */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {languages.map((lang) => {
              const color =
                lang === 'all'
                  ? '#00d4ff'
                  : (LANGUAGE_COLORS[lang] ?? '#8b949e');
              return (
                <button
                  key={lang}
                  onClick={() => setFilter(lang)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg
                             font-mono text-xs tracking-wide
                             transition-all duration-200"
                  style={{
                    background:
                      filter === lang
                        ? `${color}15`
                        : 'rgba(255,255,255,0.03)',
                    border:
                      filter === lang
                        ? `1px solid ${color}40`
                        : '1px solid rgba(255,255,255,0.06)',
                    color: filter === lang ? color : '#6e7681',
                  }}
                >
                  {lang !== 'all' && (
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  )}
                  {lang === 'all' ? 'All Languages' : lang}
                </button>
              );
            })}

            {/* Repo count */}
            <div className="ml-auto flex items-center gap-2 px-3 py-2
                            glass rounded-lg">
              <Activity size={12} className="text-cyan-glow" />
              <span className="font-mono text-xs text-[#8b949e]">
                {filtered.length} repos
              </span>
            </div>
          </motion.div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="glass rounded-xl p-4 border border-white/5
                           animate-pulse"
                style={{ height: '160px' }}
              >
                <div className="h-3 bg-white/5 rounded w-3/4 mb-3" />
                <div className="h-2 bg-white/5 rounded w-full mb-2" />
                <div className="h-2 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-8 border border-white/5
                       text-center"
          >
            <AlertCircle
              size={32}
              className="text-[#6e7681] mx-auto mb-4"
            />
            <p className="text-[#8b949e] font-mono text-sm mb-2">
              Unable to connect to GitHub API
            </p>
            <p className="text-[#6e7681] text-xs mb-6">
              Rate limit reached or network issue.
            </p>
            
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Github size={14} />
              View GitHub Profile
            </a>
          </motion.div>
        )}

        {/* Repo grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-center"
          >
            
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex"
            >
              <Github size={15} />
              View All Repositories on GitHub
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}