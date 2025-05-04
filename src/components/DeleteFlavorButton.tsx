'use client'

import { useRouter } from 'next/navigation'

export default function DeleteFlavorButton({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this flavor?')
    if (!confirmed) return

    const res = await fetch(`/api/flavors/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      router.refresh() // reload page to update list
    } else {
      alert('Failed to delete flavor')
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
