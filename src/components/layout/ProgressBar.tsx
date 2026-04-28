interface Props {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: Props) {
  const progress = ((current + 1) / total) * 100

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px]"
      style={{ background: 'rgba(255,255,255,0.05)' }}
    >
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(to right, #00BFFF, #0FF0FF)',
        }}
      />
    </div>
  )
}
