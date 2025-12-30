"use client"

import OriginalGitHubCalendar from "react-github-calendar"
import type { ComponentProps } from "react"

// Re-export as named export for proper Next.js dynamic() handling
export function GitHubCalendar(props: ComponentProps<typeof OriginalGitHubCalendar>) {
    return <OriginalGitHubCalendar {...props} />
}
