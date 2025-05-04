import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))

  // Clear both server-only and client-visible cookies
  response.cookies.set('os_token', '', {
    path: '/',
    maxAge: 0,
  })

  response.cookies.set('client_token', '', {
    path: '/',
    maxAge: 0,
  })

  return response
}
