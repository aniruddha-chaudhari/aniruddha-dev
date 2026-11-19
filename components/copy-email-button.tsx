"use client"

import { useEffect, useRef, useState } from "react"
import { CopyIcons } from "./icons"

export function CopyEmailButton({ email, className }: { email: string; className: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle")
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(email)
      setState("done")
    } catch {
      setState("failed")
    }
    timer.current = setTimeout(() => setState("idle"), 2000)
  }

  return (
    <>
      <button className={className} type="button" onClick={copy} data-done={state === "done" ? "" : undefined}>
        <CopyIcons />
        <span className="copy-label">{state === "done" ? "Copied" : state === "failed" ? email : "Copy email"}</span>
      </button>
      <span className="sr" role="status" aria-live="polite">
        {state === "done" ? "Email address copied" : ""}
      </span>
    </>
  )
}
