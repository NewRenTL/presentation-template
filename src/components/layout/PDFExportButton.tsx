import { motion, AnimatePresence } from 'motion/react'
import { Download, Loader2 } from 'lucide-react'
import type { PDFExportState } from '../../hooks/usePDFExport'

interface Props {
  onExport: () => void
  state: PDFExportState | null
}

export default function PDFExportButton({ onExport, state }: Props) {
  const exporting = state !== null

  return (
    <>
      <motion.button
        onClick={onExport}
        disabled={exporting}
        className="fixed bottom-[14px] left-7 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200"
        style={{
          background: exporting ? 'rgba(255,255,255,0.04)' : 'rgba(0,191,255,0.08)',
          border: `1px solid ${exporting ? 'rgba(255,255,255,0.08)' : 'rgba(0,191,255,0.25)'}`,
          color: exporting ? 'rgba(255,255,255,0.25)' : '#00BFFF',
          cursor: exporting ? 'not-allowed' : 'pointer',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
        }}
        whileHover={!exporting ? { scale: 1.05 } : undefined}
        whileTap={!exporting ? { scale: 0.97 } : undefined}
        title="Export to PDF"
      >
        {exporting ? (
          <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />
        ) : (
          <Download size={12} />
        )}
        PDF
      </motion.button>

      <AnimatePresence>
        {exporting && state && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: 'rgba(10,17,24,0.88)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center gap-5 rounded-2xl p-10"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="relative w-16 h-16">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ border: '2px solid rgba(0,191,255,0.15)' }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '2px solid transparent',
                    borderTopColor: '#00BFFF',
                    animation: 'spin 0.9s linear infinite',
                  }}
                />
                <div
                  className="absolute inset-2 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,191,255,0.08)', color: '#00BFFF' }}
                >
                  <Download size={18} />
                </div>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="text-white font-semibold text-base"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Generating PDF...
                </div>
                <div
                  className="text-sm"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.4)' }}
                >
                  Capturing slide {state.current} / {state.total}
                </div>
              </div>

              <div
                className="w-56 h-1.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(to right, #00BFFF, #0FF0FF)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${(state.current / state.total) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  )
}
