'use client'

import { useRouter } from 'next/navigation'

export default function DeleteServerGroupButton({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Delete this server group?')) return

    const res = await fetch(`/api/server-groups/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      router.refresh()
    } else {
      alert('Failed to delete server group')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-2 py-1 rounded text-sm"
    >
      Delete
    </button>
  )
}
