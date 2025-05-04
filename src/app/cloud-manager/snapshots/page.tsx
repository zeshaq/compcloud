import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteSnapshotButton from '@/components/DeleteSnapshotButton'

async function fetchSnapshots() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_VOLUME_URL}/snapshots/detail`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })
  const data = await res.json()
  return data.snapshots || []
}

export default async function SnapshotsPage() {
  const snapshots = await fetchSnapshots()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Volume Snapshots</h1>
      <Link
        href="/cloud-manager/snapshots/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Create Snapshot
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Volume ID</th>
            <th className="border p-2">Size (GB)</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {snapshots.map((snap: any) => (
            <tr key={snap.id}>
              <td className="border p-2">{snap.name}</td>
              <td className="border p-2">{snap.volume_id}</td>
              <td className="border p-2">{snap.size}</td>
              <td className="border p-2">{snap.status}</td>
              <td className="border p-2">
                <DeleteSnapshotButton id={snap.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
