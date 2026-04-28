import { motion } from 'motion/react'
import { fadeIn, fadeInLeft, fadeInRight, scaleIn, stagger } from '../../utils/animations'
import Tag from '../ui/Tag'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import GlowOrb from '../ui/GlowOrb'

// ─────────────────────────────────────────────────────────────────────────────
// CARDS SLIDE — comparison or feature grid
// Great for: comparing options, showcasing features, pros/cons, use cases
// ─────────────────────────────────────────────────────────────────────────────

const cards = [
  {
    variant: 'cyan' as const,
    badge: { label: 'Option A', color: 'cyan' as const },
    title: 'First Option',
    description: 'Describe this option, feature, or concept. What makes it stand out? When would you choose it?',
    points: ['Advantage one', 'Advantage two', 'Advantage three'],
    accentColor: '#00BFFF',
  },
  {
    variant: 'blue' as const,
    badge: { label: 'Option B', color: 'blue' as const },
    title: 'Second Option',
    description: 'Describe this option, feature, or concept. What makes it stand out? When would you choose it?',
    points: ['Advantage one', 'Advantage two', 'Advantage three'],
    accentColor: '#60a5fa',
  },
  {
    variant: 'slate' as const,
    badge: { label: 'Option C', color: 'slate' as const },
    title: 'Third Option',
    description: 'Describe this option, feature, or concept. What makes it stand out? When would you choose it?',
    points: ['Advantage one', 'Advantage two', 'Advantage three'],
    accentColor: '#7A9BB5',
  },
]

export default function Slide03Cards() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-20 py-12">
      <GlowOrb color="cyan"  size="md" opacity={0.05} style={{ top: '-5%', left: '-4%' }} />
      <GlowOrb color="slate" size="sm" opacity={0.06} style={{ bottom: '-8%', right: '-5%' }} delay={-7} />

      <motion.div
        className="w-full max-w-[1060px] relative z-10"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeIn}>
          <Tag>02 · Comparison</Tag>
        </motion.div>

        <motion.h2
          variants={fadeIn}
          className="font-bold text-[42px] text-white mb-6 leading-tight"
          style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
        >
          Comparing the{' '}
          <span className="gradient-text">main options</span>
        </motion.h2>

        <div className="grid grid-cols-3 gap-4 mb-5">
          {cards.map((card, i) => {
            const variant = i === 0 ? fadeInLeft : i === cards.length - 1 ? fadeInRight : fadeIn
            return (
              <motion.div key={card.title} variants={variant}>
                <Card variant={card.variant} className="h-full flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={card.badge.color}>{card.badge.label}</Badge>
                  </div>
                  <div
                    className="text-base font-bold text-white"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {card.title}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {card.description}
                  </p>
                  <ul className="flex flex-col gap-1.5 mt-auto">
                    {card.points.map(point => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-xs"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: card.accentColor }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Summary bar */}
        <motion.div
          variants={scaleIn}
          className="rounded-xl p-4 flex items-center gap-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {/* ← Quick takeaway tying all cards together */}
            Key insight: add a summary sentence that synthesizes what the audience should take away from this comparison.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
