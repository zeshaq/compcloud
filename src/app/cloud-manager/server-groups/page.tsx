import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteServerGroupButton from '@/components/DeleteServerGroupButton'

async function fetchServerGroups() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_COMPUTE_URL}/os-server-groups`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })
  const data = await res.json()
  return data.server_groups || []
}

export default async function ServerGroupsPage() {
  const groups = await fetchServerGroups()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Server Groups</h1>
      <Link
        href="/cloud-manager/server-groups/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Create Server Group
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Policy</th>
            <th className="border p-2">Members</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g: any) => (
            <tr key={g.id}>
              <td className="border p-2">{g.name}</td>
              <td className="border p-2">{g.policies.join(', ')}</td>
              <td className="border p-2">{g.members.length}</td>
              <td className="border p-2">
                <DeleteServerGroupButton id={g.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
