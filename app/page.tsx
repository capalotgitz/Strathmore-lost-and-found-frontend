import {
  Search,
  MapPin,
  Clock,
  Users,
  Shield,
  Bell,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  LocateIcon as LocationIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
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
  { label: "Items Recovered", value: "1,247", icon: Users, color: "text-green-600" },
  { label: "Active Listings", value: "89", icon: Clock, color: "text-blue-600" },
  { label: "Campus Locations", value: "25+", icon: MapPin, color: "text-purple-600" },
  { label: "Success Rate", value: "94%", icon: CheckCircle, color: "text-orange-600" },
]

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Advanced search filters to help you find your lost items quickly and efficiently.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Get notified immediately when someone reports finding your lost item.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your personal information is protected with university-grade security.",
  },
  {
    icon: MapPin,
    title: "Campus-Wide Coverage",
    description: "Covers all Strathmore University buildings, dormitories, and outdoor areas.",
  },
]

const howItWorks = [
  {
    step: "1",
    title: "Report Your Item",
    description: "Lost something? Report it with details and photos to help others identify it.",
  },
  {
    step: "2",
    title: "Community Helps",
    description: "Fellow students and staff look out for your item across campus.",
  },
  {
    step: "3",
    title: "Get Reunited",
    description: "Receive notifications when your item is found and arrange safe pickup.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
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
              <Link href="/browse" className="text-gray-600 hover:text-blue-600 transition-colors">
                Browse Items
              </Link>
              <Link href="/report" className="text-gray-600 hover:text-blue-600 transition-colors">
                Report Item
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="mb-8">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                🎓 Trusted by 15,000+ Strathmore Students
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Lost Something?
              <br />
              <span className="text-blue-600">We'll Help You Find It!</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Strathmore University's official lost and found platform. Connect with your campus community to recover
              lost items quickly and safely.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 rounded-full px-8">
                <Link href="/report/lost">
                  Report Lost Item
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-2 bg-transparent">
                <Link href="/report/found">
                  Report Found Item
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>University Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>94% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <span>Active Community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Making a Real Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform has helped thousands of Strathmore students and staff recover their lost belongings.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${stat.color} bg-opacity-10`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built specifically for the Strathmore community with features that make finding lost items easier than
              ever.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting your lost items back is simple with our three-step process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-gray-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Items */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <p className="text-gray-600">Latest lost and found reports from the Strathmore community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-all cursor-pointer group border-0 shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={item.type === "lost" ? "destructive" : "default"} className="text-xs">
                      {item.type === "lost" ? "Lost" : "Found"}
                    </Badge>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <div className="relative overflow-hidden rounded-md mb-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{item.title}</CardTitle>
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
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-transparent">
              <Link href="/browse">
                View All Items
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Lost Item?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Strathmore students who have successfully recovered their belongings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
              <Link href="/report/lost">Start Searching Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/browse">Browse Found Items</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600">Our security team is here to assist you with any questions or concerns.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600">+254 703 034 000</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Fri, 8AM-6PM</p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">security@strathmore.edu</p>
                <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                  <LocationIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600">Security Office</p>
                <p className="text-sm text-gray-500 mt-1">Main Campus, Ground Floor</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Strathmore Lost & Found</h4>
                  <p className="text-sm text-gray-400">University Campus</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Helping the Strathmore University community recover lost items since 2024. Safe, secure, and trusted by
                thousands of students and staff.
              </p>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                  🔒 University Verified
                </Badge>
                <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                  ✅ 94% Success Rate
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/browse" className="hover:text-white transition-colors">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link href="/report" className="hover:text-white transition-colors">
                    Report Item
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="text-gray-400 space-y-2">
                <p className="flex items-center">
                  <LocationIcon className="w-4 h-4 mr-2" />
                  Security Office, Main Campus
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +254 703 034 000
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  security@strathmore.edu
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2024 Strathmore University. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="text-gray-400 hover:text-white text-sm transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
