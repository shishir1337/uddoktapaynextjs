'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const courses = [
  { id: 1, title: 'Introduction to React', price: 80, description: 'Learn the basics of React and build your first app.' },
  { id: 2, title: 'Advanced JavaScript', price: 120, description: 'Dive deep into JavaScript concepts and become a pro.' },
  { id: 3, title: 'Node.js Fundamentals', price: 100, description: 'Master server-side JavaScript with Node.js.' },
]

export default function CoursePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const course = courses.find(c => c.id === parseInt(params.id))

  if (!course) {
    return <div>Course not found</div>
  }

  const handlePurchase = () => {
    router.push(`/checkout/${course.id}`)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold mb-6">Price: £{course.price}</p>
        <h2 className="text-xl font-semibold mb-2">Course Details:</h2>
        <ul className="list-disc pl-5 mb-4">
          <li>Comprehensive curriculum</li>
          <li>Hands-on projects</li>
          <li>Expert instructor support</li>
          <li>Certificate upon completion</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={handlePurchase} className="w-full">
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  )
}