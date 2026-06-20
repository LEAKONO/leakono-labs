import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import SectionLabel from '../ui/SectionLabel';
import { PROFILE } from '../../data/portfolio';

const TERMINAL_LINES = [
  { delay: 0, text: '$ ssh emmanuel@leakono.dev', color: '#00d4ff' },
  { delay: 0.6, text: 'Connecting to remote host...', color: '#6e7681' },
  { delay: 1.2, text: 'Authentication successful.', color: '#10b981' },
  { delay: 1.8, text: '$ whoami', color: '#00d4ff' },
  { delay: 2.2, text: 'emmanuel_leakono — Data & Software Engineer', color: '#c9d1d9' },
  { delay: 2.8, text: '$ cat contact.json', color: '#00d4ff' },
];

const CONTACT_INFO = [
  {
    label: 'email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: Mail,
    color: '#00d4ff',
    copyable: true,
  },
  {
    label: 'phone',
    value: PROFILE.phone,
    href: `tel:${PROFILE.phone}`,
    icon: Phone,
    color: '#10b981',
    copyable: true,
  },
  {
    label: 'location',
    value: PROFILE.location,
    href: null,
    icon: MapPin,
    color: '#8b5cf6',
    copyable: false,
  },
  {
    label: 'github',
    value: `github.com/${PROFILE.githubUsername}`,
    href: PROFILE.github,
    icon: Github,
    color: '#f59e0b',
    copyable: false,
  },
  {
    label: 'linkedin',
    value: 'linkedin.com/in/emmanuel-leakono',
    href: PROFILE.linkedin,
    icon: Linkedin,
    color: '#38bdf8',
    copyable: false,
  },
];

// Animated terminal intro
function TerminalIntro() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  // Show lines progressively
  useState(() => {
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay * 1000);
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl overflow-hidden border border-white/5 mb-8"
    >
      {/* Terminal chrome */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-[#6e7681]" />
          <span className="font-mono text-[10px] text-[#6e7681] tracking-widest">
            contact.terminal — bash
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="status-dot" />
          <span className="font-mono text-[10px] text-cyan-glow">CONNECTED</span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm space-y-2 min-h-[200px]">
        {TERMINAL_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: line.delay, duration: 0.3 }}
          >
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}

        {/* JSON output */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 3.2 }}
          className="mt-2 rounded-lg p-4"
          style={{
            background: 'rgba(0,212,255,0.04)',
            border: '1px solid rgba(0,212,255,0.1)',
          }}
        >
          <p className="text-[#6e7681]">{'{'}</p>
          {CONTACT_INFO.map((item, i) => (
            <motion.p
              key={item.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 3.2 + i * 0.15 }}
              className="pl-4"
            >
              <span className="text-[#8b5cf6]">"{item.label}"</span>
              <span className="text-[#6e7681]">: </span>
              <span style={{ color: item.color }}>"{item.value}"</span>
              {i < CONTACT_INFO.length - 1 && (
                <span className="text-[#6e7681]">,</span>
              )}
            </motion.p>
          ))}
          <p className="text-[#6e7681]">{'}'}</p>
        </motion.div>

        {/* Cursor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 4.5 }}
          className="flex items-center gap-2"
        >
          <ChevronRight size={14} className="text-cyan-glow" />
          <span className="text-[#6e7681] cursor">_</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Copy to clipboard button
function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity
                 duration-200 p-1 rounded hover:bg-white/10"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Check size={12} className="text-emerald-400" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Copy size={12} className="text-[#6e7681]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

// Contact info cards
function ContactCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
      {CONTACT_INFO.map((item, i) => {
        const Icon = item.icon;
        const Wrapper = item.href ? 'a' : 'div';
        const wrapperProps = item.href
          ? {
              href: item.href,
              target: item.href.startsWith('http') ? '_blank' : undefined,
              rel: item.href.startsWith('http')
                ? 'noopener noreferrer'
                : undefined,
            }
          : {};

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Wrapper
              {...(wrapperProps as any)}
              className="flex items-center gap-4 p-4 glass rounded-xl
                         border border-white/5 hover:border-white/10
                         transition-all duration-200 group
                         hover:bg-white/[0.02] cursor-pointer block"
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center
                           justify-center shrink-0 transition-all duration-200"
                style={{
                  background: `${item.color}10`,
                  border: `1px solid ${item.color}25`,
                }}
              >
                <Icon size={16} style={{ color: item.color }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] text-[#6e7681]
                               tracking-widest uppercase mb-0.5">
                  {item.label}
                </p>
                <p className="text-white text-sm font-500 truncate
                               group-hover:text-cyan-glow transition-colors">
                  {item.value}
                </p>
              </div>

              {/* Copy button */}
              {item.copyable && <CopyButton value={item.value} />}
            </Wrapper>
          </motion.div>
        );
      })}
    </div>
  );
}

