import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const token = cookies().get('os_token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const action = formData.get('action')

  if (!['start', 'stop'].includes(action as string)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  const body =
    action === 'start' ? { 'os-start': null } :
    action === 'stop' ? { 'os-stop': null } :
    null

  const res = await fetch(`${process.env.OS_COMPUTE_URL}/servers/${params.id}/action`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text()
    return NextResponse.json({ error: 'Failed to perform action', details: errText }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
