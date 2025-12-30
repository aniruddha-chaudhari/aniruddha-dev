"use client"

import GitHubCalendar from "react-github-calendar"

// Simple wrapper component to avoid ESM/CJS interop issues with dynamic imports
export default function GitHubCalendarWrapper(props: React.ComponentProps<typeof GitHubCalendar>) {
    return <GitHubCalendar {...props} />
}
