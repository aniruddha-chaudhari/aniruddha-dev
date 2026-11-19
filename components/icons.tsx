export function ArrowIcon() {
  return (
    <svg className="ico" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
    </svg>
  )
}

export function ThemeIcon() {
  return (
    <svg className="tm" viewBox="0 0 24 24" aria-hidden="true">
      <g className="tm-sun">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M5.4 18.6l1.5-1.5M17.1 6.9l1.5-1.5" />
      </g>
      <g className="tm-moon">
        <path d="M20 14.6A8.4 8.4 0 0 1 9.4 4a8.4 8.4 0 1 0 10.6 10.6z" />
      </g>
    </svg>
  )
}

export function CopyIcons() {
  return (
    <>
      <svg className="ico-copy" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="5" y="5" width="8.5" height="8.5" rx="1.8" />
        <path d="M10.5 5V3.6A1.6 1.6 0 0 0 8.9 2H3.6A1.6 1.6 0 0 0 2 3.6v5.3a1.6 1.6 0 0 0 1.6 1.6H5" />
      </svg>
      <svg className="ico-check" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3 8.5l3.2 3.2L13 4.8" />
      </svg>
    </>
  )
}

export function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

export function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const

export function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" style={line}>
      <rect x="1.5" y="3" width="13" height="10" rx="2" />
      <path d="M2.2 4.6L8 8.8l5.8-4.2" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" style={line}>
      <path d="M3 8.5l3.2 3.2L13 4.8" />
    </svg>
  )
}
