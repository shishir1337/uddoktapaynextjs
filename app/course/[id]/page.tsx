'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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