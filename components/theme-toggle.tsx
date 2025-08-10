"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = mounted ? theme === "dark" || resolvedTheme === "dark" : true

  return (
    <Button
      variant="outline"
      aria-label="Toggle theme"
      className="h-9 w-9 border-white/10 bg-[color:var(--bg-700)]/60 text-[color:var(--fg)] hover:bg-[color:var(--bg-700)]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title="Toggle light/dark"
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
