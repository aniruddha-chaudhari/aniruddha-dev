"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GitFork, Star } from "lucide-react"

console.log('[DEBUG] github-contrib.tsx: Module loaded')

// react-github-calendar uses DOM; load client-side only.
const GitHubCalendar = dynamic(() => {
  console.log('[DEBUG] github-contrib.tsx: Dynamic import starting')
  return import("react-github-calendar").then(mod => {
    console.log('[DEBUG] github-contrib.tsx: Dynamic import complete')
    return mod
  }).catch(err => {
    console.error('[DEBUG] github-contrib.tsx: Dynamic import FAILED:', err)
    throw err
  })
}, { ssr: false })

type Stats = {
  totalStars: number
  totalForks: number
  publicRepos: number
}

export default function GithubContrib({ username = "aniruddha-chaudhari" }: { username?: string }) {
  const [stats, setStats] = useState<Stats | null>(null)
  const { resolvedTheme } = useTheme()
  const scheme = resolvedTheme === "dark" ? "dark" : "light"

  useEffect(() => {
    let mounted = true
    fetch(`/api/github-stats?username=${encodeURIComponent(username)}`)
      .then((r) => r.json())
      .then((d) => {
        if (mounted) setStats(d)
      })
      .catch(() => {
        // ignore
      })
    return () => {
      mounted = false
    }
  }, [username])

  // Palettes with distinct "level 0" for each theme to improve contrast
  const lightTheme = ["#e6e8eb", "#9be9a8", "#40c463", "#30a14e", "#216e39"] // level0 slightly darker than pure white
  const darkTheme = ["#111214", "#0e4429", "#006d32", "#26a641", "#39d353"] // level0 matches dark UI tokens

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 lg:grid-cols-[2fr_1fr]">
      <Card className="rounded-2xl border-white/10 bg-[color:var(--bg-800)]/60 text-[color:var(--fg)] shadow-[0_6px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur supports-[backdrop-filter]:bg-[color:var(--bg-800)]/40">
        <CardHeader>
          <CardTitle className="text-base">Contributions</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[640px]">
            <GitHubCalendar
              key={scheme} // force re-render when theme changes
              username={username}
              colorScheme={scheme}
              blockSize={11}
              blockMargin={4}
              fontSize={12}
              theme={{
                light: lightTheme,
                dark: darkTheme,
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-white/10 bg-[color:var(--bg-800)]/60 text-[color:var(--fg)] shadow-[0_6px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur supports-[backdrop-filter]:bg-[color:var(--bg-800)]/40">
        <CardHeader>
          <CardTitle className="text-base">Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-6 text-sm text-[color:var(--muted)]">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className="text-[color:var(--fg)] font-medium">{stats?.totalStars ?? "—"}</span> stars
          </div>
          <div className="flex items-center gap-2">
            <GitFork className="h-4 w-4" />
            <span className="text-[color:var(--fg)] font-medium">{stats?.totalForks ?? "—"}</span> forks
          </div>
          <div className="ml-auto">
            Repos: <span className="text-[color:var(--fg)] font-medium">{stats?.publicRepos ?? "—"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
