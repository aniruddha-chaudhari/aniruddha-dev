"use client"

import { useEffect, useRef } from "react"
import { deskSvg } from "./figures/desk-svg"
import { initDesk } from "./figures/desk-behavior"

/** The hero drawing: a desk that types itself, with keys, a mouse and a phone that react to you. */
export function DeskFigure() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => (ref.current ? initDesk(ref.current) : undefined), [])

  return <figure ref={ref} className="fig hero-fig" id="fig-desk" dangerouslySetInnerHTML={{ __html: deskSvg }} />
}
