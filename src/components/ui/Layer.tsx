import type { ReactNode } from 'react'

// Layer — numbered list item with a UTEC-colored left border accent
// Usage:
//   <Layer number="01" title="First step" color="cyan">
//     Description of the step
//   </Layer>
interface Props {
  number: string | number
  title: string
  children: ReactNode
  color?: 'cyan' | 'blue' | 'slate'
}

const colorMap = {
  cyan:  { accent: '#00BFFF', bg: 'rgba(0,191,255,0.12)' },
  blue:  { accent: '#60a5fa', bg: 'rgba(59,130,246,0.12)' },
  slate: { accent: '#7A9BB5', bg: 'rgba(48,70,89,0.2)' },
}

export default function Layer({ number, title, children, color = 'cyan' }: Props) {
  const c = colorMap[color]

  return (
    <div
      className="flex items-start gap-3.5 px-4 py-3.5 rounded-xl"
      style={{
        borderLeft: `2px solid ${c.accent}`,
        background: 'rgba(255,255,255,0.025)',
      }}
    >
      <div
        className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center mt-0.5"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          fontWeight: 600,
          color: c.accent,
          background: c.bg,
        }}
      >
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-sm font-semibold text-white mb-1"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {title}
        </div>
        <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
