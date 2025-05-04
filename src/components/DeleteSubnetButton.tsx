'use client'

import { useRouter } from 'next/navigation'

export default function DeleteSubnetButton({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this subnet?')) return

    const res = await fetch(`/api/subnets/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      router.refresh()
    } else {
      alert('Failed to delete subnet')
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
