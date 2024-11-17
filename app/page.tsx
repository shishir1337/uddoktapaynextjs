import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const courses = [
  { id: 1, title: 'Introduction to React', price: 80, description: 'Learn the basics of React and build your first app.' },
  { id: 2, title: 'Advanced JavaScript', price: 120, description: 'Dive deep into JavaScript concepts and become a pro.' },
  { id: 3, title: 'Node.js Fundamentals', price: 100, description: 'Master server-side JavaScript with Node.js.' },
]

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">£{course.price}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/course/${course.id}`} passHref>
                <Button className="w-full">View Course</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}