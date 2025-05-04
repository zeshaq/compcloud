import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const token = (await cookies()).get('os_token')?.value
  const url = `${process.env.OS_NETWORK_URL}/v2.0/networks/${params.id}`

  const res = await fetch(url, {
    method: 'DELETE',
    headers: { 'X-Auth-Token': token! },
  })

  return res.ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed to delete network' }, { status: 500 })
}
