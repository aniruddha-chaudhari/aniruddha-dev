"use client"

import { ThemeProvider } from "@/components/theme-provider"
import ResizeObserverFix from "@/components/resizeobserver-fix"
import DesignTokens from "@/components/design-tokens"
import { ReactNode } from "react"

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="mono-theme">
      <DesignTokens />
      <ResizeObserverFix />
      {children}
    </ThemeProvider>
  )
}
