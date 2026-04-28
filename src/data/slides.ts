export interface SlideMeta {
  id: number
  label: string
  section: string
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES REGISTRY
// Add one entry per slide. These power the navigation dots tooltip and the
// slide counter. Keep `id` sequential and `section` as a zero-padded string.
// ─────────────────────────────────────────────────────────────────────────────
export const SLIDES_META: SlideMeta[] = [
  { id: 1, label: 'Cover',      section: '00' },
  { id: 2, label: 'Content',    section: '01' },
  { id: 3, label: 'Cards',      section: '02' },
  { id: 4, label: 'Two Column', section: '03' },
  { id: 5, label: 'Closing',    section: '04' },
]
