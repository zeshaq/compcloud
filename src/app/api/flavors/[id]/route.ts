import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    const cookieStore = await cookies()
    const token = cookieStore.get('os_token')?.value
  const url = `${process.env.OS_COMPUTE_URL}/flavors/${params.id}`

  const res = await fetch(url, {
    method: 'DELETE',
    headers: { 'X-Auth-Token': token! },
  })

  return res.ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed to delete flavor' }, { status: 500 })
}
