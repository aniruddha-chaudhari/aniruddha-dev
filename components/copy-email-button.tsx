"use client"

import { useEffect, useRef, useState } from "react"
import { CheckIcon, CopyIcons, MailIcon } from "./icons"

export function CopyEmailButton({ email, className, social }: { email: string; className?: string; social?: boolean }) {
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

  if (social) {
    return (
      <>
        <button className="social-btn" type="button" onClick={copy} data-done={state === "done" ? "" : undefined} aria-label="Copy email address">
          {state === "done" ? <CheckIcon /> : <MailIcon />}
          {state === "done" ? "Copied" : state === "failed" ? email : "Email"}
        </button>
        <span className="sr" role="status" aria-live="polite">
          {state === "done" ? "Email address copied" : ""}
        </span>
      </>
    )
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
