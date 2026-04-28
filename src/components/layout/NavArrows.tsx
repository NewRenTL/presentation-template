interface Props {
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
}

export default function NavArrows({ onPrev, onNext, canPrev, canNext }: Props) {
  const base = [
    'fixed top-1/2 -translate-y-1/2 z-50',
    'w-11 h-11 rounded-full',
    'flex items-center justify-center',
    'text-xl select-none',
    'transition-all duration-200',
  ].join(' ')

  const active = 'cursor-pointer hover:scale-110'
  const disabled = 'cursor-default opacity-20 pointer-events-none'

  return (
    <>
      <button
        onClick={onPrev}
        className={`${base} left-4 ${canPrev ? active : disabled}`}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: canPrev ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
        }}
        onMouseEnter={e => {
          if (canPrev) {
            ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,191,255,0.1)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,191,255,0.35)'
            ;(e.currentTarget as HTMLElement).style.color = '#00BFFF'
          }
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
          ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'
        }}
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        onClick={onNext}
        className={`${base} right-4 ${canNext ? active : disabled}`}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: canNext ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
        }}
        onMouseEnter={e => {
          if (canNext) {
            ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,191,255,0.1)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,191,255,0.35)'
            ;(e.currentTarget as HTMLElement).style.color = '#00BFFF'
          }
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
          ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'
        }}
        aria-label="Next slide"
      >
        ›
      </button>
    </>
  )
}
