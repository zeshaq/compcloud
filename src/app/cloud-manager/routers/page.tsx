import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteRouterButton from '@/components/DeleteRouterButton'

async function fetchRouters() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_NETWORK_URL}/v2.0/routers`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })
  const data = await res.json()
  return data.routers || []
}

export default async function RoutersPage() {
  const routers = await fetchRouters()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Routers</h1>

      <Link
        href="/cloud-manager/routers/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Create Router
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
          {routers.map((router: any) => (
            <tr key={router.id}>
              <td className="border p-2">{router.name}</td>
              <td className="border p-2">{router.id}</td>
              <td className="border p-2">{router.status}</td>
              <td className="border p-2">
                <DeleteRouterButton id={router.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
