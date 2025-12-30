"use client"

console.log('[DEBUG] design-tokens.tsx: Module loaded')

// Theme tokens and background texture variables.
// Light mode uses the provided halftone art; dark mode keeps a subtle repeating dither.
export default function DesignTokens() {
  console.log('[DEBUG] DesignTokens: Rendering')
  return (
    <style jsx global>{`
      :root {
        --bg-900: #F7F7F8;
        --bg-800: #F0F1F2;
        --bg-700: #E7E8EA;
        --fg: #0B0B0D;
        --muted: #464646;
        --accent: #9AA0A6;
        --radius-xl: 1rem;

        /* Light gradient + light-only texture (new image) */
        --grad-from: rgba(247,247,248,0.95);
        --grad-to: rgba(231,232,234,0.95);
        --texture: url('/images/light-halftone.jpg');
        --texture-repeat: no-repeat;
        --texture-size: cover;
        --texture-position: center;
        --texture-opacity: 0.12;

        scroll-behavior: smooth;
      }
      .dark {
        --bg-900: #0B0B0D;
        --bg-800: #111214;
        --bg-700: #1B1C1E;
        --fg: #E8E8E8;
        --muted: #B8B8B8;
        --accent: #9AA0A6;
        --radius-xl: 1rem;

        /* Dark gradient + subtle repeating dither */
        --grad-from: rgba(10,10,12,0.95);
        --grad-to: rgba(28,28,30,0.95);
        --texture: url('/images/dark-halftone.jpg');
        --texture-repeat: no-repeat;
        --texture-size: cover;
        --texture-position: center;
        --texture-opacity: 0.10;
      }

      @media (prefers-reduced-motion: reduce) {
        :root { scroll-behavior: auto; }
      }

      .rounded-2xl { border-radius: var(--radius-xl); }
      .text-fg { color: var(--fg); }
      .text-muted-fg { color: var(--muted); }
    `}</style>
  )
}
