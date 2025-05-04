import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const token = (await cookies()).get('os_token')?.value
  const res = await fetch(`${process.env.OS_NETWORK_URL}/v2.0/security-groups`, {
    headers: { 'X-Auth-Token': token! },
  })

  const data = await res.json()
  return NextResponse.json(data.security_groups || [])
}

export async function POST(req: NextRequest) {
  const token = (await cookies()).get('os_token')?.value
  const { name, description } = await req.json()

  const res = await fetch(`${process.env.OS_NETWORK_URL}/v2.0/security-groups`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      security_group: { name, description },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: 'Failed to create security group', details: err }, { status: 500 })
  }

  return NextResponse.json(await res.json())
}
