import type { SlideMeta } from '../../data/slides'

interface Props {
  current: number
  total: number
  slides: SlideMeta[]
  onJump: (index: number) => void
}

export default function NavDots({ current, total, slides, onJump }: Props) {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex gap-[5px] items-center">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onJump(i)}
          title={slides[i]?.label}
          className="h-[6px] rounded-full transition-all duration-300 cursor-pointer"
          style={{
            width: i === current ? '22px' : '6px',
            background: i === current ? '#00BFFF' : 'rgba(255,255,255,0.15)',
          }}
          onMouseEnter={e => {
            if (i !== current) {
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.35)'
            }
          }}
          onMouseLeave={e => {
            if (i !== current) {
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'
            }
          }}
          aria-label={`Go to ${slides[i]?.label}`}
        />
      ))}
    </div>
  )
}
