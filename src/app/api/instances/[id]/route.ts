import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const token = cookies().get('os_token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const url = `${process.env.OS_COMPUTE_URL}/servers/${params.id}`
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { 'X-Auth-Token': token },
  })

  return res.ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed to delete instance' }, { status: 500 })
}
