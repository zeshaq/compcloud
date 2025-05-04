import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const token = cookies().get('os_token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const [imagesRes, flavorsRes, networksRes, zonesRes] = await Promise.all([
      fetch(`${process.env.OS_IMAGE_URL}/v2/images`, {
        headers: { 'X-Auth-Token': token },
      }),
      fetch(`${process.env.OS_COMPUTE_URL}/flavors/detail`, {
        headers: { 'X-Auth-Token': token },
      }),
      fetch(`${process.env.OS_NETWORK_URL}/v2.0/networks`, {
        headers: { 'X-Auth-Token': token },
      }),
      fetch(`${process.env.OS_COMPUTE_URL}/os-availability-zone`, {
        headers: { 'X-Auth-Token': token },
      }),
    ])

    const [images, flavors, networks, zones] = await Promise.all([
      imagesRes.json(),
      flavorsRes.json(),
      networksRes.json(),
      zonesRes.json(),
    ])

    return NextResponse.json({
      images: images.images,
      flavors: flavors.flavors,
      networks: networks.networks,
      availabilityZones: zones.availabilityZoneInfo?.filter((z: any) => z.zoneState.available),
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 })
  }
}
