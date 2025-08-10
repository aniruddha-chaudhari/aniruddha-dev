import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { headers } from "next/headers"
import crypto from "crypto"

const COOKIE_NAME = "mono_unique_visitor_v3"

// Generate a unique fingerprint from request data
function generateServerFingerprint(headers: Headers, ip: string): string {
  const userAgent = headers.get('user-agent') || ''
  const acceptLanguage = headers.get('accept-language') || ''
  const acceptEncoding = headers.get('accept-encoding') || ''
  const referer = headers.get('referer') || ''
  
  // Create a hash from multiple identifying factors
  const fingerprintData = `${ip}|${userAgent}|${acceptLanguage}|${acceptEncoding}|${referer}`
  return crypto.createHash('sha256').update(fingerprintData).digest('hex')
}

// Simple in-memory counter (resets on server restart)
let visitorCount = 0
let seenFingerprints = new Set<string>()

export async function GET(request: Request) {
  return handleVisitorRequest(request)
}

export async function POST(request: Request) {
  return handleVisitorRequest(request)
}

async function handleVisitorRequest(request: Request) {
  try {
    const headersList = await headers()
    const cookieStore = await cookies()
    
    // Get client IP (works with various hosting providers)
    const forwarded = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const ip = forwarded?.split(',')[0] || realIp || 'unknown'
    
    // Generate server fingerprint
    const serverFingerprint = generateServerFingerprint(headersList, ip)
    
    // Get client fingerprint if available (from POST request)
    let clientFingerprint: string | undefined
    if (request.method === 'POST') {
      try {
        const body = await request.json()
        clientFingerprint = body.clientFingerprint
      } catch {
        // Ignore parsing errors, continue without client fingerprint
      }
    }
    
    // Check existing cookie
    const existingCookie = cookieStore.get(COOKIE_NAME)
    
    // Create a combined fingerprint for uniqueness
    const combinedFingerprint = clientFingerprint 
      ? `${serverFingerprint}:${clientFingerprint}`
      : serverFingerprint
    
    let isNewVisitor = false
    
    if (!existingCookie) {
      // No cookie exists, check if this fingerprint has been seen
      if (!seenFingerprints.has(combinedFingerprint)) {
        isNewVisitor = true
        visitorCount++
        seenFingerprints.add(combinedFingerprint)
      }
    } else {
      // Cookie exists, but check if fingerprint matches
      const cookieValue = existingCookie.value
      if (!seenFingerprints.has(combinedFingerprint)) {
        // New fingerprint but has cookie - might be different user on same device
        isNewVisitor = true
        visitorCount++
        seenFingerprints.add(combinedFingerprint)
      }

    }
    
    if (isNewVisitor) {
      // Set cookie with visitor ID
      const visitorId = crypto.randomUUID()
      const response = NextResponse.json(
        { value: visitorCount, isNew: true },
        { headers: { "Cache-Control": "no-store" } }
      )
      response.cookies.set(COOKIE_NAME, visitorId, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      
      return response
    } else {
      return NextResponse.json(
        { value: visitorCount, isNew: false },
        { headers: { "Cache-Control": "no-store" } }
      )
    }
  } catch (error) {
    console.error('Visitor counter error:', error)
    return NextResponse.json(
      { value: visitorCount, error: 'Failed to count visitor' },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    )
  }
}

