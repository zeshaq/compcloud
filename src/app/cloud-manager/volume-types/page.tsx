import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteVolumeTypeButton from '@/components/DeleteVolumeTypeButton'

async function fetchVolumeTypes() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_VOLUME_URL}/types`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })

  const data = await res.json()
  return data.volume_types || []
}

export default async function VolumeTypesPage() {
  const types = await fetchVolumeTypes()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Volume Types</h1>
      <Link
        href="/cloud-manager/volume-types/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Create Volume Type
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">ID</th>
            <th className="border p-2">Is Public</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map((t: any) => (
            <tr key={t.id}>
              <td className="border p-2">{t.name}</td>
              <td className="border p-2">{t.id}</td>
              <td className="border p-2">{t.is_public ? 'Yes' : 'No'}</td>
              <td className="border p-2">
                <DeleteVolumeTypeButton id={t.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
