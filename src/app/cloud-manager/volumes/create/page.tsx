'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateVolumePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [size, setSize] = useState(1)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/volumes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, size }),
    })

    if (res.ok) {
      router.push('/cloud-manager/volumes')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create volume')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Volume</h1>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Volume Name"
          required
        />
        <input
          type="number"
          min={1}
          className="border p-2 w-full"
          value={size}
          onChange={e => setSize(Number(e.target.value))}
          placeholder="Size in GB"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Create
        </button>
      </form>
    </div>
  )
}
