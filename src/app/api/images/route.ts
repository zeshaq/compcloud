import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Readable } from 'stream'

export async function GET() {
  const token = (await cookies()).get('os_token')?.value
  const res = await fetch(`${process.env.OS_IMAGE_URL}/v2/images`, {
    headers: { 'X-Auth-Token': token! },
  })

  const data = await res.json()
  return NextResponse.json(data.images || [])
}

export async function POST(req: NextRequest) {
  const token = (await cookies()).get('os_token')?.value
  const formData = await req.formData()
  const name = formData.get('name') as string
  const disk_format = formData.get('disk_format') as string
  const file = formData.get('file') as File

  const imageRes = await fetch(`${process.env.OS_IMAGE_URL}/v2/images`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      disk_format,
      container_format: 'bare',
      visibility: 'private',
    }),
  })

  if (!imageRes.ok) {
    const error = await imageRes.text()
    return NextResponse.json({ error: 'Failed to create image metadata', details: error }, { status: 500 })
  }

  const { id } = await imageRes.json()

  const uploadRes = await fetch(`${process.env.OS_IMAGE_URL}/v2/images/${id}/file`, {
    method: 'PUT',
    headers: {
      'X-Auth-Token': token!,
      'Content-Type': 'application/octet-stream',
    },
    body: file.stream(),
  })

  if (!uploadRes.ok) {
    return NextResponse.json({ error: 'Failed to upload image file' }, { status: 500 })
  }

  return NextResponse.json({ success: true, id })
}
