"use client"

import { useEffect, useRef } from "react"

const START = 0.1

// A hairline on the left edge of the viewport that fills top to bottom as the page scrolls,
// with the percentage riding at the tip of the fill. Updates via refs so scrolling never re-renders React.
export function ScrollProgress() {
  const fill = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const raw = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      // Starts at 10% at the top and reaches 100% at the bottom.
      const p = START + (1 - START) * raw
      if (fill.current) fill.current.style.transform = `scaleY(${p})`
      if (label.current) label.current.style.top = `max(${p * 100}%, 96px)`
      if (label.current) label.current.textContent = `${Math.round(p * 100)}%`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    const ro = new ResizeObserver(onScroll)
    ro.observe(document.body)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="progress" aria-hidden="true">
      <span className="progress-pct" ref={label}>
        10%
      </span>
      <div className="progress-line">
        <div className="progress-fill" ref={fill} />
      </div>
    </div>
  )
}
