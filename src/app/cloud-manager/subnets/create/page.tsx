'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CreateSubnetPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [cidr, setCidr] = useState('')
  const [networkId, setNetworkId] = useState('')
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

    const res = await fetch('/api/subnets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, network_id: networkId, cidr }),
    })

    if (res.ok) {
      router.push('/cloud-manager/subnets')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create subnet')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Subnet</h1>

      {error && <div className="bg-red-100 border border-red-300 text-red-700 p-2 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Subnet Name"
          required
        />
        <input
          className="border p-2 w-full"
          value={cidr}
          onChange={e => setCidr(e.target.value)}
          placeholder="CIDR (e.g. 192.168.1.0/24)"
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
          Create Subnet
        </button>
      </form>
    </div>
  )
}
