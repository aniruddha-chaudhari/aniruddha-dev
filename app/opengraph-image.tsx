import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0b0b0b 0%, #161616 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
          Aniruddha
        </div>
        <div style={{ fontSize: 42, fontWeight: 600, opacity: 0.9, marginTop: 16 }}>
          Full‑stack Developer
        </div>
        <div style={{ fontSize: 28, opacity: 0.8, marginTop: 28 }}>
          Projects • Skills • Experience
        </div>
      </div>
    ),
    size,
  )
}

