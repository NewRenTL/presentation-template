import { motion } from 'motion/react'
import { fadeIn, stagger } from '../../utils/animations'
import GlowOrb from '../ui/GlowOrb'

// ─────────────────────────────────────────────────────────────────────────────
// COVER SLIDE — customize pillars, title, subtitle and speaker info below
// ─────────────────────────────────────────────────────────────────────────────

// Replace with the main topics or technologies of your talk
const pillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    label: 'Topic One',
    desc: 'Short description',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
    label: 'Topic Two',
    desc: 'Short description',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    label: 'Topic Three',
    desc: 'Short description',
  },
]

export default function Slide01Cover() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-20 py-16">
      <GlowOrb color="cyan"  size="lg" opacity={0.07} style={{ top: '-15%', right: '-8%' }} />
      <GlowOrb color="blue"  size="md" opacity={0.05} style={{ bottom: '-12%', left: '-6%' }} delay={-5} />
      <GlowOrb color="slate" size="sm" opacity={0.06} style={{ top: '40%', left: '10%' }} delay={-10} />

      <motion.div
        className="w-full max-w-[900px] flex flex-col items-center text-center relative z-10"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Optional logo — replace with <img src="/your-logo.png" ... /> or remove */}
        <motion.div variants={fadeIn} className="mb-8">
          <div
            className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center"
            style={{
              background: 'rgba(0,191,255,0.12)',
              border: '1px solid rgba(0,191,255,0.25)',
              boxShadow: '0 0 40px rgba(0,191,255,0.15)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </motion.div>

        {/* Category tag — e.g. "Tech Talk · React", "Workshop · Python" */}
        <motion.div variants={fadeIn}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium uppercase mb-7"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.12em',
              color: '#00BFFF',
              background: 'rgba(0,191,255,0.08)',
              border: '1px solid rgba(0,191,255,0.22)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full pulse-glow" style={{ background: '#00BFFF' }} />
            {/* ← Change this tag text */}
            Tech Talk · Your Topic
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={fadeIn}
          className="font-black text-[64px] text-white mb-3 leading-tight"
          style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.025em', lineHeight: 1.04 }}
        >
          {/* ← Change the title */}
          Your Presentation
          <br />
          <span className="gradient-text">Title Here</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeIn}
          className="text-2xl font-semibold mb-11"
          style={{
            fontFamily: 'Outfit, sans-serif',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.01em',
          }}
        >
          {/* ← Change the subtitle */}
          A short, punchy subtitle
        </motion.p>

        {/* Pillar cards */}
        <motion.div variants={stagger} className="grid grid-cols-3 gap-3 mb-12 w-full max-w-[580px]">
          {pillars.map(p => (
            <motion.div
              key={p.label}
              variants={fadeIn}
              className="glass rounded-2xl p-5 text-center"
              style={{ transition: 'border-color 300ms' }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,191,255,0.3)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
              }}
            >
              <div className="flex justify-center mb-2.5" style={{ color: '#00BFFF' }}>
                {p.icon}
              </div>
              <div
                className="text-sm font-semibold text-white"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {p.label}
              </div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.38)' }}>
                {p.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Speaker chip — replace with your name and role */}
        <motion.div
          variants={fadeIn}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Replace with: <img src="/avatar.jpg" className="w-full h-full object-cover" /> */}
          <div
            className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
            style={{ background: 'rgba(0,191,255,0.12)', border: '1px solid rgba(0,191,255,0.2)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="text-left">
            <div
              className="text-sm font-semibold text-white"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {/* ← Your name */}
              Your Name
            </div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {/* ← Your role / company */}
              Role · Company
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
