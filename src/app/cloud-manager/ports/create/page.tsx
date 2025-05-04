'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CreatePortPage() {
  const router = useRouter()
  const [networkId, setNetworkId] = useState('')
  const [name, setName] = useState('')
  const [networks, setNetworks] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/networks')
      .then(res => res.json())
      .then(data => {
        setNetworks(data)
        if (data.length > 0) setNetworkId(data[0].id)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/ports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ network_id: networkId, name }),
    })

    if (res.ok) {
      router.push('/cloud-manager/ports')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create port')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Port</h1>

      {error && <div className="text-red-700 bg-red-100 p-2 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Port Name"
          required
        />
        <select
          className="border p-2 w-full"
          value={networkId}
          onChange={e => setNetworkId(e.target.value)}
        >
          {networks.map((n) => (
            <option key={n.id} value={n.id}>
              {n.name || n.id}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Create Port
        </button>
      </form>
    </div>
  )
}
