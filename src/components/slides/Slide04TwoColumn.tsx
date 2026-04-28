import { motion } from 'motion/react'
import { fadeIn, fadeInLeft, fadeInRight, stagger } from '../../utils/animations'
import Tag from '../ui/Tag'
import GlowOrb from '../ui/GlowOrb'
import FlowDiagram, { type FlowNodeDef } from '../ui/FlowDiagram'
// Uncomment the next line and remove FlowDiagram if you prefer a code block on the right
// import CodeBlock from '../ui/CodeBlock'

// ─────────────────────────────────────────────────────────────────────────────
// TWO-COLUMN SLIDE — text + visual (flow diagram or code block)
// Great for: architecture diagrams, code examples, before/after, concept + demo
//
// Right column options:
//   A) FlowDiagram  — shows a vertical step-by-step pipeline (current)
//   B) CodeBlock    — shows a syntax-highlighted snippet
//      To switch: comment out <FlowDiagram />, uncomment <CodeBlock /> below,
//      and import CodeBlock at the top.
// ─────────────────────────────────────────────────────────────────────────────

const flowNodes: FlowNodeDef[] = [
  {
    id: 'step1',
    label: 'Step One',
    sublabel: 'entry point',
    color: 'cyan',
  },
  {
    id: 'step2',
    label: 'Step Two',
    sublabel: 'processing',
    color: 'blue',
    edgeLabel: 'transforms',
  },
  {
    id: 'step3',
    label: 'Step Three',
    sublabel: 'output',
    color: 'slate',
  },
]

const bullets = [
  { text: 'Key point about this topic. Keep it brief.' },
  { text: 'Another supporting detail or fact.' },
  { text: 'A third insight that adds value.' },
]

export default function Slide04TwoColumn() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-20 py-12">
      <GlowOrb color="cyan"  size="md" opacity={0.05} style={{ top: '-8%', left: '-5%' }} />
      <GlowOrb color="blue"  size="sm" opacity={0.04} style={{ bottom: '-5%', right: '-4%' }} delay={-6} />

      <motion.div
        className="w-full max-w-[1100px] relative z-10"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeIn}>
          <Tag>03 · Deep Dive</Tag>
        </motion.div>

        <motion.h2
          variants={fadeIn}
          className="font-bold text-[40px] text-white mb-6 leading-tight"
          style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
        >
          How it <span className="gradient-text">works</span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-8 items-start">
          {/* Left — text */}
          <motion.div variants={fadeInLeft} className="flex flex-col gap-4">
            <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {/* ← Main explanation paragraph */}
              Write a clear explanation of the concept here. Two to three sentences is ideal.
              Give enough context so the visual on the right makes sense.
            </p>

            <ul className="flex flex-col gap-2.5 mt-1">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: '#00BFFF' }}
                  />
                  {b.text}
                </li>
              ))}
            </ul>

            {/* Highlight box */}
            <div
              className="rounded-xl p-4 mt-2"
              style={{
                background: 'rgba(0,191,255,0.05)',
                border: '1px solid rgba(0,191,255,0.15)',
              }}
            >
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <strong style={{ color: '#00BFFF' }}>Key takeaway:</strong>{' '}
                {/* ← Most important insight */}
                Write the most important insight here so it stands out visually.
              </p>
            </div>
          </motion.div>

          {/* Right — visual */}
          <motion.div variants={fadeInRight}>
            {/* Option A: Flow Diagram (active) */}
            <FlowDiagram nodes={flowNodes} compact={false} />

            {/* Option B: Code Block
            To use this instead, import CodeBlock at the top, then replace the
            FlowDiagram above with:

            <CodeBlock
              code={`const result = await fetch('/api/data')\nconsole.log(result)`}
              language="typescript"
              fontSize={12}
            />
            */}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
