import { Search, MapPin, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const recentItems = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    type: "lost",
    location: "Library - 2nd Floor",
    date: "2 hours ago",
    category: "Electronics",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    title: "Blue Backpack",
    type: "found",
    location: "Student Center",
    date: "5 hours ago",
    category: "Bags",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    title: "Car Keys (Toyota)",
    type: "lost",
    location: "Parking Lot B",
    date: "1 day ago",
    category: "Keys",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    title: "Textbook - Calculus",
    type: "found",
    location: "Mathematics Building",
    date: "2 days ago",
    category: "Books",
    image: "/placeholder.svg?height=100&width=100",
  },
]

const stats = [
  { label: "Items Recovered", value: "1,247", icon: Users },
  { label: "Active Listings", value: "89", icon: Clock },
  { label: "Campus Locations", value: "25+", icon: MapPin },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Strathmore Lost & Found</h1>
                <p className="text-sm text-gray-500">University Campus</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/browse" className="text-gray-600 hover:text-gray-900">
                Browse Items
              </Link>
              <Link href="/report" className="text-gray-600 hover:text-gray-900">
                Report Item
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Lost Something? We're Here to Help!</h2>
          <p className="text-xl text-gray-600 mb-8">
            Strathmore University's central hub for lost and found items. Search, report, and recover your belongings
            with ease.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for lost items (e.g., iPhone, backpack, keys...)"
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                Search
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/report/lost">Report Lost Item</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/report/found">Report Found Item</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Items */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Recent Items</h3>
            <p className="text-gray-600">Latest lost and found reports from the Strathmore community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={item.type === "lost" ? "destructive" : "default"}>
                      {item.type === "lost" ? "Lost" : "Found"}
                    </Badge>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {item.location}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/browse">View All Items</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Strathmore Lost & Found</h4>
              <p className="text-gray-400">
                Helping the Strathmore University community recover lost items since 2024.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/browse" className="hover:text-white">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link href="/report" className="hover:text-white">
                    Report Item
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="text-gray-400 space-y-2">
                <p>Security Office, Main Campus</p>
                <p>Phone: +254 703 034 000</p>
                <p>Email: security@strathmore.edu</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Strathmore University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
