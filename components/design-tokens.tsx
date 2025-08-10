"use client"

// Inject global CSS variables to keep a strict monochrome palette with a tiny accent.
// Works with next-themes using the "dark" class on html.
export default function DesignTokens() {
  return (
    <style
      // Using styled-jsx global to avoid editing globals.css.
      // Colors maintain WCAG AA contrast for text on backgrounds used.
      jsx
      global
    >{`
      :root {
        --bg-900: #F7F7F8;
        --bg-800: #F0F1F2;
        --bg-700: #E7E8EA;
        --fg: #0B0B0D;
        --muted: #464646;
        --accent: #9AA0A6;
        --radius-xl: 1rem;
        --grad-from: rgba(247,247,248,0.95);
        --grad-to: rgba(231,232,234,0.95);
        scroll-behavior: smooth;
      }
      :root.dark {
        --bg-900: #0B0B0D;
        --bg-800: #111214;
        --bg-700: #1B1C1E;
        --fg: #E8E8E8;
        --muted: #B8B8B8;
        --accent: #9AA0A6;
        --radius-xl: 1rem;
        --grad-from: rgba(10,10,12,0.95);
        --grad-to: rgba(28,28,30,0.95);
      }
      @media (prefers-reduced-motion: reduce) {
        :root { scroll-behavior: auto; }
      }
      /* Card rounding & focus states */
      .rounded-2xl {
        border-radius: var(--radius-xl);
      }
      /* Base text contrast helpers if needed */
      .text-fg { color: var(--fg) }
      .text-muted-fg { color: var(--muted) }
    `}</style>
  )
}
