import { useState, useCallback } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { usePresentation } from './hooks/usePresentation'
import { usePDFExport } from './hooks/usePDFExport'
import { SLIDES_META } from './data/slides'
import { slideVariants } from './utils/animations'

// Layout
import ProgressBar      from './components/layout/ProgressBar'
import NavArrows        from './components/layout/NavArrows'
import NavDots          from './components/layout/NavDots'
import SlideCounter     from './components/layout/SlideCounter'
import PDFExportButton  from './components/layout/PDFExportButton'

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES — import your slide components here and add them to the SLIDES array.
// The order in SLIDES determines the presentation order.
// ─────────────────────────────────────────────────────────────────────────────
import Slide01Cover      from './components/slides/Slide01Cover'
import Slide02Content    from './components/slides/Slide02Content'
import Slide03Cards      from './components/slides/Slide03Cards'
import Slide04TwoColumn  from './components/slides/Slide04TwoColumn'
import Slide05Closing    from './components/slides/Slide05Closing'

const SLIDES = [
  Slide01Cover,
  Slide02Content,
  Slide03Cards,
  Slide04TwoColumn,
  Slide05Closing,
]

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUND ORBS — UTEC palette (#00BFFF cyan, #304659 slate, #3b82f6 blue)
// Adjust positions and opacity to taste.
// ─────────────────────────────────────────────────────────────────────────────
const BG_ORBS = [
  { top: '-8%',     left: '-4%',  size: 600, color: '#00BFFF', opacity: 0.05, blur: 180, delay: '0s' },
  { bottom: '-10%', right: '-5%', size: 500, color: '#304659', opacity: 0.07, blur: 160, delay: '-7s' },
  { top: '35%',     right: '20%', size: 380, color: '#3b82f6', opacity: 0.03, blur: 140, delay: '-14s' },
]

export default function App() {
  const total = SLIDES.length
  const { current, direction, go, jumpTo } = usePresentation(total)
  const CurrentSlide = SLIDES[current]

  // PDF export
  const [printSlide, setPrintSlide] = useState<number | null>(null)
  const handleSetPrintSlide = useCallback((i: number | null) => setPrintSlide(i), [])
  const { exportToPDF, state: pdfState } = usePDFExport(total, handleSetPrintSlide)
  const PrintSlide = printSlide !== null ? SLIDES[printSlide] : null

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0A1118' }}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {BG_ORBS.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full float-orb"
            style={{
              top: orb.top,
              left: orb.left,
              bottom: (orb as { bottom?: string }).bottom,
              right: (orb as { right?: string }).right,
              width: orb.size,
              height: orb.size,
              background: orb.color,
              opacity: orb.opacity,
              filter: `blur(${orb.blur}px)`,
              animationDelay: orb.delay,
            }}
          />
        ))}
      </div>

      {/* Chrome */}
      <ProgressBar current={current} total={total} />
      <NavArrows
        onPrev={() => go(-1)}
        onNext={() => go(1)}
        canPrev={current > 0}
        canNext={current < total - 1}
      />
      <NavDots current={current} total={total} slides={SLIDES_META} onJump={jumpTo} />
      <SlideCounter current={current} total={total} />
      <PDFExportButton onExport={exportToPDF} state={pdfState} />

      {/* Active slide */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-10"
        >
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      {/* Off-screen frame used by PDF export — do not remove */}
      {PrintSlide && (
        <MotionConfig reducedMotion="always">
          <div
            id="pdf-print-frame"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 1280,
              height: 720,
              background: '#0A1118',
              overflow: 'hidden',
              pointerEvents: 'none',
              zIndex: 150,
            }}
          >
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-8%', left: '-4%', width: 600, height: 600, borderRadius: '50%', background: '#00BFFF', opacity: 0.05, filter: 'blur(180px)' }} />
              <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: '#304659', opacity: 0.07, filter: 'blur(160px)' }} />
            </div>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <PrintSlide />
            </div>
          </div>
        </MotionConfig>
      )}
    </div>
  )
}
