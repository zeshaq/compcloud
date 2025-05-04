'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function NavBar() {
  const [hydrated, setHydrated] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setHydrated(true)

    const cookies = document.cookie.split(';').map(c => c.trim())
    const token = cookies.find(c => c.startsWith('client_token='))
    setIsLoggedIn(!!token)
  }, [])

  if (!hydrated) return null

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-bold">CompCloud</Link>
        {isLoggedIn && (
          <Link href="/cloud-manager" className="text-gray-700 hover:underline">
            Cloud Manager
          </Link>
        )}
      </div>
      <div>
        {isLoggedIn ? (
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="text-red-600 hover:underline">Logout</button>
          </form>
        ) : (
          <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        )}
      </div>
    </nav>
  )
}
