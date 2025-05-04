import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteSubnetButton from '@/components/DeleteSubnetButton'

async function fetchSubnets() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_NETWORK_URL}/v2.0/subnets`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })

  const data = await res.json()
  return data.subnets || []
}

export default async function SubnetsPage() {
  const subnets = await fetchSubnets()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Subnets</h1>

      <Link
        href="/cloud-manager/subnets/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Create Subnet
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">CIDR</th>
            <th className="border p-2">Network ID</th>
            <th className="border p-2">IP Version</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subnets.map((s: any) => (
            <tr key={s.id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.cidr}</td>
              <td className="border p-2">{s.network_id}</td>
              <td className="border p-2">{s.ip_version}</td>
              <td className="border p-2">
                <DeleteSubnetButton id={s.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