// Message form
function MessageForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending — replace with real email service (EmailJS, Formspree etc)
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
  };

  const inputClass = (field: string) => `
    w-full bg-white/[0.03] border rounded-xl px-4 py-3
    font-mono text-sm text-white placeholder-[#4a5568]
    outline-none transition-all duration-200
    ${
      focused === field
        ? 'border-cyan-glow/40 shadow-[0_0_0_2px_rgba(0,212,255,0.08)]'
        : 'border-white/[0.08] hover:border-white/[0.14]'
    }
  `;

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-10 text-center border border-emerald-500/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30
                     flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={28} className="text-emerald-400" />
        </motion.div>
        <h3 className="text-white text-xl font-bold mb-2">
          Message Transmitted
        </h3>
        <p className="text-[#8b949e] text-sm mb-6">
          Your message has been received. I'll get back to you shortly.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
          }}
          className="btn-ghost"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl overflow-hidden border border-white/5"
    >
      {/* Form chrome */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <Terminal size={12} className="text-[#6e7681]" />
        <span className="font-mono text-[10px] text-[#6e7681] tracking-widest">
          new_message.compose
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
        {/* Name + Email row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[10px] text-[#6e7681]
                              tracking-widest uppercase mb-2 block">
              Name
            </label>
            <input
              type="text"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              className={inputClass('name')}
            />
          </div>
          <div>
            <label className="font-mono text-[10px] text-[#6e7681]
                              tracking-widest uppercase mb-2 block">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              className={inputClass('email')}
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="font-mono text-[10px] text-[#6e7681]
                            tracking-widest uppercase mb-2 block">
            Subject
          </label>
          <input
            type="text"
            required
            placeholder="Data Engineering · Software Engineering · Collaboration"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            onFocus={() => setFocused('subject')}
            onBlur={() => setFocused(null)}
            className={inputClass('subject')}
          />
        </div>

        {/* Message */}
        <div>
          <label className="font-mono text-[10px] text-[#6e7681]
                            tracking-widest uppercase mb-2 block">
            Message
          </label>
          <textarea
            required
            rows={5}
            placeholder="Describe your project, role, or collaboration idea..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            className={`${inputClass('message')} resize-none`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={sending}
          className="btn-primary w-full justify-center disabled:opacity-60
                     disabled:cursor-not-allowed"
        >
          {sending ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-graphite-950/30
                           border-t-graphite-950 rounded-full"
              />
              Transmitting...
            </>
          ) : (
            <>
              <Send size={15} />
              Send Message
            </>
          )}
        </button>

        <p className="text-center font-mono text-[10px] text-[#4a5568]">
          Or reach out directly at{' '}
          
            href={`mailto:${PROFILE.email}`}
            className="text-cyan-glow hover:underline"
          >
            {PROFILE.email}
          </a>
        </p>
      </form>
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)',
        }}
      />

      {/* Background tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,212,255,0.03), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionLabel
          label="07 · Contact Terminal"
          title="Open to Opportunities"
          subtitle="Available for data engineering roles, software engineering positions, and interesting collaborations."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left — terminal + contact cards */}
          <div>
            <TerminalIntro />
            <ContactCards />

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex gap-3"
            >
              {[
                {
                  href: PROFILE.github,
                  icon: Github,
                  label: 'GitHub',
                  color: '#f59e0b',
                },
                {
                  href: PROFILE.linkedin,
                  icon: Linkedin,
                  label: 'LinkedIn',
                  color: '#38bdf8',
                },
                {
                  href: `mailto:${PROFILE.email}`,
                  icon: Mail,
                  label: 'Email',
                  color: '#00d4ff',
                },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith('http') ? '_blank' : undefined
                    }
                    rel={
                      social.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="flex-1 flex items-center justify-center gap-2
                               py-3 glass rounded-xl border border-white/5
                               hover:border-white/15 font-mono text-xs
                               text-[#6e7681] hover:text-white
                               transition-all duration-200 group"
                  >
                    <Icon
                      size={14}
                      style={{ color: social.color }}
                      className="group-hover:scale-110 transition-transform"
                    />
                    {social.label}
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Right — message form */}
          <div>
            <MessageForm />
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 pt-8 border-t border-white/[0.06]
                     flex flex-col sm:flex-row items-center
                     justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <Terminal size={13} className="text-cyan-glow" />
            <span className="font-mono text-xs text-[#6e7681]">
              Emmanuel Leakono · Data & Software Engineer
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="status-dot" />
              <span className="font-mono text-[10px] text-[#6e7681]">
                Available for work
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#4a5568]">
              Nairobi, Kenya · Open to Remote
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}