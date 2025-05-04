'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateNetworkPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/networks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })

    if (res.ok) {
      router.push('/cloud-manager/networks')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create network')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Network</h1>

      {error && (
        <div className="text-red-700 bg-red-100 p-2 mb-4 border border-red-300 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Network Name"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Create
        </button>
      </form>
    </div>
  )
}
