import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const token = cookies().get('os_token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const {
    name,
    image,
    flavor,
    network,
    createVolume,
    volumeSize,
    availabilityZone,
  } = await req.json()

  const server: any = {
    name,
    flavorRef: flavor,
    availability_zone: availabilityZone,
    networks: [{ uuid: network }],
  }

  if (createVolume) {
    server.block_device_mapping_v2 = [{
      boot_index: 0,
      uuid: image,
      source_type: 'image',
      destination_type: 'volume',
      volume_size: volumeSize,
      delete_on_termination: true,
    }]
  } else {
    server.imageRef = image
  }

  const res = await fetch(`${process.env.OS_COMPUTE_URL}/servers`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ server }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: 'Failed to create instance', details: err }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
