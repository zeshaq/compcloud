'use client'

import { useRouter } from 'next/navigation'

export default function DeleteNetworkButton({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this network?')
    if (!confirmed) return

    const res = await fetch(`/api/networks/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      router.refresh()
    } else {
      alert('Failed to delete network')
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
