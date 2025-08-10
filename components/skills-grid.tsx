"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Library, Wrench } from "lucide-react"

type Skill = { label: string }
type Group = { title: string; icon: React.ReactNode; items: Skill[] }

const groups: Group[] = [
  {
    title: "Languages",
    icon: <Code2 className="h-4 w-4" />,
    items: [{ label: "TypeScript" }, { label: "JavaScript" }, { label: "Go" }, { label: "Python" }],
  },
  {
    title: "Frameworks",
    icon: <Library className="h-4 w-4" />,
    items: [{ label: "Next.js" }, { label: "React" }, { label: "Node.js" }, { label: "Tailwind" }],
  },
  {
    title: "Tools",
    icon: <Wrench className="h-4 w-4" />,
    items: [{ label: "Vercel" }, { label: "GitHub Actions" }, { label: "Docker" }, { label: "Postgres" }],
  },
]

export default function SkillsGrid() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 md:grid-cols-3">
      {groups.map((g) => (
        <Card
          key={g.title}
          className="rounded-2xl border-white/10 bg-[color:var(--bg-800)]/60 text-[color:var(--fg)] shadow-[0_6px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur supports-[backdrop-filter]:bg-[color:var(--bg-800)]/40"
        >
          <CardHeader className="flex flex-row items-center gap-2">
            <span className="text-[color:var(--muted)]">{g.icon}</span>
            <CardTitle className="text-base">{g.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {g.items.map((s) => (
              <Badge
                key={s.label}
                variant="secondary"
                className="border border-white/10 bg-white/5 text-[color:var(--fg)] hover:bg-white/10"
              >
                {s.label}
              </Badge>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
