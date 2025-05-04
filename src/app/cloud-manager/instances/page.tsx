import { cookies } from 'next/headers'
import Link from 'next/link'

async function fetchInstances() {
  const token = cookies().get('os_token')?.value
  if (!token) return null

  const novaUrl = `${process.env.OS_COMPUTE_URL}/servers/detail`

  const res = await fetch(novaUrl, {
    headers: {
      'X-Auth-Token': token,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    console.error('Failed to fetch instances')
    return null
  }

  const data = await res.json()
  return data.servers
}

export default async function InstancesPage() {
  const instances = await fetchInstances()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Instance Management</h1>
      <a
  href="/cloud-manager/instances/create"
  className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded"
>
  + Create Instance
</a>

      {instances?.length > 0 ? (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">ID</th>
            </tr>
          </thead>
          <tbody>
            {instances.map((vm: any) => (
              <tr key={vm.id} className="border-t">
                <td className="p-2 border"><Link href={`/cloud-manager/instances/${vm.id}`} className="text-blue-600 hover:underline">
  {vm.name}
</Link></td>
                <td className="p-2 border">{vm.status}</td>
                <td className="p-2 border text-xs text-gray-500">{vm.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No instances found or failed to load.</p>
      )}
    </div>
  )
}
