import { useState, useEffect, useCallback } from 'react'

export function usePresentation(totalSlides: number) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback((delta: number) => {
    setCurrent(prev => {
      const next = prev + delta
      if (next < 0 || next >= totalSlides) return prev
      setDirection(delta > 0 ? 1 : -1)
      return next
    })
  }, [totalSlides])

  const jumpTo = useCallback((index: number) => {
    setCurrent(prev => {
      if (index === prev || index < 0 || index >= totalSlides) return prev
      setDirection(index > prev ? 1 : -1)
      return index
    })
  }, [totalSlides])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault()
          go(1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          go(-1)
          break
        case 'Home':
          jumpTo(0)
          break
        case 'End':
          jumpTo(totalSlides - 1)
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [go, jumpTo, totalSlides])

  return { current, direction, go, jumpTo }
}
