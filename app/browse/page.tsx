import { Search, MapPin, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const items = [
  {
    id: 1,
    title: "iPhone 14 Pro - Space Black",
    type: "lost",
    location: "Library - 2nd Floor",
    date: "2 hours ago",
    category: "Electronics",
    description: "Black iPhone 14 Pro with cracked screen protector. Has a blue case with card holder.",
    image: "/placeholder.svg?height=200&width=200",
    reporter: "John D.",
    views: 23,
  },
  {
    id: 2,
    title: "Blue Jansport Backpack",
    type: "found",
    location: "Student Center",
    date: "5 hours ago",
    category: "Bags",
    description: "Navy blue Jansport backpack found near the cafeteria. Contains notebooks and pens.",
    image: "/placeholder.svg?height=200&width=200",
    reporter: "Sarah M.",
    views: 45,
  },
  {
    id: 3,
    title: "Toyota Car Keys",
    type: "lost",
    location: "Parking Lot B",
    date: "1 day ago",
    category: "Keys",
    description: "Toyota car keys with black key fob and a small teddy bear keychain.",
    image: "/placeholder.svg?height=200&width=200",
    reporter: "Mike K.",
    views: 67,
  },
  {
    id: 4,
    title: "Calculus Textbook - 8th Edition",
    type: "found",
    location: "Mathematics Building",
    date: "2 days ago",
    category: "Books",
    description: "Stewart Calculus textbook, 8th edition. Name 'Alex' written inside front cover.",
    image: "/placeholder.svg?height=200&width=200",
    reporter: "Lisa R.",
    views: 34,
  },
  {
    id: 5,
    title: "Silver Watch - Casio",
    type: "lost",
    location: "Sports Complex",
    date: "3 days ago",
    category: "Jewelry",
    description: "Silver Casio digital watch with metal band. Sentimental value.",
    image: "/placeholder.svg?height=200&width=200",
    reporter: "David L.",
    views: 89,
  },
  {
    id: 6,
    title: "Red Nike Hoodie - Size M",
    type: "found",
    location: "Auditorium",
    date: "4 days ago",
    category: "Clothing",
    description: "Red Nike hoodie, size Medium. Found after the guest lecture on Thursday.",
    image: "/placeholder.svg?height=200&width=200",
    reporter: "Emma W.",
    views: 56,
  },
]

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Strathmore Lost & Found</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/browse" className="text-blue-600 font-medium">
                Browse Items
              </Link>
              <Link href="/report" className="text-gray-600 hover:text-gray-900">
                Report Item
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Lost & Found Items</h1>
          <p className="text-gray-600">Search through all reported lost and found items on campus</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input placeholder="Search items..." className="pl-10 h-11" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="bags">Bags & Backpacks</SelectItem>
                <SelectItem value="books">Books & Stationery</SelectItem>
                <SelectItem value="keys">Keys</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="lost">Lost Items</SelectItem>
                <SelectItem value="found">Found Items</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Showing {items.length} items</p>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="most-viewed">Most Viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={item.type === "lost" ? "destructive" : "default"}>
                    {item.type === "lost" ? "Lost" : "Found"}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="w-4 h-4 mr-1" />
                    {item.views}
                  </div>
                </div>
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-3 group-hover:scale-105 transition-transform"
                />
                <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="line-clamp-2 mb-3">{item.description}</CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    <span className="text-sm text-gray-500">by {item.reporter}</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Items
          </Button>
        </div>
      </div>
    </div>
  )
}
