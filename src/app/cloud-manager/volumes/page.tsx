import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteVolumeButton from '@/components/DeleteVolumeButton'

async function fetchVolumes() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_VOLUME_URL}/volumes/detail`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })

  const data = await res.json()
  return data.volumes || []
}

export default async function VolumesPage() {
  const volumes = await fetchVolumes()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Volumes</h1>

      <Link
        href="/cloud-manager/volumes/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Create Volume
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Size (GB)</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {volumes.map((vol: any) => (
            <tr key={vol.id}>
              <td className="border p-2">{vol.name}</td>
              <td className="border p-2">{vol.size}</td>
              <td className="border p-2">{vol.status}</td>
              <td className="border p-2">
                <DeleteVolumeButton id={vol.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
