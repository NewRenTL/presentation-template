import type { CSSProperties } from 'react'

// GlowOrb — ambient background blur circle using UTEC palette
// Place behind slide content for depth. Wrap parent in position:relative.
// Example: <GlowOrb color="cyan" size="lg" opacity={0.07} style={{ top: '-15%', right: '-8%' }} />
interface Props {
  color?: 'cyan' | 'blue' | 'slate'
  size?: 'sm' | 'md' | 'lg'
  opacity?: number
  style?: CSSProperties
  className?: string
  delay?: number
}

// UTEC brand color map for orbs
const colorMap = {
  cyan:  '#00BFFF',
  blue:  '#3b82f6',
  slate: '#304659',
}

const sizeMap = {
  sm: { dim: 300, blur: 100 },
  md: { dim: 460, blur: 150 },
  lg: { dim: 600, blur: 180 },
}

export default function GlowOrb({
  color = 'cyan',
  size = 'md',
  opacity = 0.06,
  style,
  className = '',
  delay = 0,
}: Props) {
  const c = colorMap[color]
  const s = sizeMap[size]

  return (
    <div
      className={`absolute pointer-events-none rounded-full float-orb ${className}`}
      style={{
        width: `${s.dim}px`,
        height: `${s.dim}px`,
        background: c,
        opacity,
        filter: `blur(${s.blur}px)`,
        animationDelay: `${delay}s`,
        ...style,
      }}
    />
  )
}
