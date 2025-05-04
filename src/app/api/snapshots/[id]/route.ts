import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const token = (await cookies()).get('os_token')?.value

  const res = await fetch(`${process.env.OS_VOLUME_URL}/snapshots/${params.id}`, {
    method: 'DELETE',
    headers: { 'X-Auth-Token': token! },
  })

  return res.ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed to delete snapshot' }, { status: 500 })
}
