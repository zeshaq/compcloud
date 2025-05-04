import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const token = (await cookies()).get('os_token')?.value

  const res = await fetch(`${process.env.OS_IDENTITY_URL}/v3/projects/${params.id}`, {
    method: 'DELETE',
    headers: {
      'X-Auth-Token': token!,
    },
  })

  return res.ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
}
