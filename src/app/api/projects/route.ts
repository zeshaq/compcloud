import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const token = (await cookies()).get('os_token')?.value
  const res = await fetch(`${process.env.OS_IDENTITY_URL}/v3/projects`, {
    headers: { 'X-Auth-Token': token! },
  })

  const data = await res.json()
  return NextResponse.json(data.projects || [])
}

export async function POST(req: NextRequest) {
  const token = (await cookies()).get('os_token')?.value
  const { name, description, enabled } = await req.json()

  const res = await fetch(`${process.env.OS_IDENTITY_URL}/v3/projects`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      project: {
        name,
        description,
        enabled,
        domain_id: 'default',
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: 'Failed to create project', details: err }, { status: 500 })
  }

  return NextResponse.json(await res.json())
}
