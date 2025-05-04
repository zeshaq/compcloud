import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import DeleteInstanceButton from '@/components/DeleteInstanceButton'

async function getInstance(id: string) {
  const token = cookies().get('os_token')?.value
  if (!token) return null

  const res = await fetch(`${process.env.OS_COMPUTE_URL}/servers/${id}`, {
    headers: {
      'X-Auth-Token': token,
    },
    cache: 'no-store',
  })

  if (!res.ok) return null
  const data = await res.json()
  return data.server
}

export default async function InstanceDetail({ params }: { params: { id: string } }) {
  const instance = await getInstance(params.id)
  if (!instance) return notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Instance: {instance.name}</h1>

      <div className="text-sm text-gray-700 space-y-1">
        <p><strong>Status:</strong> {instance.status}</p>
        <p><strong>ID:</strong> {instance.id}</p>
        <p><strong>Flavor:</strong> {instance.flavor.id}</p>
        <p><strong>Image:</strong> {instance.image?.id || 'Boot from volume'}</p>
        <p><strong>Created:</strong> {instance.created}</p>
      </div>

      {/* Start/Stop Form */}
      <form className="flex gap-4" action={`/api/instances/${params.id}/action`} method="POST">
        {instance.status === 'SHUTOFF' && (
          <button name="action" value="start" className="bg-green-600 text-white px-4 py-2 rounded">
            Start
          </button>
        )}
        {instance.status === 'ACTIVE' && (
          <button name="action" value="stop" className="bg-yellow-600 text-white px-4 py-2 rounded">
            Stop
          </button>
        )}
      </form>

      {/* Delete Button */}
      <DeleteInstanceButton instanceId={instance.id} />
    </div>
  )
}
