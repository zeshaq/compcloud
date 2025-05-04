import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const token = (await cookies()).get('os_token')?.value
  const res = await fetch(`${process.env.OS_VOLUME_URL}/snapshots/detail`, {
    headers: { 'X-Auth-Token': token! },
  })
  const data = await res.json()
  return NextResponse.json(data.snapshots || [])
}

export async function POST(req: NextRequest) {
  const token = (await cookies()).get('os_token')?.value
  const { name, volume_id } = await req.json()

  const res = await fetch(`${process.env.OS_VOLUME_URL}/snapshots`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      snapshot: {
        name,
        volume_id,
        force: true,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: 'Failed to create snapshot', details: err }, { status: 500 })
  }

  return NextResponse.json(await res.json())
}
