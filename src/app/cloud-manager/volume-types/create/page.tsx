'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateVolumeTypePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/volume-types', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, is_public: isPublic }),
    })

    if (res.ok) {
      router.push('/cloud-manager/volume-types')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create volume type')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Volume Type</h1>
      {error && <div className="text-red-700 bg-red-100 p-2 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          placeholder="Volume Type Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          <span>Is Public</span>
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Create
        </button>
      </form>
    </div>
  )
}
