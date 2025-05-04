import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteFloatingIpButton from '@/components/DeleteFloatingIpButton'

async function fetchFloatingIps() {
  const token = cookies().get('os_token')?.value
  const res = await fetch(`${process.env.OS_NETWORK_URL}/v2.0/floatingips`, {
    headers: { 'X-Auth-Token': token! },
    cache: 'no-store',
  })

  const data = await res.json()
  return data.floatingips || []
}

export default async function FloatingIpsPage() {
  const floatingIps = await fetchFloatingIps()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Floating IPs</h1>

      <Link
        href="/cloud-manager/floating-ips/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Allocate Floating IP
      </Link>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Floating IP</th>
            <th className="border p-2">Fixed IP</th>
            <th className="border p-2">Port</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {floatingIps.map((fip: any) => (
            <tr key={fip.id}>
              <td className="border p-2">{fip.floating_ip_address}</td>
              <td className="border p-2">{fip.fixed_ip_address || '-'}</td>
              <td className="border p-2">{fip.port_id || '-'}</td>
              <td className="border p-2">{fip.status}</td>
              <td className="border p-2">
                <DeleteFloatingIpButton id={fip.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
