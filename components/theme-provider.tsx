'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

console.log('[DEBUG] theme-provider.tsx: Module loaded')

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  console.log('[DEBUG] ThemeProvider: Rendering with props:', Object.keys(props))
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
