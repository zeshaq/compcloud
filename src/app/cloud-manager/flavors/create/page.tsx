'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateFlavorPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [vcpus, setVcpus] = useState(1)
  const [ram, setRam] = useState(512)
  const [disk, setDisk] = useState(10)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const res = await fetch('/api/flavors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, vcpus, ram, disk }),
    })

    if (res.ok) {
      router.push('/cloud-manager/flavors')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create flavor')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Flavor</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 border border-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input className="border p-2 w-full" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input type="number" className="border p-2 w-full" value={vcpus} onChange={e => setVcpus(Number(e.target.value))} placeholder="vCPUs" required />
        <input type="number" className="border p-2 w-full" value={ram} onChange={e => setRam(Number(e.target.value))} placeholder="RAM (MB)" required />
        <input type="number" className="border p-2 w-full" value={disk} onChange={e => setDisk(Number(e.target.value))} placeholder="Disk (GB)" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Create Flavor
        </button>
      </form>
    </div>
  )
}
