'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateServerGroupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [policy, setPolicy] = useState('affinity')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/server-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, policy }),
    })

    if (res.ok) {
      router.push('/cloud-manager/server-groups')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create server group')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Server Group</h1>
      {error && <div className="text-red-700 bg-red-100 p-2 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          placeholder="Group Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <select
          className="border p-2 w-full"
          value={policy}
          onChange={e => setPolicy(e.target.value)}
        >
          <option value="affinity">Affinity</option>
          <option value="anti-affinity">Anti-Affinity</option>
          <option value="soft-affinity">Soft Affinity</option>
          <option value="soft-anti-affinity">Soft Anti-Affinity</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Create
        </button>
      </form>
    </div>
  )
}
