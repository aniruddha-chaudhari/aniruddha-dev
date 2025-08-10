"use client"

import { Badge } from "@/components/ui/badge"
import { Code2, Database, GitBranch, Globe, Layers, Rocket, Terminal, Wrench } from "lucide-react"

const skills = [
  { name: "React", Icon: Code2 },
  { name: "TypeScript", Icon: Terminal },
  { name: "Tailwind", Icon: Layers },
  { name: "Vite", Icon: Rocket },
  { name: "Git", Icon: GitBranch },
  { name: "API / REST", Icon: Globe },
  { name: "Database", Icon: Database },
  { name: "Tooling", Icon: Wrench },
] as const

export default function SkillsChips() {
  return (
    <div className="px-4">
      <p className="text-sm text-[color:var(--muted)]">A compact set of tools used daily.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map(({ name, Icon }) => (
          <Badge
            key={name}
            variant="secondary"
            className="px-3 py-1.5 border border-white/10 bg-white/5 text-[color:var(--fg)] hover:bg-white/10"
          >
            <span className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4" aria-hidden />
              <span className="leading-none">{name}</span>
            </span>
          </Badge>
        ))}
      </div>
    </div>
  )
}
