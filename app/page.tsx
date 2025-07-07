"use client"

import type React from "react"

import {
  Search,
  MapPin,
  Users,
  Shield,
  Bell,
  ArrowRight,
  Phone,
  Mail,
  LocateIcon as LocationIcon,
  UserIcon,
  LogOut,
  LogIn,
  Eye,
  EyeOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import Link from "next/link"

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

interface AppUser {
  id: number
  name: string
  email: string
  phone?: string
}

export default function LandingPage() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [activeTab, setActiveTab] = useState("login")
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({ name: "", email: "", phone: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showSignupPassword, setShowSignupPassword] = useState(false)

  // Check if user is logged in on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user_data")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (e) {
        localStorage.removeItem("user_data")
      }
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate login process
    setTimeout(() => {
      if (loginForm.email && loginForm.password) {
        const userData = {
          id: 1,
          name: loginForm.email.split("@")[0],
          email: loginForm.email,
        }
        localStorage.setItem("user_data", JSON.stringify(userData))
        setUser(userData)
        setLoginForm({ email: "", password: "" })
      } else {
        setError("Please fill in all fields")
      }
      setLoading(false)
    }, 1000)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate signup process
    setTimeout(() => {
      if (signupForm.name && signupForm.email && signupForm.password) {
        const userData = {
          id: 1,
          name: signupForm.name,
          email: signupForm.email,
          phone: signupForm.phone,
        }
        localStorage.setItem("user_data", JSON.stringify(userData))
        setUser(userData)
        setSignupForm({ name: "", email: "", phone: "", password: "" })
      } else {
        setError("Please fill in all required fields")
      }
      setLoading(false)
    }, 1000)
  }

  const handleLogout = () => {
    localStorage.removeItem("user_data")
    setUser(null)
  }

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

            <nav className="hidden md:flex space-x-6 items-center">
              {user && (
                <>
                  <Link href="/browse" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Browse Items
                  </Link>
                  <Link href="/report" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Report Item
                  </Link>
                </>
              )}
              <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>

              {user && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <UserIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              )}
            </nav>

            <div className="md:hidden">
              {user ? (
                <Button onClick={handleLogout} variant="ghost" size="sm">
                  <LogOut className="w-5 h-5" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm">
                  <LogIn className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {!user ? (
        /* Login/Signup Section */
        <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[calc(100vh-4rem)]">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-md mx-auto relative">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Welcome to Strathmore Lost & Found</h1>
              <p className="text-gray-600">Sign in to your account or create a new one to get started</p>
            </div>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="text-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Sign In</h2>
                        <p className="text-sm text-gray-600">Welcome back to your account</p>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                          {error}
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email Address</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your.email@strathmore.edu"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            required
                            className="h-11 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full h-11" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                      </Button>

                      <div className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("signup")
                            setError("")
                          }}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Sign up here
                        </button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="text-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Create Account</h2>
                        <p className="text-sm text-gray-600">Join the Strathmore community</p>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                          {error}
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={signupForm.name}
                          onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email Address</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your.email@strathmore.edu"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-phone">Phone Number (Optional)</Label>
                        <Input
                          id="signup-phone"
                          type="tel"
                          placeholder="+254 700 000 000"
                          value={signupForm.phone}
                          onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            type={showSignupPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={signupForm.password}
                            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                            required
                            className="h-11 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full h-11" disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account"}
                      </Button>

                      <div className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("login")
                            setError("")
                          }}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Sign in here
                        </button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </section>
      ) : (
        /* Dashboard Section for Logged In Users */
        <>
          {/* Welcome Section */}
          <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="max-w-7xl mx-auto relative">
              <div className="text-center">
                <div className="mb-6">
                  <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                    👋 Welcome back, {user.name}!
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Your Lost & Found
                  <br />
                  <span className="text-blue-600">Dashboard</span>
                </h1>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Manage your lost and found items, search for missing belongings, and help others in the Strathmore
                  community.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 rounded-full px-8">
                    <Link href="/report">
                      Report Lost Item
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-2 bg-transparent">
                    <Link href="/browse">
                      Browse Found Items
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
                    <Users className="w-4 h-4 text-green-500" />
                    <span>Active Community</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore the tools and features available to help you find your lost items.
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
                  Follow these simple steps to recover your lost items or help others find theirs.
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
        </>
      )}

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
                Helping the Strathmore University community recover lost items since 2025. Safe, secure, and trusted by
                thousands of students and staff.
              </p>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                  🔒 University Verified
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {user && (
                  <>
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
                  </>
                )}
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
            <p className="text-gray-400 text-sm">&copy; 2025 Strathmore University. All rights reserved.</p>
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
