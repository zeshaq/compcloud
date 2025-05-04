import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteNetworkButton from '@/components/DeleteNetworkButton'

async function fetchNetworks() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_NETWORK_URL}/v2.0/networks`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })
  const data = await res.json()
  return data.networks || []
}

export default async function NetworksPage() {
  const networks = await fetchNetworks()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Networks</h1>

      <Link
        href="/cloud-manager/networks/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Create Network
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">ID</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {networks.map((net: any) => (
            <tr key={net.id}>
              <td className="border p-2">{net.name}</td>
              <td className="border p-2">{net.id}</td>
              <td className="border p-2">{net.status}</td>
              <td className="border p-2">
                <DeleteNetworkButton id={net.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
