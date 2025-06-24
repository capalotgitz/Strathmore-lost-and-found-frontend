import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

const categories = [
  "Electronics",
  "Bags & Backpacks",
  "Books & Stationery",
  "Keys",
  "Clothing",
  "Jewelry & Accessories",
  "Sports Equipment",
  "Documents",
  "Other",
]

const locations = [
  "Library - Ground Floor",
  "Library - 1st Floor",
  "Library - 2nd Floor",
  "Student Center",
  "Cafeteria",
  "Parking Lot A",
  "Parking Lot B",
  "Parking Lot C",
  "Mathematics Building",
  "Science Building",
  "Business School",
  "Engineering Building",
  "Auditorium",
  "Sports Complex",
  "Hostels",
  "Main Gate",
  "Other",
]

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Report an Item</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Report Lost or Found Item</h2>
          <p className="text-gray-600">Help us help you by providing detailed information about the item.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>Please fill out all required fields to help others identify your item.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-6">
              {/* Item Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">What are you reporting? *</Label>
                <RadioGroup defaultValue="lost" className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lost" id="lost" />
                    <Label htmlFor="lost" className="text-red-600 font-medium">
                      Lost Item
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="found" id="found" />
                    <Label htmlFor="found" className="text-green-600 font-medium">
                      Found Item
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="itemName" className="text-base font-medium">
                  Item Name *
                </Label>
                <Input id="itemName" placeholder="e.g., iPhone 14 Pro, Blue Backpack, Car Keys" className="h-11" />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Category *</Label>
                <Select>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select item category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description including color, brand, size, distinctive features, etc."
                  className="min-h-[100px]"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Location *</Label>
                <Select>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Where was it lost/found?" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase()}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-base font-medium">
                  Date Lost/Found *
                </Label>
                <Input id="date" type="date" className="h-11" />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Photo (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  <Input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">
                      Full Name *
                    </Label>
                    <Input id="name" placeholder="Your full name" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-base font-medium">
                      Student/Staff ID *
                    </Label>
                    <Input id="studentId" placeholder="e.g., 123456" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      Email *
                    </Label>
                    <Input id="email" type="email" placeholder="your.email@strathmore.edu" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-medium">
                      Phone Number *
                    </Label>
                    <Input id="phone" type="tel" placeholder="+254 7XX XXX XXX" className="h-11" />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base font-medium">
                  Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information that might help..."
                  className="min-h-[80px]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/">Cancel</Link>
                </Button>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Submit Report
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
