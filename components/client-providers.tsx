"use client"

import ErrorBoundary from "@/components/error-boundary"
import { ThemeProvider } from "@/components/theme-provider"
import DesignTokens from "@/components/design-tokens"
import ResizeObserverFix from "@/components/resizeobserver-fix"
import { Toaster } from "@/components/ui/toaster"

console.log('[DEBUG] client-providers.tsx: Module loaded')

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    console.log('[DEBUG] ClientProviders: Rendering')

    return (
        <ErrorBoundary>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="mono-theme">
                <DesignTokens />
                <ResizeObserverFix />
                {children}
                <Toaster />
            </ThemeProvider>
        </ErrorBoundary>
    )
}
