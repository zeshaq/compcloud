import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteKeypairButton from '@/components/DeleteKeypairButton'

async function fetchKeypairs() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_COMPUTE_URL}/os-keypairs`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })

  const data = await res.json()
  return data.keypairs.map((kp: any) => kp.keypair)
}

export default async function KeypairsPage() {
  const keypairs = await fetchKeypairs()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Key Pairs</h1>

      <Link
        href="/cloud-manager/keypairs/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Import Key Pair
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Fingerprint</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {keypairs.map((kp: any) => (
            <tr key={kp.name}>
              <td className="border p-2">{kp.name}</td>
              <td className="border p-2">{kp.fingerprint}</td>
              <td className="border p-2">{kp.type}</td>
              <td className="border p-2">
                <DeleteKeypairButton name={kp.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
