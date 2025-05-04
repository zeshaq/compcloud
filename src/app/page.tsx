import NavBar from '@/components/NavBar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to CompCloud 👋</h1>
        <p className="text-gray-700 mb-2">
          This is your unified dashboard for managing OpenStack cloud resources.
        </p>
        <p className="text-gray-600">
          Use the navigation bar to log in and access the <strong>Cloud Manager</strong> to manage instances, networks, volumes, and more.
        </p>
      </main>
    </div>
  )
}
