import type { ReactNode } from 'react'

// UTEC color variants — see CLAUDE.md for token reference
type Variant = 'cyan' | 'blue' | 'slate' | 'aqua' | 'yellow' | 'neutral'

interface Props {
  children: ReactNode
  variant?: Variant
}

const variants: Record<Variant, { bg: string; color: string }> = {
  cyan:    { bg: 'rgba(0,191,255,0.15)',   color: '#00BFFF' },
  blue:    { bg: 'rgba(59,130,246,0.15)',  color: '#60a5fa' },
  slate:   { bg: 'rgba(48,70,89,0.25)',    color: '#7A9BB5' },
  aqua:    { bg: 'rgba(15,240,255,0.12)',  color: '#0FF0FF' },
  yellow:  { bg: 'rgba(251,191,36,0.15)',  color: '#fbbf24' },
  neutral: { bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' },
}

export default function Badge({ children, variant = 'cyan' }: Props) {
  const v = variants[variant]
  return (
    <span
      className="inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap"
      style={{ background: v.bg, color: v.color }}
    >
      {children}
    </span>
  )
}
