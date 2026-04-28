import { useState, useCallback } from 'react'

export interface PDFExportState {
  exporting: boolean
  current: number
  total: number
}

export function usePDFExport(slideCount: number, onSetPrintSlide: (i: number | null) => void) {
  const [state, setState] = useState<PDFExportState | null>(null)

  const waitFrames = (n = 2) =>
    new Promise<void>(resolve => {
      let count = 0
      const tick = () => {
        if (++count >= n) resolve()
        else requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })

  const exportToPDF = useCallback(async () => {
    const [{ toPng }, { default: jsPDF }] = await Promise.all([
      import('html-to-image'),
      import('jspdf'),
    ])

    const W = 1280
    const H = 720
    const SCALE = 2

    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [W, H], compress: true })

    for (let i = 0; i < slideCount; i++) {
      setState({ exporting: true, current: i + 1, total: slideCount })
      onSetPrintSlide(i)

      await waitFrames(4)
      // Give stagger animations time to complete before capturing
      await new Promise(r => setTimeout(r, 1200))

      const frame = document.getElementById('pdf-print-frame')
      if (!frame) continue

      const dataUrl = await toPng(frame, {
        width: W,
        height: H,
        pixelRatio: SCALE,
        skipAutoScale: true,
      })

      if (i > 0) pdf.addPage([W, H], 'landscape')
      pdf.addImage(dataUrl, 'PNG', 0, 0, W, H, undefined, 'FAST')
    }

    onSetPrintSlide(null)
    setState(null)
    // Change this filename to match your presentation
    pdf.save('my-presentation.pdf')
  }, [slideCount, onSetPrintSlide])

  return { exportToPDF, state }
}
