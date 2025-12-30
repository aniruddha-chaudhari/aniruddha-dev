"use client"

import type React from "react"
import { useState } from "react"
import { Github, Linkedin, Twitter, Mail, Globe } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

type Social = {
  name: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const socials: Social[] = [
  { name: "GitHub", href: "https://github.com/aniruddha-chaudhari", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/aniruddha2704/", icon: Linkedin },
  { name: "Email", href: "mailto:aniruddhachaudhari2704@gmail.com", icon: Mail },
]

export default function SocialDock() {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { toast } = useToast()

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText("aniruddhachaudhari2704@gmail.com")
      toast({
        title: "Email copied!",
        description: "Email address has been copied to your clipboard.",
        variant: "success",
      })
    } catch (err) {
      const textArea = document.createElement("textarea")
      textArea.value = "aniruddhachaudhari2704@gmail.com"
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        toast({
          title: "Email copied!",
          description: "Email address has been copied to your clipboard.",
          variant: "success",
        })
      } catch (fallbackErr) {
        toast({
          title: "Copy failed",
          description: "Unable to copy email address. Please copy it manually: aniruddhachaudhari2704@gmail.com",
          variant: "destructive",
        })
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      {/* Desktop dock */}
      <div
        className="hidden md:block p-2 rounded-[28px] border border-white/5 bg-[color:var(--bg-800)]/60 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--bg-800)]/40 shadow-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setHoveredIndex(null)
        }}
      >
        <TooltipProvider>
          <div
            className={`flex items-center transition-all duration-300 ease-in-out ${isHovered ? "w-auto" : "w-max"}`}
          >
            {socials.map((link, index) => (
              <Tooltip key={link.name}>
                <TooltipTrigger asChild>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className={`flex aspect-square cursor-pointer items-center justify-center transition-all duration-300 px-1 ${isHovered ? "scale-100" : "scale-95"
                      } ${hoveredIndex === index ? "scale-110 mx-2" : "mx-0"}`}
                    style={{ width: "40px", height: "40px" }}
                    aria-label={link.name}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onClick={link.name === "Email" ? handleEmailClick : undefined}
                  >
                    <div
                      className={`inline-flex size-10 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10`}
                    >
                      <link.icon
                        size={16}
                        className={`transition-transform duration-300 text-[color:var(--fg)] ${hoveredIndex === index ? "scale-110" : "scale-100"
                          }`}
                      />
                    </div>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>

      {/* Mobile compact dock */}
      <div className="md:hidden px-3 py-2 flex items-center gap-1 rounded-full border border-white/5 bg-[color:var(--bg-800)]/60 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--bg-800)]/40">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={s.name}
            className="rounded-full p-2 hover:bg-white/10"
            onClick={s.name === "Email" ? handleEmailClick : undefined}
          >
            <s.icon size={16} className="text-[color:var(--fg)]" />
          </a>
        ))}
      </div>
    </nav>
  )
}
