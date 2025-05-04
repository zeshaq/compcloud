'use client'

import { useRouter } from 'next/navigation'

export default function DeleteKeypairButton({ name }: { name: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete keypair "${name}"?`)) return

    const res = await fetch(`/api/keypairs/${name}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      router.refresh()
    } else {
      alert('Failed to delete keypair')
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
