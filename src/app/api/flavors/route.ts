import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'

export async function GET() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_COMPUTE_URL}/flavors/detail`, {
    headers: { 'X-Auth-Token': token! },
  })

  if (!res.ok) return NextResponse.json({ error: 'Failed to fetch flavors' }, { status: 500 })
  const data = await res.json()
  return NextResponse.json(data.flavors)
}

export async function POST(req: NextRequest) {
  const token = cookies().get('os_token')?.value
  const { name, vcpus, ram, disk } = await req.json()

  const payload = {
    flavor: {
      id: randomUUID(),
      name,
      ram,
      vcpus,
      disk,
      swap: 0,
      rxtx_factor: 1.0,
      os_flavor_access_is_public: true,
    },
  }

  const res = await fetch(`${process.env.OS_COMPUTE_URL}/flavors`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: 'Failed to create flavor', details: err }, { status: 500 })
  }

  return NextResponse.json(await res.json())
}
