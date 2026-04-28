import { motion } from 'motion/react'
import { fadeIn, stagger } from '../../utils/animations'
import Tag from '../ui/Tag'
import GlowOrb from '../ui/GlowOrb'
import Layer from '../ui/Layer'

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT SLIDE — numbered list layout
// Great for: key concepts, steps, principles, takeaways
// ─────────────────────────────────────────────────────────────────────────────

const items = [
  {
    number: '01',
    title: 'First Key Point',
    description: 'Explain this point in one or two sentences. Keep it concise — the audience is listening to you, not reading.',
    color: 'cyan' as const,
  },
  {
    number: '02',
    title: 'Second Key Point',
    description: 'Another insight or step. Use concrete language and avoid jargon unless your audience is technical.',
    color: 'blue' as const,
  },
  {
    number: '03',
    title: 'Third Key Point',
    description: 'Supporting detail or evidence. Numbers, percentages, or quick examples make this memorable.',
    color: 'slate' as const,
  },
  {
    number: '04',
    title: 'Fourth Key Point',
    description: 'The conclusion or call to action for this section. What should the audience remember?',
    color: 'cyan' as const,
  },
]

export default function Slide02Content() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-20 py-12">
      <GlowOrb color="blue"  size="md" opacity={0.05} style={{ top: '-5%', right: '-5%' }} />
      <GlowOrb color="slate" size="sm" opacity={0.06} style={{ bottom: '-8%', left: '-4%' }} delay={-8} />

      <motion.div
        className="w-full max-w-[960px] relative z-10"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Section tag */}
        <motion.div variants={fadeIn}>
          <Tag>01 · Section Name</Tag>
        </motion.div>

        {/* Slide title */}
        <motion.h2
          variants={fadeIn}
          className="font-bold text-[42px] text-white mb-8 leading-tight"
          style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
        >
          Slide title with a{' '}
          <span className="gradient-text">highlighted word</span>
        </motion.h2>

        {/* Layer list */}
        <motion.div variants={stagger} className="flex flex-col gap-3">
          {items.map(item => (
            <motion.div key={item.number} variants={fadeIn}>
              <Layer number={item.number} title={item.title} color={item.color}>
                {item.description}
              </Layer>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
