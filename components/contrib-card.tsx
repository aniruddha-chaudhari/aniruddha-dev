"use client"

import { useEffect, useRef, useState } from "react"
import type { ContributionGraph } from "@/lib/contributions"

const PITCH = 6
const SIZE = 5.4
const ROWS = 7

/** The GitHub activity card: headline numbers, then a year of days as a rounded-tile heatmap. */
export function ContribCard({ graph }: { graph: ContributionGraph }) {
  const root = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(-1)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const { cells, cols, total, active, streak, busiest, months } = graph
  const gw = cols * PITCH
  const gd = ROWS * PITCH
  const idle = `${total} contributions · ${active} active days · streak ${streak}d`
  const readout =
    hovered >= 0
      ? `${cells[hovered].label} · ${cells[hovered].count} ${cells[hovered].count === 1 ? "contribution" : "contributions"}`
      : idle
  const lx = gw - 5 * PITCH - 1

  return (
    <figure className="fig fig-wide" id="fig-contrib" ref={root} data-in={shown ? "" : undefined}>
      <div className="fig-corners" aria-hidden="true">
        <span data-c="hint">Hover a day</span>
        <span data-c="readout">{readout}</span>
      </div>
      <div className="cb-stats">
        <div className="cb-big">{total}</div>
        <div className="cb-cap">
          contributions
          <br />
          last year
        </div>
        <ul className="cb-chips">
          <li>
            <b>{active}d</b> active
          </li>
          <li>
            <b>{streak}d</b> streak
          </li>
          <li>
            <b>{busiest.count}</b> best
          </li>
        </ul>
      </div>
      <div className="cb-scroll">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="iso-svg"
          viewBox={`-14 -8 ${gw + 22} ${gd + 20}`}
          role="img"
          aria-label={`GitHub contributions for the last 12 months: ${total} in total over ${active} days. The busiest day was ${busiest.label} with ${busiest.count}.`}
          onPointerLeave={() => setHovered(-1)}
        >
          <defs>
            <filter id="cb-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="1.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g className="cb-labels">
            {months.map((m) => (
              <text key={m.col} x={m.col * PITCH + 0.6} y={-3}>
                {m.name}
              </text>
            ))}
            {["mon", "wed", "fri"].map((d, i) => (
              <text key={d} x={-3} y={(1 + i * 2) * PITCH + PITCH * 0.72} textAnchor="end">
                {d}
              </text>
            ))}
            <text x={lx - 2} y={gd + 7.3} textAnchor="end">
              less
            </text>
            {[0, 1, 2, 3, 4].map((l) => (
              <rect key={l} className="cb-swatch" data-l={l} x={lx + l * PITCH} y={gd + 4} width={4.6} height={4.6} rx={0.8} />
            ))}
            <text x={lx + 5 * PITCH + 1} y={gd + 7.3}>
              more
            </text>
          </g>
          <g data-cells>
            {cells.map((c, i) => (
              <g
                key={i}
                className="cb-cell"
                data-l={c.level}
                data-hover={hovered === i ? "" : undefined}
                style={{ ["--d" as string]: `${((c.col / Math.max(1, cols - 1)) * 0.9 + c.row * 0.004).toFixed(3)}s` }}
                onPointerEnter={() => setHovered(i)}
              >
                <rect
                  className="cb-ct"
                  x={c.col * PITCH + (PITCH - SIZE) / 2}
                  y={c.row * PITCH + (PITCH - SIZE) / 2}
                  width={SIZE}
                  height={SIZE}
                  rx={1.4}
                />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </figure>
  )
}
