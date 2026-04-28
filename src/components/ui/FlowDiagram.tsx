import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { stagger, fadeIn } from '../../utils/animations'

// FlowDiagram — vertical node pipeline using UTEC color palette
// See CLAUDE.md for available color tokens.
//
// Usage:
//   const nodes: FlowNodeDef[] = [
//     { id: 'a', label: 'Step One',   sublabel: 'description', color: 'cyan',  icon: <YourIcon /> },
//     { id: 'b', label: 'Step Two',   sublabel: 'description', color: 'blue',  edgeLabel: 'via HTTP' },
//     { id: 'c', label: 'Step Three', sublabel: 'description', color: 'slate' },
//   ]
//   <FlowDiagram nodes={nodes} />
type NodeColor = 'cyan' | 'blue' | 'slate' | 'aqua' | 'neutral'

export interface FlowNodeDef {
  id: string
  label: string
  sublabel?: string
  icon?: ReactNode
  color?: NodeColor
  badge?: string
  edgeLabel?: string
}

interface Props {
  nodes: FlowNodeDef[]
  animate?: boolean
  compact?: boolean
}

const palette: Record<NodeColor, { border: string; bg: string; accent: string; iconBg: string }> = {
  cyan:    { border: '#00BFFF', bg: 'rgba(0,191,255,0.08)',   accent: '#00BFFF', iconBg: 'rgba(0,191,255,0.14)' },
  blue:    { border: '#60a5fa', bg: 'rgba(59,130,246,0.08)',  accent: '#60a5fa', iconBg: 'rgba(59,130,246,0.14)' },
  slate:   { border: '#7A9BB5', bg: 'rgba(48,70,89,0.12)',    accent: '#7A9BB5', iconBg: 'rgba(48,70,89,0.2)' },
  aqua:    { border: '#0FF0FF', bg: 'rgba(15,240,255,0.06)',  accent: '#0FF0FF', iconBg: 'rgba(15,240,255,0.12)' },
  neutral: { border: 'rgba(255,255,255,0.18)', bg: 'rgba(255,255,255,0.04)', accent: 'rgba(255,255,255,0.45)', iconBg: 'rgba(255,255,255,0.07)' },
}

interface ConnectorProps {
  label?: string
  fromColor: string
  toColor: string
  compact: boolean
}

function Connector({ label, fromColor, toColor, compact }: ConnectorProps) {
  const h = compact ? 28 : 36
  return (
    <div className="relative flex items-stretch" style={{ height: h }}>
      <div className="absolute left-0 right-0 flex flex-col items-center" style={{ height: h }}>
        <div
          style={{
            width: 1.5,
            height: h - 7,
            background: `linear-gradient(to bottom, ${fromColor}55, ${toColor}70)`,
          }}
        />
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M1 1 L5 6 L9 1"
            stroke={`${toColor}90`}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {label && (
        <div
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ left: 'calc(50% + 14px)' }}
        >
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.02em',
            }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  )
}

export default function FlowDiagram({ nodes, animate = true, compact = false }: Props) {
  const Wrapper = animate ? motion.div : 'div'
  const Item = animate ? motion.div : 'div'
  const py = compact ? 'py-2.5 px-3.5' : 'py-3 px-4'
  const iconSize = compact ? 'w-8 h-8' : 'w-9 h-9'

  return (
    <Wrapper
      {...(animate
        ? { variants: stagger, initial: 'hidden', animate: 'visible' }
        : {})}
      className="flex flex-col"
    >
      {nodes.map((node, i) => {
        const c = palette[node.color || 'neutral']
        const nextNode = nodes[i + 1]
        const nextC = nextNode ? palette[nextNode.color || 'neutral'] : null

        return (
          <div key={node.id}>
            <Item
              {...(animate ? { variants: fadeIn } : {})}
              className={`flex items-center gap-3 rounded-xl ${py}`}
              style={{
                background: c.bg,
                border: `1px solid ${c.border}22`,
                borderLeft: `2px solid ${c.border}`,
              }}
            >
              {node.icon && (
                <div
                  className={`${iconSize} rounded-lg flex items-center justify-center flex-shrink-0`}
                  style={{ background: c.iconBg, color: c.accent }}
                >
                  {node.icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-semibold text-white leading-tight"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {node.label}
                </div>
                {node.sublabel && (
                  <div
                    className="text-[10.5px] mt-0.5 leading-tight"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      color: c.accent,
                      opacity: 0.72,
                    }}
                  >
                    {node.sublabel}
                  </div>
                )}
              </div>
              {node.badge && (
                <span
                  className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    background: c.iconBg,
                    color: c.accent,
                    border: `1px solid ${c.border}30`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {node.badge}
                </span>
              )}
            </Item>
            {nextC && (
              <Connector
                label={node.edgeLabel}
                fromColor={c.border}
                toColor={nextC.border}
                compact={compact}
              />
            )}
          </div>
        )
      })}
    </Wrapper>
  )
}
