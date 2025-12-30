"use client"

import { useEffect } from "react"

// Suppress noisy ResizeObserver errors in Chrome that bubble as uncaught errors.
// This does NOT hide other errors.
export default function ResizeObserverFix() {
  useEffect(() => {
    const handler = (e: ErrorEvent) => {
      const msg = String(e?.message ?? "")
      if (
        msg.includes("ResizeObserver loop limit exceeded") ||
        msg.includes("ResizeObserver loop completed with undelivered notifications")
      ) {
        e.stopImmediatePropagation()
      }
    }
    window.addEventListener("error", handler)
    return () => window.removeEventListener("error", handler)
  }, [])

  // Some libraries log this via console.error instead of throwing. Filter those too.
  useEffect(() => {
    const origError = console.error
    console.error = (...args: any[]) => {
      const first = args[0]
      if (
        typeof first === "string" &&
        (first.includes("ResizeObserver loop limit exceeded") ||
          first.includes("ResizeObserver loop completed with undelivered notifications"))
      ) {
        return
      }
      origError(...args)
    }
    return () => {
      console.error = origError
    }
  }, [])

  return null
}
