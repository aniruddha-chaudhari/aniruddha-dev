"use client"

import { useEffect, useState } from "react"

export default function VisitorsCounter({ className = "" }: { className?: string }) {
  const [value, setValue] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    fetch("/api/visitors", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (mounted && typeof d?.value === "number") setValue(d.value)
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className={`mx-auto w-full max-w-6xl px-4 pb-12 pt-6 ${className}`}>
      <p className="text-center text-sm text-[color:var(--muted)]">
        People visited: <span className="font-medium text-[color:var(--fg)]">{value ?? "—"}</span>
      </p>
    </div>
  )
}
