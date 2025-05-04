import NavBar from '@/components/NavBar'
import Link from 'next/link'

export default function CloudManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Client-side top navbar */}
      <NavBar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 border-r p-4 space-y-2">
          <h2 className="text-lg font-semibold mb-2">Cloud Manager</h2>
          <ul className="space-y-1">
            <li><Link href="/cloud-manager" className="hover:underline">Overview</Link></li>
            <li><Link href="/cloud-manager/instances" className="hover:underline">Instance Management</Link></li>
            <li><Link href="/cloud-manager/networks" className="hover:underline">Networks</Link></li>
            <li><Link href="/cloud-manager/volumes" className="hover:underline">Volumes</Link></li>
            <li><Link href="/cloud-manager/routers" className="hover:underline">Routers</Link></li>
            <li><Link href="/cloud-manager/floating-ips" className="hover:underline">Floating IPs</Link></li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}
