interface Props {
  current: number
  total: number
}

export default function SlideCounter({ current, total }: Props) {
  return (
    <div
      className="fixed bottom-[18px] right-7 z-50 text-[11px] tabular-nums"
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        color: 'rgba(255,255,255,0.2)',
      }}
    >
      {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </div>
  )
}
