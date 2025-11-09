import { Badge } from "@/components/ui/badge"
import { 
  Code2, 
  Database, 
  GitBranch, 
  Globe, 
  Rocket, 
  Server,
  Smartphone,
  Cloud,
  Brain,
  Container
} from "lucide-react"

const skills = [
  { name: "React", Icon: Code2 },
  { name: "Next.js", Icon: Rocket },
  { name: "Express", Icon: Server },
  { name: "FastApi", Icon: Globe },
  { name: "MongoDB", Icon: Database },
  { name: "PostgreSQL", Icon: Database },
  { name: "React Native", Icon: Smartphone },
  { name: "AWS EC2", Icon: Cloud },
  { name: "Applied AI", Icon: Brain },
  { name: "Git", Icon: GitBranch },
  { name: "Docker", Icon: Container },
] as const

export default function SkillsChipsServer() {
  return (
    <div className="px-4">
      <p className="text-sm text-[color:var(--muted)]">Technologies that I use</p>
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
