"use client"

import { useEffect, useRef } from "react"
import { ArrowIcon } from "./icons"
import { sentence, tagLabel, type Project } from "@/lib/projects"

type Props = {
  projects: Project[]
  /** The full list on /projects (wider list styling and rack highlighting). */
  all?: boolean
  /** Index of the row to highlight from outside (the rack). */
  highlight?: number
  /** Called with the row index when the pointer or focus enters, and -1 when it leaves. */
  onPull?: (index: number) => void
}

const PREVIEW_SCALE = 300 / 1280

/**
 * The project index. Hover a row on a desktop and a preview follows the cursor: the screenshot first,
 * then the live site loaded behind it, fading in once it has.
 */
export function ProjectList({ projects, all, highlight, onPull }: Props) {
  const peek = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const state = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0, on: false, timer: 0 as unknown as ReturnType<typeof setTimeout> })
  const frames = useRef(new Map<string, HTMLIFrameElement>())

  useEffect(() => {
    const map = frames.current
    const s = state.current
    return () => {
      cancelAnimationFrame(s.raf)
      clearTimeout(s.timer)
      map.clear()
    }
  }, [])

  function place() {
    const el = peek.current
    const s = state.current
    if (!el) return
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches
    const w = el.offsetWidth
    const h = el.offsetHeight
    let nx = s.tx + 28
    let ny = s.ty - h / 2
    if (nx + w > innerWidth - 12) nx = s.tx - w - 28
    ny = Math.max(12, Math.min(innerHeight - h - 12, ny))
    const k = calm ? 1 : 0.22
    s.x += (nx - s.x) * k
    s.y += (ny - s.y) * k
    el.style.transform = `translate(${s.x.toFixed(1)}px,${s.y.toFixed(1)}px)`
    s.raf = s.on && (Math.abs(nx - s.x) > 0.5 || Math.abs(ny - s.y) > 0.5) ? requestAnimationFrame(place) : 0
  }

  function hideLive() {
    peek.current?.querySelectorAll("iframe[data-show]").forEach((f) => f.removeAttribute("data-show"))
  }

  function showLive(project: Project) {
    const s = state.current
    clearTimeout(s.timer)
    hideLive()
    if (!project.live) return
    s.timer = setTimeout(() => {
      const el = peek.current
      if (!el) return
      let f = frames.current.get(project.live)
      if (!f) {
        f = document.createElement("iframe")
        f.tabIndex = -1
        f.setAttribute("aria-hidden", "true")
        f.loading = "lazy"
        f.setAttribute("sandbox", "allow-scripts allow-same-origin")
        f.referrerPolicy = "no-referrer"
        f.style.transform = `scale(${PREVIEW_SCALE})`
        const frame = f
        f.addEventListener("load", () => setTimeout(() => frame.setAttribute("data-ready", ""), 500))
        f.src = project.live
        el.append(f)
        frames.current.set(project.live, f)
      }
      if (s.on) f.setAttribute("data-show", "")
    }, 350)
  }

  function enter(e: React.PointerEvent, project: Project, index: number) {
    onPull?.(index)
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const s = state.current
    if (img.current) img.current.src = project.image
    s.tx = e.clientX
    s.ty = e.clientY
    if (!s.on) {
      s.x = s.tx + 28
      s.y = s.ty - 94
    }
    s.on = true
    peek.current?.setAttribute("data-on", "")
    if (!s.raf) s.raf = requestAnimationFrame(place)
    showLive(project)
  }

  function move(e: React.PointerEvent) {
    const s = state.current
    s.tx = e.clientX
    s.ty = e.clientY
    if (!s.raf) s.raf = requestAnimationFrame(place)
  }

  function leave() {
    const s = state.current
    onPull?.(-1)
    s.on = false
    clearTimeout(s.timer)
    peek.current?.removeAttribute("data-on")
    hideLive()
  }

  return (
    <>
      <div className="peek" ref={peek} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={img} alt="" />
      </div>
      <ul className={all ? "index index-all" : "index"}>
        {projects.map((p, i) => {
          const live = Boolean(p.live)
          return (
            <li
              key={p.id}
              className="idx"
              data-hl={highlight === i ? "" : undefined}
              onPointerEnter={(e) => enter(e, p, i)}
              onPointerMove={move}
              onPointerLeave={leave}
              onFocus={() => onPull?.(i)}
              onBlur={() => onPull?.(-1)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="idx-thumb" src={p.image} alt="" loading="lazy" />
              <a className="idx-name" href={p.live || p.repo} target="_blank" rel="noopener">
                <span className="dot" data-live={live} title={live ? "Live" : "Code only"} />
                {p.title}
              </a>
              <div className="idx-text">
                <p>{sentence(p.description)}</p>
                <p className="idx-stack">{p.tags.slice(0, 3).map(tagLabel).join(" · ")}</p>
              </div>
              <div className="idx-links">
                {live && (
                  <a href={p.live} target="_blank" rel="noopener">
                    live <ArrowIcon />
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noopener">
                    code <ArrowIcon />
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
