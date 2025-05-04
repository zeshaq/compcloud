import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const token = (await cookies()).get('os_token')?.value
  const res = await fetch(`${process.env.OS_VOLUME_URL}/volumes/detail`, {
    headers: { 'X-Auth-Token': token! },
  })

  const data = await res.json()
  return NextResponse.json(data.volumes || [])
}

export async function POST(req: NextRequest) {
  const token = (await cookies()).get('os_token')?.value
  const { name, size } = await req.json()

  const res = await fetch(`${process.env.OS_VOLUME_URL}/volumes`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      volume: {
        name,
        size,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: 'Failed to create volume', details: err }, { status: 500 })
  }

  return NextResponse.json(await res.json())
}
