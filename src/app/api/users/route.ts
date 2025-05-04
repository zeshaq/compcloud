import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const token = (await cookies()).get('os_token')?.value
  const res = await fetch(`${process.env.OS_IDENTITY_URL}/v3/users`, {
    headers: { 'X-Auth-Token': token! },
  })

  const data = await res.json()
  return NextResponse.json(data.users || [])
}

export async function POST(req: NextRequest) {
  const token = (await cookies()).get('os_token')?.value
  const { name, email, password, enabled } = await req.json()

  const res = await fetch(`${process.env.OS_IDENTITY_URL}/v3/users`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        name,
        email,
        password,
        enabled,
        domain_id: 'default',
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: 'Failed to create user', details: err }, { status: 500 })
  }

  return NextResponse.json(await res.json())
}
