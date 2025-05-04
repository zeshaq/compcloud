'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateSecurityGroupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/security-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    })

    if (res.ok) {
      router.push('/cloud-manager/security-groups')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create security group')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Security Group</h1>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Security Group Name"
          required
        />
        <textarea
          className="border p-2 w-full"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          rows={3}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Create
        </button>
      </form>
    </div>
  )
}
