"use client"

import { useEffect, useRef } from "react"
import { gearsSvg } from "./figures/gears-svg"
import { initGears } from "./figures/gears-behavior"

/** Four meshing gears: drag any of them to spin the train, hover to speed it up. */
export function GearsFigure() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => (ref.current ? initGears(ref.current) : undefined), [])

  return <figure ref={ref} className="fig contact-fig" id="fig-gears" dangerouslySetInnerHTML={{ __html: gearsSvg }} />
}
