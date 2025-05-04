import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const payload = {
    auth: {
      identity: {
        methods: ['password'],
        password: {
          user: {
            name: username,
            domain: { name: process.env.OS_USER_DOMAIN_NAME },
            password,
          },
        },
      },
      scope: {
        project: {
          name: process.env.OS_PROJECT_NAME,
          domain: { name: process.env.OS_PROJECT_DOMAIN_NAME },
        },
      },
    },
  }

  const keystoneUrl = `${process.env.OS_AUTH_URL}/auth/tokens`

  const response = await fetch(keystoneUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = response.headers.get('x-subject-token')
  const userInfo = await response.json()

  const res = NextResponse.json({ user: userInfo.token.user })

  // Set HttpOnly server-only cookie
  res.cookies.set('os_token', token || '', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60, // 1 hour
  })

  // Set client-visible cookie for frontend UI state
  res.cookies.set('client_token', '1', {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60,
  })

  return res
}
