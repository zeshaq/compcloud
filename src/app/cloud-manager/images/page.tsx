import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteImageButton from '@/components/DeleteImageButton'

async function fetchImages() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_IMAGE_URL}/v2/images`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })
  const data = await res.json()
  return data.images || []
}

export default async function ImagesPage() {
  const images = await fetchImages()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Images</h1>
      <Link
        href="/cloud-manager/images/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Upload Image
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Size</th>
            <th className="border p-2">Format</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((img: any) => (
            <tr key={img.id}>
              <td className="border p-2">{img.name}</td>
              <td className="border p-2">{img.status}</td>
              <td className="border p-2">{(img.size / (1024 * 1024)).toFixed(2)} MB</td>
              <td className="border p-2">{img.disk_format}</td>
              <td className="border p-2">
                <DeleteImageButton id={img.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
