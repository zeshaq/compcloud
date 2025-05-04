'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateInstancePage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [flavor, setFlavor] = useState('')
  const [network, setNetwork] = useState('')
  const [volumeSize, setVolumeSize] = useState(10)
  const [createVolume, setCreateVolume] = useState(true)
  const [availabilityZone, setAvailabilityZone] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [images, setImages] = useState<any[]>([])
  const [flavors, setFlavors] = useState<any[]>([])
  const [networks, setNetworks] = useState<any[]>([])
  const [zones, setZones] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/instances/resources')
      .then(res => res.json())
      .then(data => {
        setImages(data.images || [])
        setFlavors(data.flavors || [])
        setNetworks(data.networks || [])
        setZones(data.availabilityZones || [])
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const res = await fetch('/api/instances/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        image,
        flavor,
        network,
        createVolume,
        volumeSize,
        availabilityZone,
      }),
    })

    if (res.ok) {
      router.push('/cloud-manager/instances')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create instance')
    }
  }

  const renderCardOptions = (items: any[], selected: string, setSelected: (id: string) => void, key: 'id' | 'uuid', label: string) => (
    <div className="grid grid-cols-2 gap-3">
      {items.map(item => (
        <label
          key={item[key]}
          className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
            selected === item[key] ? 'border-blue-500 ring-2 ring-blue-300' : ''
          }`}
        >
          <input
            type="radio"
            name={label}
            value={item[key]}
            checked={selected === item[key]}
            onChange={() => setSelected(item[key])}
            className="hidden"
          />
          <div className="font-semibold">{item.name}</div>
          {item.ram && <div className="text-sm text-gray-600">{item.vcpus} vCPU / {item.ram}MB RAM</div>}
        </label>
      ))}
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Instance</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div>
          <label className="block font-medium mb-1">Instance Name</label>
          <input
            type="text"
            placeholder="My VM"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Image</label>
          {renderCardOptions(images, image, setImage, 'id', 'image')}
        </div>

        <div>
          <label className="block font-medium mb-1">Flavor</label>
          {renderCardOptions(flavors, flavor, setFlavor, 'id', 'flavor')}
        </div>

        <div>
          <label className="block font-medium mb-1">Network</label>
          {renderCardOptions(networks, network, setNetwork, 'id', 'network')}
        </div>

        <div>
          <label className="block font-medium mb-1">Availability Zone</label>
          <select
            value={availabilityZone}
            onChange={(e) => setAvailabilityZone(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="" disabled>Select zone</option>
            {zones.map((z) => (
              <option key={z.zoneName} value={z.zoneName}>{z.zoneName}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={createVolume}
              onChange={(e) => setCreateVolume(e.target.checked)}
            />
            <span>Create volume from image</span>
          </label>

          {createVolume && (
            <input
              type="number"
              min={1}
              className="border p-2 w-40 rounded"
              value={volumeSize}
              onChange={(e) => setVolumeSize(parseInt(e.target.value))}
              placeholder="Volume Size (GB)"
              required
            />
          )}
        </div>

        <button type="submit" className="bg-blue-600 text-white p-3 rounded w-full">
          Launch Instance
        </button>
      </form>
    </div>
  )
}
