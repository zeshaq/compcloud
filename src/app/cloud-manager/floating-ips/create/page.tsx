'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateFloatingIpPage() {
  const router = useRouter()
  const [networkId, setNetworkId] = useState('')
  const [networks, setNetworks] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useState(() => {
    fetch('/api/networks')
      .then(res => res.json())
      .then(data => {
        const externalNets = data.filter((n: any) => n.router_external)
        setNetworks(externalNets)
        if (externalNets.length > 0) setNetworkId(externalNets[0].id)
      })
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/floating-ips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ floating_network_id: networkId }),
    })

    if (res.ok) {
      router.push('/cloud-manager/floating-ips')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to allocate floating IP')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Allocate Floating IP</h1>

      {error && <div className="text-red-700 bg-red-100 p-2 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <select
          value={networkId}
          onChange={(e) => setNetworkId(e.target.value)}
          className="border p-2 w-full"
        >
          {networks.map((n) => (
            <option key={n.id} value={n.id}>
              {n.name || n.id}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Allocate
        </button>
      </form>
    </div>
  )
}
