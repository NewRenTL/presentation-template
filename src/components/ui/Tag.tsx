import type { ReactNode } from 'react'

// Tag — monospaced section label with UTEC cyan accent
// Usage: <Tag>01 · Section Name</Tag>
interface Props {
  children: ReactNode
  dot?: boolean
}

export default function Tag({ children, dot = true }: Props) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium uppercase mb-5"
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        letterSpacing: '0.12em',
        color: '#00BFFF',
        background: 'rgba(0,191,255,0.08)',
        border: '1px solid rgba(0,191,255,0.22)',
      }}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full pulse-glow"
          style={{ background: '#00BFFF', flexShrink: 0 }}
        />
      )}
      {children}
    </span>
  )
}
