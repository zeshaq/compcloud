import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteUserButton from '@/components/DeleteUserButton'

async function fetchUsers() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_IDENTITY_URL}/v3/users`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })
  const data = await res.json()
  return data.users || []
}

export default async function UsersPage() {
  const users = await fetchUsers()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Link
        href="/cloud-manager/users/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Create User
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Username</th>
            <th className="border p-2">ID</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Enabled</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.enabled ? 'Yes' : 'No'}</td>
              <td className="border p-2">
                <DeleteUserButton id={u.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
