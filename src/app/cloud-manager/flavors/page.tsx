import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteFlavorButton from '@/components/DeleteFlavorButton'

async function fetchFlavors() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_COMPUTE_URL}/flavors/detail`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })

  if (!res.ok) return []
  const data = await res.json()
  return data.flavors
}

export default async function FlavorsPage() {
  const flavors = await fetchFlavors()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Flavors</h1>

      <Link
        href="/cloud-manager/flavors/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Create Flavor
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
        <tr>
  <th className="border p-2">Name</th>
  <th className="border p-2">vCPUs</th>
  <th className="border p-2">RAM (MB)</th>
  <th className="border p-2">Disk (GB)</th>
  <th className="border p-2">Actions</th>
</tr>
        </thead>
        <tbody>
        {flavors.map((flavor: any) => (
  <tr key={flavor.id}>
    <td className="border p-2">{flavor.name}</td>
    <td className="border p-2">{flavor.vcpus}</td>
    <td className="border p-2">{flavor.ram}</td>
    <td className="border p-2">{flavor.disk}</td>
    <td className="border p-2">
      <DeleteFlavorButton id={flavor.id} />
    </td>
  </tr>
))}
        </tbody>
      </table>
    </div>
  )
}
