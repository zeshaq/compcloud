'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateImagePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [diskFormat, setDiskFormat] = useState('qcow2')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError('Image file is required')
      return
    }

    const res = await fetch('/api/images', {
      method: 'POST',
      body: (() => {
        const form = new FormData()
        form.append('name', name)
        form.append('disk_format', diskFormat)
        form.append('file', file)
        return form
      })(),
    })

    if (res.ok) {
      router.push('/cloud-manager/images')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to upload image')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upload New Image</h1>
      {error && <div className="text-red-700 bg-red-100 p-2 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md" encType="multipart/form-data">
        <input
          className="border p-2 w-full"
          placeholder="Image Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <select
          className="border p-2 w-full"
          value={diskFormat}
          onChange={e => setDiskFormat(e.target.value)}
        >
          <option value="qcow2">qcow2</option>
          <option value="raw">raw</option>
          <option value="vmdk">vmdk</option>
        </select>
        <input
          className="border p-2 w-full"
          type="file"
          onChange={e => setFile(e.target.files?.[0] || null)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Upload Image
        </button>
      </form>
    </div>
  )
}
