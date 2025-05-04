'use client'

import { useRouter } from 'next/navigation'

export default function DeleteInstanceButton({ instanceId }: { instanceId: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this instance?')
    if (!confirmed) return

    const res = await fetch(`/api/instances/${instanceId}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      router.push('/cloud-manager/instances')
    } else {
      alert('Failed to delete instance')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Delete Instance
    </button>
  )
}
