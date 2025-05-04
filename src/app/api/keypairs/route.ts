import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const token = (await cookies()).get('os_token')?.value
  const res = await fetch(`${process.env.OS_COMPUTE_URL}/os-keypairs`, {
    headers: { 'X-Auth-Token': token! },
  })

  const data = await res.json()
  const keypairs = data.keypairs.map((kp: any) => kp.keypair)
  return NextResponse.json(keypairs)
}

export async function POST(req: NextRequest) {
  const token = (await cookies()).get('os_token')?.value
  const { name, public_key } = await req.json()

  const res = await fetch(`${process.env.OS_COMPUTE_URL}/os-keypairs`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      keypair: {
        name,
        public_key,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: 'Failed to create keypair', details: err }, { status: 500 })
  }

  return NextResponse.json(await res.json())
}
