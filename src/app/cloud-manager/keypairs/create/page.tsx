'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateKeypairPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/keypairs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, public_key: publicKey }),
    })

    if (res.ok) {
      router.push('/cloud-manager/keypairs')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to import keypair')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Import Key Pair</h1>

      {error && <div className="text-red-700 bg-red-100 p-2 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Key Pair Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <textarea
          className="border p-2 w-full h-40"
          placeholder="Paste Public Key (.pub)"
          value={publicKey}
          onChange={e => setPublicKey(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Import Key
        </button>
      </form>
    </div>
  )
}
