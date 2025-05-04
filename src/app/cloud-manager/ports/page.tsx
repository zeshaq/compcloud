import { cookies } from 'next/headers'
import Link from 'next/link'
import DeletePortButton from '@/components/DeletePortButton'

async function fetchPorts() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_NETWORK_URL}/v2.0/ports`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })

  const data = await res.json()
  return data.ports || []
}

export default async function PortsPage() {
  const ports = await fetchPorts()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ports</h1>
      <Link
        href="/cloud-manager/ports/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Create Port
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Network</th>
            <th className="border p-2">MAC Address</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ports.map((port: any) => (
            <tr key={port.id}>
              <td className="border p-2">{port.id}</td>
              <td className="border p-2">{port.name}</td>
              <td className="border p-2">{port.network_id}</td>
              <td className="border p-2">{port.mac_address}</td>
              <td className="border p-2">{port.status}</td>
              <td className="border p-2">
                <DeletePortButton id={port.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
