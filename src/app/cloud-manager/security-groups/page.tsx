import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteSecurityGroupButton from '@/components/DeleteSecurityGroupButton'

async function fetchSecurityGroups() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_NETWORK_URL}/v2.0/security-groups`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })

  const data = await res.json()
  return data.security_groups || []
}

export default async function SecurityGroupsPage() {
  const groups = await fetchSecurityGroups()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Security Groups</h1>
      <Link
        href="/cloud-manager/security-groups/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Create Security Group
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Rules</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((sg: any) => (
            <tr key={sg.id}>
              <td className="border p-2">{sg.name}</td>
              <td className="border p-2">{sg.description}</td>
              <td className="border p-2">{sg.security_group_rules.length}</td>
              <td className="border p-2">
                <DeleteSecurityGroupButton id={sg.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
