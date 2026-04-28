import { motion } from 'motion/react'
import { fadeIn, scaleIn, stagger } from '../../utils/animations'
import Tag from '../ui/Tag'
import GlowOrb from '../ui/GlowOrb'

// ─────────────────────────────────────────────────────────────────────────────
// CLOSING SLIDE — Q&A or Thank You
// Replace the heading and links with your own contact info / resources
// ─────────────────────────────────────────────────────────────────────────────

const links = [
  { label: 'GitHub', value: 'https://github.com/NewRenTL', color: '#00BFFF' },
  // { label: 'Slides',  value: 'slides.com/yourslides', color: '#60a5fa' },
  { label: 'Contact', value: 'diegor.bpa.02@gmail.com', color: '#7A9BB5' },
]

export default function Slide05Closing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-20 py-12">
      <GlowOrb color="cyan" size="lg" opacity={0.09} style={{ top: '-10%', left: '-5%' }} />
      <GlowOrb color="blue" size="md" opacity={0.06} style={{ bottom: '-12%', right: '-8%' }} delay={-6} />
      <GlowOrb color="slate" size="sm" opacity={0.07} style={{ top: '55%', right: '25%' }} delay={-12} />

      <motion.div
        className="flex flex-col items-center text-center relative z-10"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeIn}>
          <Tag>Q & A</Tag>
        </motion.div>

        {/* Big symbol — swap "?" for any icon, emoji, or logo */}
        <motion.div variants={scaleIn} className="relative my-6 flex items-center justify-center">
          <div
            className="absolute rounded-full"
            style={{
              width: 240,
              height: 240,
              border: '1px solid rgba(0,191,255,0.10)',
              background: 'radial-gradient(circle, rgba(0,191,255,0.06) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{ width: 175, height: 175, border: '1px solid rgba(0,191,255,0.16)' }}
          />
          <div className="relative w-[240px] h-[240px] flex items-center justify-center overflow-visible">
            <span
              className="gradient-text select-none"
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 140,
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              ?
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeIn}
          className="font-bold text-white mb-3"
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 50,
            letterSpacing: '-0.025em',
          }}
        >
          {/* ← Change to "Thank you!", "Let's discuss", etc. */}
          Questions?
        </motion.h2>

        <motion.p
          variants={fadeIn}
          className="text-lg max-w-lg mb-8"
          style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Outfit, sans-serif' }}
        >
          {/* ← Closing sentence */}
          Ask anything about the topic, the stack, or the approach.
        </motion.p>

        {/* Resource links */}
        <motion.div variants={stagger} className="flex items-center gap-6">
          {links.map(link => (
            <motion.div
              key={link.label}
              variants={fadeIn}
              className="flex flex-col items-center gap-1"
            >
              <span
                className="text-[10px] uppercase tracking-widest"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                {link.label}
              </span>
              <span
                className="text-sm font-medium"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: link.color,
                }}
              >
                {link.value}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Speaker footer */}
        <motion.div
          variants={fadeIn}
          className="flex items-center gap-3 mt-10 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Replace with: <img src="/avatar.jpg" className="w-full h-full object-cover" /> */}
          <div
            className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(0,191,255,0.1)',
            }}
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
            <div
              className="text-xs"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00BFFF', opacity: 0.7 }}
            >
              {/* ← Your role / company */}
              Role · Company
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
