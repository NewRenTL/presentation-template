// AsciiDiagram — monospaced code/diagram block with optional label and line highlight
// The highlighted line is rendered in UTEC Cyan (#00BFFF).
//
// Usage:
//   <AsciiDiagram
//     label="terminal"
//     highlight="Success"
//     code={`$ command arg1 arg2\n  → Running...\n  → Success`}
//   />
interface Props {
  code: string
  label?: string
  highlight?: string
}

export default function AsciiDiagram({ code, label, highlight }: Props) {
  const lines = code.split('\n')

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {label && (
        <div
          className="px-4 py-2 text-[10px] uppercase tracking-widest border-b"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: 'rgba(0,191,255,0.6)',
            borderColor: 'rgba(255,255,255,0.06)',
            background: 'rgba(0,0,0,0.2)',
            letterSpacing: '0.1em',
          }}
        >
          {label}
        </div>
      )}
      <pre
        className="px-5 py-4 text-[12px] leading-relaxed overflow-auto"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          color: '#e2e8f0',
          margin: 0,
        }}
      >
        {lines.map((line, i) => {
          if (highlight && line.includes(highlight)) {
            return (
              <span key={i}>
                <span style={{ color: '#00BFFF' }}>{line}</span>
                {'\n'}
              </span>
            )
          }
          return <span key={i}>{line}{'\n'}</span>
        })}
      </pre>
    </div>
  )
}
