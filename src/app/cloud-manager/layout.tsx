'use client'

import Link from 'next/link'
import { useState } from 'react'

function SidebarSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="space-y-1">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs uppercase font-semibold text-gray-500 hover:text-black flex justify-between w-full"
      >
        {title}
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className="pl-2 space-y-1">{children}</div>}
    </div>
  )
}

export default function CloudManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">CompCloud</Link>
        <Link href="/logout" className="hover:underline">Logout</Link>
      </header>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 bg-gray-100 border-r p-4 text-sm space-y-5 overflow-y-auto">
          <SidebarSection title="Dashboard">
            <Link href="/cloud-manager" className="block hover:underline">Overview</Link>
            <Link href="/cloud-manager/usage" className="block hover:underline">Usage</Link>
          </SidebarSection>

          <SidebarSection title="Compute">
            <Link href="/cloud-manager/instances" className="block hover:underline">Instances</Link>
            <Link href="/cloud-manager/flavors" className="block hover:underline">Flavors</Link>
            <Link href="/cloud-manager/keypairs" className="block hover:underline">Key Pairs</Link>
            <Link href="/cloud-manager/server-groups" className="block hover:underline">Server Groups</Link>
          </SidebarSection>

          <SidebarSection title="Network">
            <Link href="/cloud-manager/networks" className="block hover:underline">Networks</Link>
            <Link href="/cloud-manager/subnets" className="block hover:underline">Subnets</Link>
            <Link href="/cloud-manager/routers" className="block hover:underline">Routers</Link>
            <Link href="/cloud-manager/floating-ips" className="block hover:underline">Floating IPs</Link>
            <Link href="/cloud-manager/ports" className="block hover:underline">Ports</Link>
            <Link href="/cloud-manager/security-groups" className="block hover:underline">Security Groups</Link>
          </SidebarSection>

          <SidebarSection title="Storage">
            <Link href="/cloud-manager/volumes" className="block hover:underline">Volumes</Link>
            <Link href="/cloud-manager/snapshots" className="block hover:underline">Snapshots</Link>
            <Link href="/cloud-manager/volume-types" className="block hover:underline">Volume Types</Link>
          </SidebarSection>

          <SidebarSection title="Image">
            <Link href="/cloud-manager/images" className="block hover:underline">Images</Link>
          </SidebarSection>

          <SidebarSection title="Identity & Access">
            <Link href="/cloud-manager/projects" className="block hover:underline">Projects</Link>
            <Link href="/cloud-manager/users" className="block hover:underline">Users</Link>
            <Link href="/cloud-manager/roles" className="block hover:underline">Roles</Link>
            <Link href="/cloud-manager/domains" className="block hover:underline">Domains</Link>
          </SidebarSection>

          <SidebarSection title="Orchestration">
            <Link href="/cloud-manager/stacks" className="block hover:underline">Stacks</Link>
            <Link href="/cloud-manager/templates" className="block hover:underline">Templates</Link>
          </SidebarSection>

          <SidebarSection title="System">
            <Link href="/cloud-manager/hypervisors" className="block hover:underline">Hypervisors</Link>
            <Link href="/cloud-manager/services" className="block hover:underline">Services</Link>
            <Link href="/cloud-manager/quotas" className="block hover:underline">Quotas</Link>
          </SidebarSection>

          <SidebarSection title="Monitoring">
            <Link href="/cloud-manager/telemetry" className="block hover:underline">Telemetry</Link>
            <Link href="/cloud-manager/alarms" className="block hover:underline">Alarms</Link>
          </SidebarSection>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}
