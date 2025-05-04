import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteProjectButton from '@/components/DeleteProjectButton'

async function fetchProjects() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_IDENTITY_URL}/v3/projects`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })
  const data = await res.json()
  return data.projects || []
}

export default async function ProjectsPage() {
  const projects = await fetchProjects()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <Link
        href="/cloud-manager/projects/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Create Project
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">ID</th>
            <th className="border p-2">Enabled</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj: any) => (
            <tr key={proj.id}>
              <td className="border p-2">{proj.name}</td>
              <td className="border p-2">{proj.id}</td>
              <td className="border p-2">{proj.enabled ? 'Yes' : 'No'}</td>
              <td className="border p-2">
                <DeleteProjectButton id={proj.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
