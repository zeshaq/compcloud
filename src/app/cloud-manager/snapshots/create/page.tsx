'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CreateSnapshotPage() {
  const router = useRouter()
  const [volumeId, setVolumeId] = useState('')
  const [name, setName] = useState('')
  const [volumes, setVolumes] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/volumes')
      .then(res => res.json())
      .then(data => {
        setVolumes(data)
        if (data.length > 0) setVolumeId(data[0].id)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/snapshots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, volume_id: volumeId }),
    })

    if (res.ok) {
      router.push('/cloud-manager/snapshots')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create snapshot')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Volume Snapshot</h1>
      {error && <div className="text-red-700 bg-red-100 p-2 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Snapshot Name"
          required
        />

        <select
          className="border p-2 w-full"
          value={volumeId}
          onChange={e => setVolumeId(e.target.value)}
          required
        >
          {volumes.map((vol) => (
            <option key={vol.id} value={vol.id}>
              {vol.name || vol.id}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Create Snapshot
        </button>
      </form>
    </div>
  )
}
