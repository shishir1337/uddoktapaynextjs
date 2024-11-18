'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const courses = [
  { id: 1, title: 'Introduction to React', price: 80, description: 'Learn the basics of React and build your first app.' },
  { id: 2, title: 'Advanced JavaScript', price: 120, description: 'Dive deep into JavaScript concepts and become a pro.' },
  { id: 3, title: 'Node.js Fundamentals', price: 100, description: 'Master server-side JavaScript with Node.js.' },
  { id: 4, title: 'Python for Beginners', price: 90, description: 'Get started with Python programming and build basic projects.' },
  { id: 5, title: 'HTML & CSS Essentials', price: 70, description: 'Learn the foundational skills for web development with HTML and CSS.' },
  { id: 6, title: 'Machine Learning Basics', price: 150, description: 'Explore the basics of machine learning and start building AI models.' },
  { id: 7, title: 'React Native Development', price: 130, description: 'Build cross-platform mobile apps with React Native.' },
  { id: 8, title: 'Django for Web Development', price: 110, description: 'Learn how to build scalable web applications using Django.' },
  { id: 9, title: 'Data Structures and Algorithms', price: 95, description: 'Strengthen your problem-solving skills by learning key data structures and algorithms.' },
  { id: 10, title: 'Vue.js Fundamentals', price: 85, description: 'Learn the core concepts of Vue.js for building reactive user interfaces.' },
  { id: 11, title: 'Full-Stack Web Development', price: 200, description: 'Master both frontend and backend technologies to build full-stack web applications.' },
  { id: 12, title: 'Git & GitHub for Beginners', price: 60, description: 'Learn version control with Git and collaborate on projects using GitHub.' },
  { id: 13, title: 'Blockchain Development', price: 170, description: 'Understand the principles of blockchain technology and build your own blockchain.' },
  { id: 14, title: 'Responsive Web Design', price: 75, description: 'Learn how to design websites that look great on all screen sizes.' },
  { id: 15, title: 'Java for Web Development', price: 130, description: 'Build secure and scalable web applications using Java.' },
];


export default function CheckoutPage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
  })

  const course = courses.find(c => c.id === parseInt(params.courseId))

  if (!course) {
    return <div>Course not found</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course.id,
          amount: course.price,
          ...formData,
        }),
      })
      const data = await response.json()
      if (data.payment_url) {
        router.push(data.payment_url)
      }
    } catch (error) {
      console.error('Error creating payment:', error)
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>Complete your purchase for {course.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Course</Label>
            <p className="text-sm text-gray-600">{course.title}</p>
          </div>
          <div className="space-y-2">
            <Label>Price</Label>
            <p className="text-sm text-gray-600">£{course.price}</p>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </Button>
      </CardFooter>
    </Card>
  )
}