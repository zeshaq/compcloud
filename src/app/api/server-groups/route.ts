import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const token = (await cookies()).get('os_token')?.value
  const res = await fetch(`${process.env.OS_COMPUTE_URL}/os-server-groups`, {
    headers: { 'X-Auth-Token': token! },
  })
  const data = await res.json()
  return NextResponse.json(data.server_groups || [])
}

export async function POST(req: NextRequest) {
  const token = (await cookies()).get('os_token')?.value
  const { name, policy } = await req.json()

  const res = await fetch(`${process.env.OS_COMPUTE_URL}/os-server-groups`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      server_group: {
        name,
        policies: [policy],
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: 'Failed to create server group', details: err }, { status: 500 })
  }

  return NextResponse.json(await res.json())
}
