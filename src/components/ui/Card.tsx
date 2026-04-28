import type { ReactNode } from 'react'

// UTEC color variants — see CLAUDE.md for token reference
type Variant = 'glass' | 'cyan' | 'blue' | 'slate' | 'aqua'

interface Props {
  children: ReactNode
  variant?: Variant
  className?: string
  padding?: string
}

const variantStyles: Record<Variant, { bg: string; border: string }> = {
  glass: { bg: 'rgba(255,255,255,0.04)',  border: 'rgba(255,255,255,0.08)' },
  cyan:  { bg: 'rgba(0,191,255,0.06)',    border: 'rgba(0,191,255,0.18)' },
  blue:  { bg: 'rgba(59,130,246,0.06)',   border: 'rgba(59,130,246,0.18)' },
  slate: { bg: 'rgba(48,70,89,0.12)',     border: 'rgba(48,70,89,0.28)' },
  aqua:  { bg: 'rgba(15,240,255,0.05)',   border: 'rgba(15,240,255,0.16)' },
}

export default function Card({
  children,
  variant = 'glass',
  className = '',
  padding = 'p-6',
}: Props) {
  const s = variantStyles[variant]
  return (
    <div
      className={`rounded-2xl ${padding} ${className}`}
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
      }}
    >
      {children}
    </div>
  )
}
