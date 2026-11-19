// The isometric projection used to lay out the drawings (kept for the interactive bits that need it).
const AZIMUTH = 45
const ELEVATION = 30
const RADIANS = Math.PI / 180
const UNIT = Math.sqrt(1.6)

type Projection = { origin: number[]; scale: number; azimuth?: number; elevation?: number }

function cameraOf({ scale, azimuth = AZIMUTH, elevation = ELEVATION }: Projection) {
  const a = azimuth * RADIANS
  const e = elevation * RADIANS
  return { sinA: Math.sin(a), cosA: Math.cos(a), sinE: Math.sin(e), cosE: Math.cos(e), k: scale * UNIT }
}

export function iso([x, y, z]: number[], projection: Projection): [number, number] {
  const { origin } = projection
  const { sinA, cosA, sinE, cosE, k } = cameraOf(projection)
  return [origin[0] + (x * sinA - y * cosA) * k, origin[1] + ((x * cosA + y * sinA) * sinE - z * cosE) * k]
}

/** Screen-space offset of moving [dx, dy, dz] in world space. */
export function axisVector(projection: Projection, [dx, dy, dz]: number[]): [number, number] {
  const origin = iso([0, 0, 0], projection)
  const moved = iso([dx, dy, dz], projection)
  return [moved[0] - origin[0], moved[1] - origin[1]]
}
